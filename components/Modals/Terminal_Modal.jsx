import '../../styles/terminal.css';

import React, {useState, useEffect, useRef} from 'react';

import Faux_Window from '../Faux_Window';
import {DEFAULT_HOME_DIR,
  DEFAULT_PROMPT_PREFIX,
  DEFAULT_PROMPT_ICON,
  DEFAULT_FILE_STRUCTURE,
} from '../Object_Definitions/Terminal_Defaults';

const terminalState = {
  prompt_prefix: DEFAULT_PROMPT_PREFIX,
  prompt_icon: DEFAULT_PROMPT_ICON,
  path: DEFAULT_HOME_DIR,
  dirs: DEFAULT_FILE_STRUCTURE,
  output: null,
  setOutput: null,
};

let editorOpener = null;

export default function Terminal_Modal(props) {
  editorOpener = props.editorOpener;
  const mainRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(0);
  const [output, setOutput] = useState([
    <HistoryLine key={0}>Try 'help' for currently available commands</HistoryLine>,
  ]);

  function focusEntry() {
    const lastChildElement = mainRef.current?.lastElementChild;
    lastChildElement?.scrollIntoView({behavior: 'smooth'});
    lastChildElement?.lastElementChild.focus();
  }

  terminalState.output = output;
  terminalState.setOutput = setOutput;
  useEffect(() => {
    focusEntry();
  }, [terminalState.output]);

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      processUserInput(terminalState, event.target.value);

      if (event.target.value) {
        setHistory([...history, event.target.value]);
      }
      event.target.value = '';
      setHistoryIdx(0);
    }

    if (event.key === 'ArrowUp') {
      var idx = history.length - historyIdx - 1;
      if (idx < 0) return;
      setHistoryIdx(historyIdx + 1);
      event.target.value = history[idx];
    } else if (event.key === 'ArrowDown') {
      var idx = history.length - historyIdx + 1;
      if (idx > history.length) return;
      setHistoryIdx(historyIdx - 1);
      if (idx == history.length) {
        event.target.value = '';
        return;
      }
      event.target.value = history[idx];
    }
  }

  return (
    <Faux_Window onClick={focusEntry} title="terminal" {... props}>
      <div className="terminal" ref={mainRef}>
        <div id="history">
          {terminalState.output}
        </div>
        <div className="line-entry">
          <div className="prompt">{prompt(terminalState)}</div>
          <input className="entry"
            autoFocus={true}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </Faux_Window>
  );
};

const HistoryLine = ({_key, prompt='', children}) => {
  return (
    <div className="line-entry" key={_key}>
      <div className="prompt">{prompt}</div>
      <div className="history-line">{children}</div>
    </div>
  );
};

function prompt(terminalState) {
  let pretty_path = terminalState.path;
  if (terminalState.path.startsWith(DEFAULT_HOME_DIR)) {
    pretty_path = terminalState.path.replace(DEFAULT_HOME_DIR, '~');
  }
  return terminalState.prompt_prefix + pretty_path + terminalState.prompt_icon;
}

/* returns validated dir [table, fullpath] or null if path is invalid */
function validate_path(terminalState, path) {
  /* split newpath and iterate
     cases to handle:
        if (starts with '/') -> new fullpath, disregard current path
        else -> split curr path on slashes
          if ('..') -> pop value on end of current path arr
          else -> add value to end of current path arr
  */
  const split_new_path = path.replace('~', DEFAULT_HOME_DIR).split('/');
  let final_path = [];
  if (path[0] === '/' || path[0] === '~') {
    // validate as a fullpath
    if (split_new_path.length == 2 && !split_new_path[0] && !split_new_path[1]) {
      // edge case when splitting single '/'; creates list of two empties ['', '']
      split_new_path.pop();
    }
    final_path = split_new_path;
  } else {
    const split_curr_path = terminalState.path.split('/');
    if (split_curr_path.length == 2 && !split_curr_path[0] && !split_curr_path[1]) {
      // edge case when splitting single '/'; creates list of two empties ['', '']
      split_curr_path.pop();
    }

    split_new_path.forEach((subpath) => {
      if (subpath === '..' && split_curr_path.length > 0) {
        split_curr_path.pop();
      } else {
        split_curr_path.push(subpath);
      }
    });
    final_path = split_curr_path;
  }

  let table = terminalState;

  // walk path to get index in file system
  final_path.every((subpath) => {
    if (table) {
      table = table.dirs[subpath];
    } else {
      return false;
    }

    return true;
  });

  let final_joined = final_path.join('/');
  if (final_joined === '') {
    final_joined = '/';
  }
  return [table, final_joined];
}

function handle_cd(terminalState, new_path) {
  if (!new_path) {
    terminalState.path = DEFAULT_HOME_DIR;
    return;
  }

  const ret = validate_path(terminalState, new_path);
  if (ret[0]) {
    terminalState.path = ret[1];
  } else {
    terminalState.output.push(
        <div className="history-line" key={terminalState.output.length}>
        cd: {new_path}: No such directory
        </div>,
    );
  }
}

function handle_ls(terminalState, _path) {
  let path = terminalState.path;
  if (_path) {
    path = _path;
  }
  const ret = validate_path(terminalState, path);
  const table = ret[0];

  if (!table) {
    terminalState.output.push(
        <div className="history-line" key={terminalState.output.length}>
        ls: cannot access '{ret[1]}': No such file or directory
        </div>,
    );
    return;
  }

  const output = [];
  // output all dirs
  for (const key in table.dirs) {
    output.push(<div className="fs-blue" key={output.length}>{key}</div>);
  }

  // output all files with color
  table.files.forEach((file) => {
    output.push(<div className={`fs-${file[1]}`} key={output.length}>{file[0]}</div>);
  });

  terminalState.output.push(
      <div className="history-line" key={terminalState.output.length}>
        {output}
      </div>,
  );
};

function handle_touch(terminalState, _file) {
  const ret = validate_path(terminalState, terminalState.path);

  if (!ret[0]) return;

  // make sure file name doesnt already exist
  let valid_name = true;
  ret[0].files.every((file) => {
    if (file[0] === _file) {
      valid_name = false;
    }

    return valid_name;
  });

  if (valid_name) {
    ret[0].files.push([_file, 'green']);
  }
};

function handle_mkdir(terminalState, _dir) {
  if (!_dir) return;

  const ret = validate_path(terminalState, terminalState.path);

  if (!ret[0]) return;

  if (_dir in ret[0].dirs) {
    terminalState.output.push(
        <HistoryLine key={terminalState.output.length}>
        mkdir: cannot create directory '{_dir}': File exists
        </HistoryLine>,
    );
    return;
  }
  ret[0].dirs[_dir] = {
    dirs: [],
    files: [],
  };
};

function handle_help(terminalState) {
  const CMDS = [
    ['clear', 'clear', 'Clear the terminal screen'],
    ['pwd', 'pwd', 'Print the name of the current / working directory'],
    ['cd', 'cd [dir]', 'Change the working directory'],
    ['ls', 'ls [path]', 'List directory contents'],
    ['touch', 'touch <file_name>', 'Create empty file'],
    ['mkdir', 'mkdir <dir_name>', 'Make directories'],
    ['rm', 'rm <file_name>', 'Delete file_name'],
    ['rmdir', 'rmdir <dir_name>', 'Delete dir_name'],
    ['whoami', 'whoami', 'Print effective user ID'],
    ['code', 'code', 'Open code editor'],
    ['help', 'help', 'Print available commands'],
  ];

  const output = [];
  CMDS.forEach((cmd) => output.push(
      <tr className="table-print" key={output.length}>
        <td>{cmd[1]}</td>
        <td>{cmd[2]}</td>
      </tr>,
  ));

  terminalState.output.push(
      <table className="table" key={terminalState.output.length}>
        <tbody>
          {output}
        </tbody>
      </table>,
  );
};

function handle_rm(terminalState, files) {
  if (files.length == 0) {
    terminalState.output.push(
        <HistoryLine key={terminalState.output.length}>
          <div>rm: missing operand - try 'help' for commands and usage</div>
        </HistoryLine>,
    );
  }

  const ret = validate_path(terminalState, terminalState.path);
  if (!ret[0]) return;

  files.forEach((_name) => {
    let found = false;
    ret[0].files = ret[0].files.filter(function(item) {
      const cmp = item[0] !== _name;
      if (!found && !cmp) found = true;
      return cmp;
    });

    if (!found) {
      terminalState.output.push(
          <HistoryLine key={terminalState.output.length}>
          rm: cannot remove '{_name}': No such file
          </HistoryLine>,
      );
    }
  });
}

function handle_rmdir(terminalState, files) {
  if (files.length == 0) {
    terminalState.output.push(
        <HistoryLine key={terminalState.output.length}>
          <div>rmdir: missing operand - try 'help' for commands and usage</div>
        </HistoryLine>,
    );
  }

  const ret = validate_path(terminalState, terminalState.path);
  if (!ret[0]) return;

  files.forEach((_dir) => {
    if (_dir in ret[0].dirs) {
      delete ret[0].dirs[_dir];
    } else {
      terminalState.output.push(
          <HistoryLine key={terminalState.output.length}>
          rmdir: cannot remove '{_dir}': No such directory
          </HistoryLine>,
      );
    }
  });
}

function handle_open(_file) {
  /* TODO: handle file specific opener */
  editorOpener(true);
}

function processUserInput(terminalState, input) {
  // remember input line
  terminalState.output.push(
      <HistoryLine key={terminalState.output.length} prompt={prompt(terminalState)}>
        {input}
      </HistoryLine>,
  );

  const cmd = input.split(' ');
  switch (cmd[0]) {
    case 'clear':
      terminalState.setOutput([]);
      return;
    case 'pwd':
      terminalState.output.push(<HistoryLine key={terminalState.output.length}>{terminalState.path}</HistoryLine>);
      break;
    case 'cd':
      handle_cd(terminalState, cmd[1]);
      break;
    case 'ls':
      handle_ls(terminalState, cmd[1]);
      break;
    case 'touch':
      handle_touch(terminalState, cmd[1]);
      break;
    case 'mkdir':
      handle_mkdir(terminalState, cmd[1]);
      break;
    case 'whoami':
      terminalState.output.push(<HistoryLine key={terminalState.output.length}>christopher</HistoryLine>);
      break;
    case 'help':
      handle_help(terminalState);
      break;
    case 'rm':
      handle_rm(terminalState, cmd.slice(1));
      break;
    case 'rmdir':
      handle_rmdir(terminalState, cmd.slice(1));
      break;
    case 'open':
    case 'vim':
    case 'emacs':
    case 'nano':
    case 'code':
      handle_open(cmd[1]);
      break;
    default:
      if (input) {
        const msg = 'Command "' + input + '" not found. Try "help" to see some available commands';
        terminalState.output.push(<HistoryLine key={terminalState.output.length}>{msg}</HistoryLine>);
      }
      break;
  }

  // sync lines written
  terminalState.setOutput([...terminalState.output]);
};

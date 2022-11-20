import { TerminalOutput } from "react-terminal-ui";

const help_commands = {
                        "ls":["","list files in directory"],
                        "cd [page]":["","change to another page"],
                        "open [item.txt]": ["","open a text file"],
                        "clear":["","clear the terminal screen"],
                        "pwd": ["","print working directory"],
                        "help":["","view some popular commands"],
                      };                        

const handleCd = (path, ls) => {
    /* absolute paths (always valid) */
    switch(path) {
        case "~":
        case "..":
        case "/home/christopher":
          return "/";
        case "~/about":
        case "../about":
        case "/home/christopher/about":
          return "about";
        case "~/projects":
        case "../projects":
        case "/home/christopher/projects":
          return "projects";
        case "~/contact":
        case "../contact":
        case "/home/christopher/contact":
          return "contact";
        default:
          break;
    }
    /* check for 'ls' values we've designated directories */
    if (path in ls) {
      if (ls[path][0] === "text-dir")
        return(path); 
    }
};

/* returns cd 'path' or 0 */
const processUserInput = (input, page_comps, line_state) => {
  const prefix = "christopher@mcgregor:";
  const curr_prompt = prefix + page_comps.path + '$';

  function formatOutput(cmd_table, offset, extra) {
    /* create 'history' line */
    line_state.data.push(<TerminalOutput>{curr_prompt + ' ' + input}</TerminalOutput>);

    /* sort keys */
    const sorted_keys = Object.keys(cmd_table).sort().reduce((acc, key) => ({
      ...acc, [key]: cmd_table[key]
      }), {});

    /* build up formatted output */
    for (var key in sorted_keys) {
      const desc = ' '.repeat(offset - key.length) + cmd_table[key][1] + "\n";
      const color = cmd_table[key][0];
      const formatted_cmd = "  " + key + desc;
      
      line_state.data.push(
       <div className={color}>
        <TerminalOutput>
          {formatted_cmd}
          </TerminalOutput>
      </div>
      );
    }
    
    /* sync changes */
    line_state.set([...line_state.data]);
  }

    const cmd = input.split(' ');
    const full_path = page_comps.path.split('/');
    switch(cmd[0]) {
        case "pwd": 
          line_state.set([...line_state.data,
            <TerminalOutput>{curr_prompt + ' ' + input}</TerminalOutput>,
            <TerminalOutput>  /home/christopher/{full_path[1]}</TerminalOutput>]);
          return 0;
        case "clear":
          line_state.set([]);
          return 0;
        case "help":
          formatOutput(help_commands, 20);
          return 0;
        case "ls":
          formatOutput(page_comps.ls, 20);
          return 0;
        case "cd":
          const path = handleCd(cmd[1], page_comps.ls);

          if (path) {
            return path;
          } else {
            const err = "Hm, I couldn't find \"" + cmd[1] + "\"\n  Try: 'ls' to see all pages(blue), or click one from the top menu\n";
            line_state.set([...line_state.data, 
                            <TerminalOutput>{curr_prompt + ' ' + input}</TerminalOutput>,
                            <TerminalOutput>  {err}</TerminalOutput>])
            return 0;
          }
        case "open":
          if (cmd[1] in page_comps.openable) {
            page_comps.openable[cmd[1]](true);
            line_state.set([...line_state.data, 
                            <TerminalOutput>{curr_prompt + ' ' + input}</TerminalOutput>
                          ]);
          } else {
            var err = "  Hm, I couldn't find \"" + cmd[1] + "\"\n  Try: 'ls' to see all files(white)\n";
            if (cmd.length != 2) {
              const space = ' '.repeat(20 - 15); // open [file.txt]
              err = "  USAGE: open [file.txt]";
            }
            line_state.set([...line_state.data, 
              <TerminalOutput>{curr_prompt + ' ' + input}</TerminalOutput>,
              <TerminalOutput>{err}</TerminalOutput>
            ]);
          }
          return 0;
        case "touch":
          /* push echo */
          line_state.data.push(<TerminalOutput>{curr_prompt + ' ' + input}</TerminalOutput>);

          /* check for usage (only 2 params) */
          if (cmd.length < 2) {
            err = "  USAGE: touch [file.txt] ..";
            /* push err message */
            line_state.data.push(<TerminalOutput>{err}</TerminalOutput>);
          } else {
            /* add file(s) to ls */
            for (var i = 1; i < cmd.length; i++) {
              page_comps.created.push(cmd[i]);
              page_comps.ls[cmd[i]] = ["", ""];
            }
          }

          /* sync changes */
          line_state.set([...line_state.data]);
          return 0;
        case "rm":
          /* push echo */
          line_state.data.push(<TerminalOutput>{curr_prompt + ' ' + input}</TerminalOutput>);

          if (cmd.length < 2) {
            err = "  rm: missing operand";
            /* push err message */
            line_state.data.push(<TerminalOutput>{err}</TerminalOutput>);
          } else {
            const index = page_comps.created.indexOf(cmd[1]);
            if (index > -1) {
              page_comps.created.splice(index, 1);
              delete page_comps.ls[cmd[1]];
            } else {
              err = "  rm: cannot remove \'" + cmd[1] + "\'\n";
              /* push err message */
              line_state.data.push(<TerminalOutput>{err}</TerminalOutput>);
            }
          }

          /* sync changes */
          line_state.set([...line_state.data]);
          return 0;
        case "chmod":
          /* push echo */
          line_state.data.push(<TerminalOutput>{curr_prompt + ' ' + input}</TerminalOutput>);
          if (cmd.length < 3) {
            err = "  chmod: missing operand\n"; 
            /* push err message */
            line_state.data.push(<TerminalOutput>{err}</TerminalOutput>);
          } else {
            const index = page_comps.created.indexOf(cmd[2]);
            if (index > -1) {
              if (page_comps.ls[cmd[2]][0] === "") {
                page_comps.ls[cmd[2]][0] = "text-exe";
              } else {
                page_comps.ls[cmd[2]][0] = "";
              }
            } else {
              err = "  chmod: cannot access \'" + cmd[2] + "\'\n";
              /* push err message */
              line_state.data.push(<TerminalOutput>{err}</TerminalOutput>);
            }
          }

          /* sync changes */
          line_state.set([...line_state.data]);
          return 0;
        case "welcome":
        case "./welcome":
          line_state.set([...line_state.data,
            <div className="text-exe">
          <TerminalOutput>{page_comps.welcome}</TerminalOutput>
          </div>]);
          return 0;
        case "":
          line_state.set([...line_state.data, 
            <TerminalOutput>{curr_prompt + ' ' + input}</TerminalOutput>
          ]);
          return 0;
        default:
          const err = "  Command \"" + input + "\" not found. Try \"help\" to see some popular commands";
          line_state.set([...line_state.data, 
            <TerminalOutput>{curr_prompt + ' ' + input}</TerminalOutput>,
            <TerminalOutput>{err}</TerminalOutput>
          ]);
          return 0;
      }

      /* how'd we get here? */
      return -1;
};

export { processUserInput };
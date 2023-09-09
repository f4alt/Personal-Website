import '../../styles/editor.css';

import React, {useState, useRef} from 'react';

import {useThemeCol} from '../ThemeContext';
import Faux_Window from '../Faux_Window';
import Editor from '@monaco-editor/react';

import {EDITOR_FILE_DEFAULTS} from '../Object_Definitions/Editor_Files_Defaults';

export default function Editor_Modal(props) {
  const newFileRef = useRef(null);
  const [files, setFiles] = useState(EDITOR_FILE_DEFAULTS);
  const [openFile, setOpenFile] = useState(files[0]);
  const [addFilePopup, setAddFilePopup] = useState(false);

  function add() {
    if (!newFileRef || !newFileRef.current.value) return;

    /* try to figure out language using file extension */
    const ext = newFileRef.current.value.split('.').pop().toLowerCase();

    setFiles([...files, {name: newFileRef.current.value, language: ext, data: '// write some code!'}]);
    newFileRef.current.value = '';
    setAddFilePopup(false);
  }

  function open(_name) {
    for (let i = 0; i < files.length; i++) {
      if (files[i].name === _name) {
        setOpenFile(files[i]);
        return;
      }
    }
  }

  function remove(_name) {
    let filtered = files.filter(function(file) {
      return file.name != _name;
    });
    if (filtered.length == 0) {
      filtered = [{name: 'newfile.cpp', language: 'cpp', data: '// write some code!'}];
    }
    setFiles(filtered);

    if (filtered.length == 1) {
      setOpenFile(filtered[0]);
      return;
    }

    /* make sure we didn't close the currently open file */
    if (_name != openFile.name) {
      return;
    }
    /* if we did, open the first file in the list
       NOTE: our files arr hasn't been updated from the filter yet
    */
    if (_name != files[0].name) {
      setOpenFile(files[0]);
    } else {
      setOpenFile(files[1]);
    }
  }

  const openPopupWithDelay = () => {
    /* need a slight delay before focusing so components have settled */
    setAddFilePopup(true);
    setTimeout(() => {
      if (newFileRef.current) {
        newFileRef.current.focus();
      }
    }, 10);
  };

  const closePopupWithDelay = () => {
    setTimeout(() => setAddFilePopup(false), 200);
  };

  const {color, setColor, colorOptions} = useThemeCol();
  function handleEditorDidMount(editor, monaco) {
    monaco.editor.defineTheme('custom-theme', {
      base: 'vs',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': color.secondary,
        'editor.fontFamily': '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,\
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      },
    });

    monaco.editor.setTheme('custom-theme');
  };

  const tabBar = (
    <div className="tab-content">
      {files.map((file) =>
        <div className={`tab ${openFile.name === file.name ? 'selected' : ''}`} key={file.name}>
          <h3 onClick={() => open(file.name)}>
            {file.name}
          </h3>
          <button style={{display: 'flex'}} onClick={() => remove(file.name)}>X</button>
        </div>,
      )}
      <div className={`${files.length < 3 ? 'add-file-popup' : 'hidden'}`}>
        <div className={`${addFilePopup ? 'add-file-popup' : 'hidden'}`}>
          <input ref={newFileRef} onBlur={closePopupWithDelay}></input>
          <button className="add-file-btn" style={{display: 'flex'}} onClick={add}>+</button>
        </div>
        <button onClick={openPopupWithDelay}
          className={`${addFilePopup ? 'hidden' : 'add-file'}`}>+</button>
      </div>
    </div>
  );

  return (
    <Faux_Window title={openFile.name} tabBar={tabBar} {... props}>
      <div className="size-controller">
        <Editor
          className="editor"
          path={openFile.name}
          width="100%"
          height="98%"
          defaultLanguage={openFile.language}
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 18,
          }}
          onMount={handleEditorDidMount}
          value={openFile.data}
          onChange={(text) => openFile.data = text}
        />
      </div>
    </Faux_Window>
  );
}

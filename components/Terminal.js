import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';
import { processUserInput } from './dispatcher';

const TerminalController = (props) => {
  const router = useRouter();
  const prefix = "christopher@mcgregor:";
  const curr_prompt = prefix + props.page_comps.path + '$'

  const [terminalLineData, setTerminalLineData] = useState([
    <div>
      <div className="text-exe">
      <TerminalOutput>{props.page_comps.welcome}</TerminalOutput>
      </div>
      <TerminalOutput>Type 'help' if you need help getting started!</TerminalOutput>
    </div>
  ]);

  const line_state = {
    data: terminalLineData,
    set: setTerminalLineData
  };

  useEffect(() => {
    const allWithClass = Array.from(
      document.getElementsByClassName('react-terminal')
    );
    allWithClass.forEach(element => {
      element.style.height = '100%';
    });
  }, []);

  const onInput = (input) => {    
    const ret = processUserInput(input, props.page_comps, line_state);

    if (ret) {
      router.push(ret);
    }
  };

  return (
    <div className="fill-screen font-poppins">
      <Terminal name={"christopher@mcgregor:" + props.page_comps.path} colorMode={ ColorMode.Dark } onInput={onInput} prompt={curr_prompt}>
        { line_state.data }
      </Terminal>
    </div>
  );
};

export default TerminalController;

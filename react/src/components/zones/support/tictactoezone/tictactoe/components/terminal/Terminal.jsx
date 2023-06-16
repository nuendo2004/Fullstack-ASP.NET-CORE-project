import React, { useState } from "react";
import "./terminal.css";
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

export default function Terminal({ handleCommand }){
  const [history, setHistory] = useState([]);
  const [command, setCommand] = useState("");

  const handleCommandChange = (event) => {
    setCommand(event.target.value);
  }

  const handleCommandSubmit = (event) => {
    event.preventDefault();

    let response = handleCommand(command);

    setHistory([...history, { id: uuidv4(), command, response }]);
    setCommand("");
  }

  const Command = ({ command }) => <div>&gt; {command}</div>;

  const Response = ({ response }) => (response ? <div>{response}</div> : null);

  return (
    <>
      <div className="terminal">
         <div className="terminal-topbar">
          <span className="terminal-button terminal-button--close" />
          <span className="terminal-button terminal-button--min" />
          <span className="terminal-button terminal-button--max" />
        </div>       
        <div className="terminal-content">
            

      {history.map(h => (
        <div key={h.id}>
          <Command command={h.command} />
          <Response response={h.response} />
        </div>
      ))}

        </div>
      <div>
        <form className="terminal-input" onSubmit={handleCommandSubmit}>
          &gt; <input onChange={handleCommandChange} value={command} className="terminal-input" />
        </form>
      </div>
      </div>
    </>
  );
};

Terminal.propTypes = {
  handleCommand: PropTypes.shape({
    text: PropTypes.string.isRequired,
    handle: PropTypes.func.isRequired,
    description: PropTypes.string.isRequired,
  }),
  command: PropTypes.func,
  response: PropTypes.string

};
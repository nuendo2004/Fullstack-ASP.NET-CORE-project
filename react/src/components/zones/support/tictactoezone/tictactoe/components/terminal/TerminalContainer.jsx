import React from "react";
import Terminal from "./Terminal";
import  PropTypes  from "prop-types";

export default function TerminalContainer({handleSecurityEventTwo}) {
  const commands = [
    {
      text: "Hack Opponent",
      handle: () => {
       handleSecurityEventTwo();
       return "Success";
      },
      description: "Control Your Opponents Moves",
    },
    {
      text: "List foreign connections",
      handle: () => "You have 2 foreign connections 192.168.1.1, 192.168.1.2",
      description: "Check for Hackers",
    },
    {
      text: "Remove",
      handle: () => "Remove Success",
      description: "Remove Foreign Connections",
    },
  ];

  const getSpaces = (count) => {
    let spaces = [];
    for (let index = 0; index < count; index++) {
      spaces.push(<>&nbsp;</>);
    }
    return <>{spaces}</>;
  };

  const displayAllCommands = () => {
    return (
      <>
        <br />
        The following commands are available:
        <br />
        <br />
        {commands.map((command) => (
          <>
            &nbsp; &nbsp;
            {command.text}
            {getSpaces(30 - command.text.length)}
            {command.description}
            <br />
          </>
        ))}
        <br />
      </>
    );
  };

  const handleCommand = (text) => {
    if (text === "?" || text === "help") return displayAllCommands();

    const command = commands.find((command) => command.text === text);
    if (!command) return "Invalid command.";

    return command.handle();
  };
  return <Terminal handleCommand={handleCommand} />;
}

TerminalContainer.propTypes = {
  handleSecurityEventTwo: PropTypes.func.isRequired
};
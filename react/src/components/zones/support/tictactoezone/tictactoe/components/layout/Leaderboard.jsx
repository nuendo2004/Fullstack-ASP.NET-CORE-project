import React from "react";
import Table from "react-bootstrap/Table";
import propTypes from "prop-types";
import "../../tictactoe.css";

function Leaderboard({ leaders }) {
  const boardLeaders = leaders.map((leader, idx) => {
    return (
      <tr key={idx}>
        <td className="leaderboard-menu-font">{idx + 1}</td>
        <td className="leaderboard-menu-font">{leader.firstName}</td>
        <td className="leaderboard-menu-font">{leader.lastName}</td>
        <td className="leaderboard-menu-font">{leader.userName}</td>
        <td className="leaderboard-menu-font">{leader.score}</td>
      </tr>
    );
  });

  return (
    <div className="tto-leaderboard">
      <h2 className="leaderboard-menu-font">Leaderboard</h2>
      <Table bordered hover>
        <thead>
          <tr>
            <th className="leaderboard-menu-font">#</th>
            <th className="leaderboard-menu-font">First Name</th>
            <th className="leaderboard-menu-font">Last Name</th>
            <th className="leaderboard-menu-font">Username</th>
            <th className="leaderboard-menu-font">Score</th>
          </tr>
        </thead>
        <tbody>{boardLeaders}</tbody>
      </Table>
    </div>
  );
}
Leaderboard.propTypes = {
  leaders: propTypes.arrayOf(
    propTypes.shape({
      firstName: propTypes.string.isRequired,
      lastName: propTypes.string.isRequired,
      userName: propTypes.string.isRequired,
      score: propTypes.string.isRequired,
    }).isRequired
  ),
};
export default Leaderboard;

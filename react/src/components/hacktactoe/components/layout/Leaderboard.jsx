import React from "react";
import Table from "react-bootstrap/Table";
import propTypes from "prop-types";

function Leaderboard({ leaders }) {
  const boardLeaders = leaders.map((leader, idx) => {
    if (idx === 0) {
      return (
        <tr key={idx}>
          <td>-</td>
          <td>{leader.userName}</td>
          <td>{leader.record}</td>
        </tr>
      );
    } else {
      return (
        <tr key={idx}>
          <td>{idx}</td>
          <td>{leader.userName}</td>
          <td>{leader.record}</td>
        </tr>
      );
    }
  });

  return (
    <div className="tto-leaderboard">
      <h2>Leaderboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Wins-Losses</th>
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
      userName: propTypes.string.isRequired,
      record: propTypes.string.isRequired,
    })
  ),
};
export default Leaderboard;

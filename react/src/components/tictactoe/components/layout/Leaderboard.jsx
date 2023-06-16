import React from "react";
import Table from "react-bootstrap/Table";
import propTypes from "prop-types";

function Leaderboard({ leaders }) {
  const boardLeaders = leaders.map((leader, idx) => {
    return (
      <tr key={idx}>
        <td>{idx + 1}</td>
        <td>{leader.firstName}</td>
        <td>{leader.lastName}</td>
        <td>{leader.userName}</td>
        <td>{leader.score}</td>
      </tr>
    );
  });

  return (
    <div className="tto-leaderboard">
      <h2>Leaderboard</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Score</th>
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
    })
  ),
};
export default Leaderboard;

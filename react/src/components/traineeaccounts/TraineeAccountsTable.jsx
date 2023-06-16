import React from "react";
import PropTypes from "prop-types";
import "../../contact.css";
import debug from "sabio-debug";
const _logger = debug.extend("TraineeAccountsTable");

function TraineeAccountsTable(props) {
  _logger("props", props);
  const aTraineeAccount = props.traineeAccount;

  const onEditClick = (e) => {
    _logger("edit clicked", e);
    props.onEdit(props.traineeAccount);
  };

  return (
    <tr>
      <td>
        <img
          src={aTraineeAccount.avatarUrl}
          alt="example"
          className="contact-img"
        ></img>
      </td>
      <td>{aTraineeAccount.username}</td>
      <td>{aTraineeAccount.zone.name}</td>
      <td>{aTraineeAccount.accountStatus.name}</td>
      <td>
        <button
          type="button"
          className="btn btn-primary btn-md"
          onClick={onEditClick}
        >
          Edit
        </button>
      </td>
    </tr>
  );
}

TraineeAccountsTable.propTypes = {
  onEdit: PropTypes.func.isRequired,
  traineeAccount: PropTypes.shape({
    username: PropTypes.string.isRequired,

    avatarUrl: PropTypes.string.isRequired,
    zone: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    accountStatus: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

export default TraineeAccountsTable;

import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function ZoneConfigTable(props) {
  const aOrganization = props.zoneTables;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const tableSender = (e) => {
    e.preventDefault();

    const state = {
      type: "TABLE_VIEW",
      payload: aOrganization,
    };

    navigate(`/editzoneconfig/${aOrganization.id}`, { state });
  };

  const onToggleModal = () => {
    setIsOpen(!isOpen);
  };
  const onDelete = (e) => {
    e.preventDefault();
    props.onDelete(aOrganization);
  };

  return (
    <React.Fragment>
      <tbody>
        <tr>
          <th scope="row" key={aOrganization?.id}></th>
          <td>{aOrganization?.name}</td>
          <td>{aOrganization?.description}</td>
          <td>{aOrganization?.speedCategory?.name}</td>
          <td>{aOrganization?.spreadLevel?.name}</td>
          <td>
            {" "}
            <Link
              type="submit"
              className="me-1"
              to="/addzoneconfig"
              onClick={tableSender}
            >
              Edit
            </Link>{" "}
            <Link type="submit" className="me-1" onClick={onToggleModal}>
              Delete
            </Link>
            <Modal show={isOpen}>
              <Modal.Header>
                <Modal.Title>Action warning</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are sure you want to delete this !</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onToggleModal}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={onDelete}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </td>
        </tr>
      </tbody>
    </React.Fragment>
  );
}
export default ZoneConfigTable;

ZoneConfigTable.propTypes = {
  zoneTables: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    speedCategory: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    spreadLevel: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }),
  onDelete: PropTypes.func.isRequired,
};

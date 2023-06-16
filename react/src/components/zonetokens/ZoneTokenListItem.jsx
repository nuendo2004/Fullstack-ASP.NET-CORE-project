import React from "react";
import propTypes from "prop-types";
import { ListGroup, Button } from "react-bootstrap";

function NewsletterSubscriptionListItem(props) {
  const zoneToken = props.zoneToken;
  const generateQrCodeClickedLocal = () => {
    props.generateQrCodeClicked(zoneToken.token);
  };

  return (
    <ListGroup.Item className="d-flex">
      <div className="col-4">{zoneToken.name}</div>
      <div className="col-4">{zoneToken.token}</div>
      <Button
        type="button"
        variant="primary"
        className="ms-auto"
        size="sm"
        onClick={generateQrCodeClickedLocal}
      >
        Generate Qr Code
      </Button>
    </ListGroup.Item>
  );
}

NewsletterSubscriptionListItem.propTypes = {
  zoneToken: propTypes.shape({
    token: propTypes.string.isRequired,
    dateModified: propTypes.string.isRequired,
    dateCreated: propTypes.string.isRequired,
    createdBy: propTypes.number.isRequired,
    entityId: propTypes.number.isRequired,
    modifiedBy: propTypes.number.isRequired,
    name: propTypes.string.isRequired,
    quantity: propTypes.number.isRequired,
    traineeId: propTypes.number,
    trainingUnitId: propTypes.number,
    zoneId: propTypes.number.isRequired,
    zoneTokenTypeId: propTypes.number.isRequired,
  }),
  generateQrCodeClicked: propTypes.func.isRequired,
};

export default NewsletterSubscriptionListItem;

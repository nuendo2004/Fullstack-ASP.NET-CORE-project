import React from "react";
import propTypes from "prop-types";
import { ListGroup, Button } from "react-bootstrap";
import { format } from "date-fns";

function NewsletterSubscriptionListItem({ person, unsubscribeClickedlocal }) {
  let date = new Date(person.dateModified);

  return (
    <ListGroup.Item className="d-flex justify-content-between">
      {person.email}
      {!person.isSubscribed && (
        <div>Unsubscribed on: {format(date, "MM/dd/yyyy")}</div>
      )}
      {person.isSubscribed && (
        <Button
          type="button"
          variant="danger"
          className="me-1"
          size="sm"
          id={person.email}
          onClick={unsubscribeClickedlocal}
        >
          UnSubscribe
        </Button>
      )}
    </ListGroup.Item>
  );
}

NewsletterSubscriptionListItem.propTypes = {
  person: propTypes.shape({
    email: propTypes.string.isRequired,
    dateModified: propTypes.string.isRequired,
    dateCreated: propTypes.string.isRequired,
    isSubscribed: propTypes.bool.isRequired,
  }),
  unsubscribeClickedlocal: propTypes.func.isRequired,
};

export default NewsletterSubscriptionListItem;

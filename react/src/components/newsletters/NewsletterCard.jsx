import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { Button, Card, Col } from "react-bootstrap";
import "./newsletterstyle.css";

const _logger = debug.extend("NewsletterCard");

function NewsletterCard(props) {
  const newsletter = props.newsletter;
  _logger(newsletter);

  return (
    <Col xl={4} lg={4} md={6} sm={12}>
      <Card className="shadow-lg newsletter-cover mx-auto">
        <Card.Img
          variant="top"
          src={newsletter.coverPhoto}
          alt="Newsletter Cover"
          className="newsletter-cover-image"
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="text-center">
            <h3>{newsletter.name}</h3>
          </Card.Title>
          <Card.Footer className="d-flex flex-column">
            <Button
              href="#"
              className="text-center border-0 justify-content "
              variant="primary"
              size="sm"
            >
              READ MORE...
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    </Col>
  );
}

NewsletterCard.propTypes = {
  newsletter: PropTypes.shape({
    id: PropTypes.number.isRequired,
    dateModified: PropTypes.string.isRequired,
    templateId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    coverPhoto: PropTypes.string.isRequired,
    dateToPublish: PropTypes.string.isRequired,
    dateToExpire: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    createdBy: PropTypes.shape({
      id: PropTypes.number.isRequired,
      email: PropTypes.string.isRequired,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
  }),
};
export default React.memo(NewsletterCard);

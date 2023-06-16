import React from "react";
import { Card, Image, Row, Col, Container } from "react-bootstrap";
import PropTypes from "prop-types";

function SurveyInstanceUserCard(props) {

  const answeredBy = props.user;
  const submitted = props.submitted;

  return (
    <React.Fragment>
      <Container>
        <Card className="mt-4">
          <Card.Body>
            <Row>
              <Col>
                <div className="d-flex align-items-center">
                  <div className="avatar avatar-xxl">
                    <Image
                      src={answeredBy?.avatarUrl || "https://bit.ly/3EX1l50"}
                      alt="user"
                      className="rounded-circle mt-2"
                    />
                  </div>
                  <div className="ms-3 align-items-center">
                    <h4 className="mb-0 mt-4">
                      {answeredBy?.firstName || ""} {answeredBy?.lastName}
                    </h4>
                    <div>
                      <p className="mb-0 text-muted">Survey Participant</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="mt-1 lh-1">
                  <i className="far fa-envelope fs-4 me-3 text-muted mt-15">
                    <div className="d-inline-block p-1">{answeredBy?.email}</div>
                  </i>
                </div>
              </Col>
              <Col>
                <div className="mt-1 lh-1">
                  <i className="far fa-calender-check fs-4 me-3 text-muted mt-15">
                    <div className="d-inline-block p-1">
                      Submitted: {submitted?.toString().substring(0, 10)}
                    </div>
                  </i>
                </div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  );
}

SurveyInstanceUserCard.propTypes = {
  submitted: PropTypes.string,
  user: PropTypes.shape({
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    mi: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
};

export default React.memo(SurveyInstanceUserCard);

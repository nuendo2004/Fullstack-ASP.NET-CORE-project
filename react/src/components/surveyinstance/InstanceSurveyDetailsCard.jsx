import React from "react";
import PropTypes from "prop-types";
import { Image, Card, Row, Col, Container } from "react-bootstrap";

function InstanceSurveyDetailsCard(props) {

  const survey = props.survey;

  const renderDateModified = () => {
    return (
      <React.Fragment>
        <Col>
          Date Modified:
          {survey?.dateModified.toString().substring(0, 10)}
        </Col>
        <Col>
          Modified By:
          {survey?.modifiedBy}
        </Col>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <h1 className="text-primary mt-4">Title</h1>
            <h3 className="mb-3 adjust-text text-break">{survey?.name}</h3>
            <h2 className="text-primary">Description</h2>
            <h3 className="mb-6 text-break">{survey?.description}</h3>
          </Col>
          <Col>
            <Card className="mt-4">
              <Card.Body>
                <div className="d-flex align-items-center">
                  <div className="avatar avatar-lg">
                    <Image
                      src={survey?.createdBy?.avatarUrl}
                      className="rounded-circle mt-1"
                      alt="author"
                    />
                  </div>
                  <div className="ms-3">
                    <h4 className="mb-0 mt-1">
                      {survey?.createdBy?.firstName} {survey?.createdBy?.lastName}
                    </h4>
                    <p className="mb-0 text-muted">Author</p>
                  </div>
                </div>
                <div className="mt-5 lh-1">
                  <i className="far fa-envelope fs-4 me-3 text-muted">
                    {survey?.createdBy?.email}
                  </i>
                </div>
              </Card.Body>
            </Card>
            <h3 className="my-3 text-primary d-inline-block mx-2">
              Type:
              <div className="d-inline-block text-black p-1 mx-1">
                {survey?.surveyType.name}
              </div>
            </h3>
            <h3 className="mb-8 text-primary d-inline-block mx-2">
              Status:
              <div className="d-inline-block text-black p-1 mx-1">
                {survey?.surveyStatus.name}
              </div>
            </h3>
          </Col>
          <Card.Footer>
            <Row>
              <Col>
                Date Created: {survey?.dateCreated.toString().substring(0, 10)}
              </Col>
              {survey?.dateModified < survey?.dateCreated && renderDateModified()}
            </Row>
          </Card.Footer>
        </Row>
      </Container>
    </React.Fragment>
  );
}

InstanceSurveyDetailsCard.propTypes = {
  survey: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdBy: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      avatarUrl: PropTypes.string,
      email: PropTypes.string,
    }),
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    modifiedBy: PropTypes.number,
    surveyStatus: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    surveyType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};

export default React.memo(InstanceSurveyDetailsCard);

import React from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup, Col, Row, Dropdown, Image } from "react-bootstrap";
import PropTypes from "prop-types";

const RecentNewsletters = ({ title }) => {
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  const ActionMenu = () => {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <i className="fe fe-more-vertical text-muted"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Header>SETTINGS</Dropdown.Header>
            <Dropdown.Item eventKey="1">
              <i className="fe fe-edit dropdown-item-icon"></i> Edit
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <i className="fe fe-trash dropdown-item-icon"></i> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  return (
    <Card className="h-100">
      <Card.Header className="d-flex align-items-center justify-content-between card-header-height">
        <h4 className="mb-0">{title}</h4>
        <Link to="#" className="btn btn-outline-white btn-sm">
          View all
        </Link>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroup.Item className={"px-0 pt-0"}>
            <Row>
              <Col className="col-auto">
                <Link to="#">
                  <Image
                    src=""
                    alt=""
                    className="img-fluid rounded img-4by3-lg"
                  />
                </Link>
              </Col>
              <Col className="ps-0">
                <Link to="#">
                  <h5 className="text-primary-hover">Newsletter Title</h5>
                </Link>
                <div className="d-flex align-items-center">
                  <Image
                    src="https://static.generated.photos/vue-static/face-generator/landing/wall/14.jpg"
                    alt=""
                    className="rounded-circle avatar-xs me-2"
                  />
                  <span className="fs-6">Author Name Here</span>
                </div>
              </Col>
              <Col className="col-auto">
                <ActionMenu />
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

RecentNewsletters.propTypes = {
  title: PropTypes.string,
  children: PropTypes.func,
  onClick: PropTypes.func,
};

export default RecentNewsletters;

import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
import debug from "sabio-debug";

const _logger = debug.extend("Sub Card: ");

const SubscriptionCard = (props) => {
  const subscriptions = props.subscription.props.subscription;
  const date = new Date(subscriptions.expirationDate);
  _logger("Props: ", subscriptions);

  if (new Date() <= date) {
    return (
      <Card className="mt-2" key={subscriptions.id}>
        <Card.Body>
          <div className="mt-2">
            <Row className="mb-4">
              <Col lg={6} md={8} sm={7} className="mb-2 mb-lg-0">
                <span className="d-block">
                  <span className="h4">
                    <h4 className="text-info">Free Trial </h4>
                  </span>
                </span>
                <span className="fs-6">
                  <h5>Subscription ID: {subscriptions.id}</h5>
                </span>
              </Col>
              <Col lg={3} md={4} sm={5} className="mb-2 mb-lg-0">
                {/* Custom Switch */}
              </Col>
              <Col
                lg={3}
                md={12}
                sm={12}
                className="d-lg-flex align-items-start justify-content-end"
              >
                <Link
                  to="/subscription"
                  className="btn btn-outline-primary btn-sm"
                >
                  Subscribe
                </Link>
              </Col>
            </Row>
            <Row>
              <Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
                <span className="fs-6">
                  <h5>Started On</h5>
                </span>
                <h6 className="mb-0">
                  {moment(subscriptions.startDate).utc().format("DD MMM YYYY")}
                </h6>
              </Col>
              <Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
                <span className="fs-6">
                  <h5>Price</h5>
                </span>
                <h6 className="mb-0">Free - 30 Day Trial</h6>
              </Col>
              <Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
                <span className="fs-6">
                  <h5>Access</h5>
                </span>
                <h6 className="mb-0">Limited Access</h6>
              </Col>
              <Col lg={3} md={3} sm={6} className="mb-2 mb-lg-0">
                <span className="fs-6">
                  <h5>Expiration Date</h5>
                </span>
                <h6 className="mb-0 text-danger">
                  {moment(subscriptions.expirationDate)
                    .utc()
                    .format("DD MMM YYYY")}
                </h6>
              </Col>
            </Row>
          </div>
        </Card.Body>
      </Card>
    );
  }
};

SubscriptionCard.propTypes = {
  subscription: PropTypes.shape({
    props: PropTypes.shape({
      subscription: PropTypes.shape({
        expirationDate: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        startDate: PropTypes.string.isRequired,
      }),
    }),
  }),
};

export default SubscriptionCard;

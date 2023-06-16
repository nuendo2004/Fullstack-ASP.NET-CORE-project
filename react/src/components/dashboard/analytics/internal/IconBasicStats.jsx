import React from "react";
import { Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const IconBasicStats = (props) => {
  const { title, value, iconName, iconColorVariant, classValue } = props;

  return (
    <Col xs={6} sm={4} md={3} lg={2} xl={2}>
      <Card border="light" className={`${classValue}`}>
        <Card.Body>
          <div className="d-flex align-items-center justify-content-between mb-2 lh-1">
            <div>
              <span className="fs-6 text-uppercase fw-semi-bold">{title}</span>
            </div>
            <div>
              <span
                className={`fe fe-${iconName} fs-3 text-${iconColorVariant}`}
              ></span>
            </div>
          </div>
          <h2 className="text-center fw-bold mb-0">{value}</h2>
        </Card.Body>
      </Card>
    </Col>
  );
};

IconBasicStats.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  iconName: PropTypes.string,
  iconColorVariant: PropTypes.string,
  classValue: PropTypes.string,
  summary: PropTypes.string,
  summaryValue: PropTypes.string,
  summaryIcon: PropTypes.string,
  showSummaryIcon: PropTypes.string,
};

export default IconBasicStats;

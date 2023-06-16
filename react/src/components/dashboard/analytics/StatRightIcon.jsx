import React from "react";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";

const StatRightIcon = (props) => {
  const {
    title,
    value,
    summary,
    summaryValue,
    summaryIcon,
    showSummaryIcon,
    iconName,
    iconColorVariant,
    classValue,
  } = props;

  return (
    <Card border="light" className={`${classValue}`}>
      <Card.Body>
        <div className="d-flex align-items-center justify-content-between mb-3 lh-1">
          <div>
            <span className="fs-6 text-uppercase fw-semi-bold">{title}</span>
          </div>
          <div>
            <span
              className={`fe fe-${iconName} fs-3 text-${iconColorVariant}`}
            ></span>
          </div>
        </div>
        <h2 className="fw-bold mb-1">{value}</h2>
        <span
          className={`text-${
            summaryIcon === "up" ? "success" : "danger"
          } fw-semi-bold`}
        >
          {showSummaryIcon ? (
            <i className={`fe fe-trending-${summaryIcon} me-1`}></i>
          ) : (
            ""
          )}
          {summaryValue}
        </span>
        <span className="ms-1 fw-medium">{summary}</span>
      </Card.Body>
    </Card>
  );
};

StatRightIcon.propTypes = {
  title: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  iconName: PropTypes.string,
  iconColorVariant: PropTypes.string,
  classValue: PropTypes.string,
  summary: PropTypes.string,
  summaryValue: PropTypes.string,
  summaryIcon: PropTypes.string,
  showSummaryIcon: PropTypes.string,
};

export default StatRightIcon;

import React from "react";
import { Row } from "react-bootstrap";
import PropTypes from "prop-types";
import IconBasicStats from "./IconBasicStats";
import debug from "sabio-debug";
const _logger = debug.extend("Stats");

const Stats = (props) => {
  _logger("props", props);
  const stats = props.stats;

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <IconBasicStats
          title="Total Organizations"
          value={stats.totalOrgs}
          iconName="codepen"
          iconColorVariant="primary"
          classValue="mb-3"
        ></IconBasicStats>
        <IconBasicStats
          title="Active Organizations"
          value={stats.activeOrgs}
          iconName="check-circle"
          iconColorVariant="primary"
          classValue="mb-3"
        ></IconBasicStats>
        <IconBasicStats
          title="Demo Accounts 60 Days"
          value={stats.demo60Days}
          iconName="users"
          iconColorVariant="primary"
          classValue="mb-3"
        ></IconBasicStats>
        <IconBasicStats
          title="Active Subscriptions"
          value={stats.activeSubs}
          iconName="user-check"
          iconColorVariant="primary"
          classValue="mb-3"
        ></IconBasicStats>
      </Row>
    </React.Fragment>
  );
};

Stats.propTypes = {
  stats: PropTypes.shape({
    activeOrgs: PropTypes.number.isRequired,
    activeSubs: PropTypes.number.isRequired,
    demo60Days: PropTypes.number.isRequired,
    totalOrgs: PropTypes.number.isRequired,
  }),
};

export default Stats;

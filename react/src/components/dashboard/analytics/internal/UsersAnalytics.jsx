import React, { Fragment, useState } from "react";
import { Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from "prop-types";
import ReactCardFlip from "react-card-flip";
import ActivePendingUsersChart from "./ActivePendingUsersChart";
import UsersStatChart from "./UsersStatChart";
import debug from "sabio-debug";
import {
  getMonthsValuesChooseYear,
  returnPercentageString,
} from "./internalFunctions";
const _logger = debug.extend("UsersAnalytics");

const UsersAnalytics = (props) => {
  _logger("props", props);

  const [flip, setFlip] = useState({
    flipped: false,
  });
  const onCardClick = () => {
    setFlip((prevState) => {
      return { flipped: !prevState.flipped };
    });
  };

  const activeUsers = props?.statusData?.active;
  const totalUsers = props?.statusData?.total;
  const flaggedUsers = props?.statusData?.flagged;
  const pendingUsers = props?.statusData?.pending;
  const userStatusOverTime = props?.statusOverTime;
  const pendingUsersData = props?.pendingOverTime;
  const year = props?.selectedYear;

  const activeUsersPercentage = returnPercentageString(activeUsers, totalUsers);
  const totalUsersOverTime = getMonthsValuesChooseYear(
    year,
    userStatusOverTime,
    "dateModified",
    "total"
  );
  const flaggedUsersOverTime = getMonthsValuesChooseYear(
    year,
    userStatusOverTime,
    "dateModified",
    "flagged"
  );
  const activeUsersOverTime = getMonthsValuesChooseYear(
    year,
    userStatusOverTime,
    "dateModified",
    "active"
  );
  const pendingUsersOverTime = getMonthsValuesChooseYear(
    year,
    pendingUsersData,
    "dateCreated",
    "pending"
  );

  const getSummaryValue = (data) => {
    const reversedArray = data.slice().reverse();
    let change = 0;
    const month = new Date().getMonth();
    const year = new Date().getFullYear();

    if (year !== props?.selectedYear && props?.selectedYear < year) {
      change = reversedArray[0] - reversedArray[1];
    } else if (String(month) === "0") {
      change = reversedArray[11] - 0;
    } else {
      change = reversedArray[11 - parseInt(month)] - (11 - parseInt(month) - 1);
    }

    if (change > 0) {
      return `+${change}`;
    } else if (change < 0) {
      return `${change}`;
    } else {
      return "0";
    }
  };

  const getSummaryIcon = (string) => {
    const sign = String(string).charAt(0);
    if (sign === "+") {
      return "up";
    } else if (sign === "-") {
      return "down";
    } else {
      return "secondary";
    }
  };

  return (
    <Fragment>
      <Row>
        <UsersStatChart
          title="Total Users"
          value={totalUsers}
          summary="Number of users"
          summaryValue={getSummaryValue(totalUsersOverTime)}
          summaryIcon={getSummaryIcon(getSummaryValue(totalUsersOverTime))}
          isSummaryIconShown={false}
          classValue="mb-3"
          chartName="TotalUsersChart"
          userStatusData={totalUsersOverTime}
          selectedYear={year}
        />
        <UsersStatChart
          title="Flagged Users"
          value={flaggedUsers}
          summary="Number of flagged users"
          summaryValue={getSummaryValue(flaggedUsersOverTime)}
          summaryIcon={getSummaryIcon(getSummaryValue(flaggedUsersOverTime))}
          isSummaryIconShown={false}
          classValue="mb-3"
          chartName="FlaggedUsersChart"
          userStatusData={flaggedUsersOverTime}
          selectedYear={year}
        />
      </Row>
      <Row>
        <OverlayTrigger
          placement={"top"}
          overlay={<Tooltip>Click To Flip</Tooltip>}
        >
          <div onClick={onCardClick}>
            <ReactCardFlip isFlipped={flip.flipped} flipDirection="vertical">
              <ActivePendingUsersChart
                title="ACTIVE USERS"
                value={activeUsers}
                summary="Number of active users"
                summaryValue={activeUsersPercentage}
                summaryIcon="info"
                showSummaryIcon
                classValue="mb-3"
                chartName="ActiveUsersChart"
                userStatusData={activeUsersOverTime}
              />
              <ActivePendingUsersChart
                title="PENDING USERS"
                value={pendingUsers}
                summary="Students"
                summaryValue={getSummaryValue(pendingUsersOverTime)}
                summaryIcon={getSummaryIcon(
                  getSummaryValue(pendingUsersOverTime)
                )}
                showSummaryIcon
                classValue="mb-3"
                chartName="PendingUsersChart"
                userStatusData={pendingUsersOverTime}
              />
            </ReactCardFlip>
          </div>
        </OverlayTrigger>
      </Row>
    </Fragment>
  );
};

UsersAnalytics.propTypes = {
  pendingOverTime: PropTypes.arrayOf(
    PropTypes.shape({
      dateCreated: PropTypes.string.isRequired,
      pending: PropTypes.number.isRequired,
    })
  ),
  selectedYear: PropTypes.number,
  statusData: PropTypes.shape({
    active: PropTypes.number.isRequired,
    flagged: PropTypes.number.isRequired,
    inactive: PropTypes.number.isRequired,
    pending: PropTypes.number.isRequired,
    removed: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }).isRequired,
  statusOverTime: PropTypes.arrayOf(
    PropTypes.shape({
      dateModified: PropTypes.string.isRequired,
      active: PropTypes.number.isRequired,
      inactive: PropTypes.number.isRequired,
      pending: PropTypes.number.isRequired,
      flagged: PropTypes.number.isRequired,
      removed: PropTypes.number.isRequired,
      total: PropTypes.number.isRequired,
    })
  ),
};

export default UsersAnalytics;

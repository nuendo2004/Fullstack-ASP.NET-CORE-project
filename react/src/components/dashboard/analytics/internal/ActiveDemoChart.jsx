import React, { Fragment } from "react";
import { Card, Col, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import "./internalanalytics.css";
import ApexCharts from "../ApexCharts";
import { getDateValue } from "utils/dateFormater";
import { getPropertyValues, isDateInThisWeek } from "./internalFunctions";
import debug from "sabio-debug";
import { activeDemoChartOptions, chartSeriesData } from "./internalChartData";
const _logger = debug.extend("ActiveDemoChart");

function getActiveBeginningOfWeek(data) {
  let array = [];
  for (let i = 0; i < data.length; i++) {
    let beginningOfWeek = getDateValue(new Date(data[i].week));
    array.push(beginningOfWeek);
  }
  return array;
}

function getAddedEightWeeks(data) {
  let demoAcctsArray = getPropertyValues(data, "activeAccounts");
  let changeOver8Weeks = demoAcctsArray[0] - demoAcctsArray[7];
  if (changeOver8Weeks > 0) {
    return `+${changeOver8Weeks}`;
  } else if (changeOver8Weeks < 0) {
    return `${changeOver8Weeks}`;
  } else {
    return "0";
  }
}

function getAddedThisWeek(data, week) {
  if (isDateInThisWeek(week)) {
    let changeFromLastWeek = data[0].activeAccounts - data[1].activeAccounts;
    if (changeFromLastWeek > 0) {
      return `+${changeFromLastWeek}`;
    } else if (changeFromLastWeek < 0) {
      return `${changeFromLastWeek}`;
    } else {
      return "0";
    }
  } else {
    return 0;
  }
}

function summaryTextColorClassName(string) {
  const sign = String(string).charAt(0);
  if (sign === "+") {
    return "text-success";
  } else if (sign === "-") {
    return "text-danger";
  } else {
    return;
  }
}

const ActiveDemoChart = (props) => {
  _logger("props", props);
  const demoData = props?.demoData;
  const mostRecentWeek = new Date(demoData[0]?.week);

  const activeAccountsArray = getPropertyValues(
    demoData,
    "activeAccounts"
  ).reverse();
  const startingWeekArray = getActiveBeginningOfWeek(demoData).reverse();
  const eightWeekClassName = summaryTextColorClassName(
    getAddedEightWeeks(demoData)
  );
  const lastWeekClassName = summaryTextColorClassName(
    getAddedThisWeek(demoData, mostRecentWeek)
  );

  return (
    <Fragment>
      <Col xs={12} sm={12} md={12} lg={4} xl={4} className="mb-3">
        <Card className="h-100">
          <Card.Header className="internal-analytics-card-header card-header-height">
            <h4 className="internal-analytics-title">Active Demo Accounts</h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col className="text-center">
                <span className="internal-analytics-title">8 Weeks</span>
                <h1
                  className={`internal-analytics-number-display h2 ${eightWeekClassName}`}
                >
                  {getAddedEightWeeks(demoData)}
                </h1>
                {/* <p className="text-success fw-semi-bold mb-0">
                  <i className="fe fe-trending-up me-1"></i>0%
                </p> */}
              </Col>
              <Col className="text-center">
                <span className="internal-analytics-title">This Week</span>
                <h1
                  className={`internal-analytics-number-display h2 ${lastWeekClassName}`}
                >
                  {getAddedThisWeek(demoData, mostRecentWeek)}
                </h1>
                {/* <p className="text-danger fw-semi-bold mb-0">
                  <i className="fe fe-trending-down me-1"></i>0%
                </p> */}
              </Col>
            </Row>
            <ApexCharts
              options={activeDemoChartOptions(startingWeekArray)}
              series={chartSeriesData(activeAccountsArray)}
              type="bar"
            />
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  );
};

ActiveDemoChart.propTypes = {
  demoData: PropTypes.PropTypes.arrayOf(
    PropTypes.shape({
      activeAccounts: PropTypes.number.isRequired,
      week: PropTypes.string.isRequired,
    })
  ),
};

export default ActiveDemoChart;

import React from "react";
import { Card, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import "./internalanalytics.css";
import ApexCharts from "../ApexCharts";
import {
  totalUsersChartOptions,
  flaggedUsersChartOptions,
} from "./internalChartData";
import { summaryIconColor } from "./internalFunctions";

function apexChartSeries(chartName, data) {
  switch (chartName) {
    case "FlaggedUsersChart":
      return [
        {
          name: "Flagged Users",
          data: data,
        },
      ];
    case "TotalUsersChart":
      return [
        {
          name: "Total Users",
          data: data,
        },
      ];
    default:
      return [
        {
          name: `${chartName} chart is undefined`,
          data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        },
      ];
  }
}

function ShowChart(chartName, chartSeries, year) {
  switch (chartName) {
    case "TotalUsersChart":
      return (
        <ApexCharts
          options={totalUsersChartOptions(year)}
          series={chartSeries}
          height={80.781}
          type="area"
        />
      );
    case "FlaggedUsersChart":
      return (
        <ApexCharts
          options={flaggedUsersChartOptions(year)}
          series={chartSeries}
          height={80.781}
          type="area"
        />
      );
    default:
      return chartName + " chart is undefined";
  }
}

const UsersStatChart = (props) => {
  const {
    title,
    value,
    summaryValue,
    summaryIcon,
    isSummaryIconShown,
    classValue,
    chartName,
    userStatusData,
    selectedYear,
  } = props;

  const chartNameSeries = apexChartSeries(chartName, userStatusData);

  return (
    <React.Fragment>
      <Col xs={12} sm={6} md={6} lg={3} xl={3} className={`${classValue}`}>
        <Card>
          <Card.Body className="text-center">
            <span className="internal-analytics-title">{title}</span>
            <h1 className="internal-analytics-number-display h3">{value}</h1>
            <p
              className={`text-${summaryIconColor(
                summaryIcon
              )} fw-semi-bold mb-0`}
            >
              {isSummaryIconShown ? (
                <i className={`fe fe-trending-${summaryIcon} me-1`}></i>
              ) : (
                ""
              )}{" "}
              {summaryValue}
            </p>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={6} md={6} lg={3} xl={3} className={`${classValue}`}>
        <Card>
          <Card.Body>
            {ShowChart(chartName, chartNameSeries, selectedYear)}
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

UsersStatChart.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  summaryValue: PropTypes.string,
  summaryIcon: PropTypes.string,
  isSummaryIconShown: PropTypes.bool,
  classValue: PropTypes.string,
  chartName: PropTypes.string,
  userStatusData: PropTypes.arrayOf(PropTypes.number).isRequired,
  selectedYear: PropTypes.number,
};

export default UsersStatChart;

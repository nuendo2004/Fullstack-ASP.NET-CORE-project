import React from "react";
import PropTypes from "prop-types";
import { Card, Row, Col } from "react-bootstrap";
import ApexCharts from "../ApexCharts";
import {
  activeUsersChartOptions,
  pendingUsersChartOptions,
} from "./internalChartData";
import { summaryIconColor } from "./internalFunctions";

function apexChartSeries(chartName, data) {
  switch (chartName) {
    case "ActiveUsersChart":
      return [
        {
          name: "Active Users",
          data: data,
        },
      ];
    case "PendingUsersChart":
      return [
        {
          name: "Pending Users",
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

function ShowChart(chartName, chartSeries) {
  switch (chartName) {
    case "ActiveUsersChart":
      return (
        <ApexCharts
          options={activeUsersChartOptions}
          series={chartSeries}
          height={200}
          type="line"
        />
      );
    case "PendingUsersChart":
      return (
        <ApexCharts
          options={pendingUsersChartOptions}
          series={chartSeries}
          height={200}
          type="line"
        />
      );
    default:
      return chartName + " chart is undefiend";
  }
}

const ActivePendingUsersChart = (props) => {
  const {
    title,
    value,
    summaryValue,
    summaryIcon,
    isSummaryIconShown,
    classValue,
    chartName,
  } = props;

  const chartNameSeries = apexChartSeries(chartName, props?.userStatusData);

  return (
    <Card border="light" className={`${classValue}`}>
      <Card.Body>
        <Row className="align-items-center">
          <Col md={12} lg={12} xl={12} sm={12}>
            <span className="internal-analytics-title">
              <i className="fe fe-refresh-cw"></i> {title}
            </span>
          </Col>
          <Col md={2} lg={2} xl={2} sm={2} className="text-center">
            <h1 className="internal-analytics-number-display h2">{value}</h1>
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
          </Col>
          <Col md={9} lg={9} xl={9} sm={9} className="align-items-stretch">
            {ShowChart(chartName, chartNameSeries)}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

ActivePendingUsersChart.propTypes = {
  title: PropTypes.string,
  value: PropTypes.number,
  summaryValue: PropTypes.string,
  summaryIcon: PropTypes.string,
  isSummaryIconShown: PropTypes.bool,
  classValue: PropTypes.string,
  chartName: PropTypes.string,
  userStatusData: PropTypes.arrayOf(PropTypes.number),
};

export default ActivePendingUsersChart;

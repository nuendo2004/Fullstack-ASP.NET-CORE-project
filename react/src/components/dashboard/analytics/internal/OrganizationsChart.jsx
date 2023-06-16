import React, { Fragment } from "react";
import { Col } from "react-bootstrap";
import "./internalanalytics.css";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import {
  getPropertyValues,
  optimalColumnWidthPercent,
} from "./internalFunctions";
import debug from "sabio-debug";
import {
  chartSeriesDataName,
  organizationsUsersChartOptions,
} from "./internalChartData";
const _logger = debug.extend("OrgChart");

const OrganizationsChart = (props) => {
  _logger("props", props);
  const orgData = props?.orgData?.dataArray;
  const orgChartName = props?.orgData?.chartName;
  const orgNames = getPropertyValues(orgData, "name");
  const orgPeople = getPropertyValues(orgData, "totalAmount");
  const optimalColumnWidth = optimalColumnWidthPercent(orgPeople.length);
  const orgChartOptions = organizationsUsersChartOptions(
    orgNames,
    orgChartName,
    optimalColumnWidth
  );
  const orgChartSeries = chartSeriesDataName(orgPeople, orgChartName);

  return (
    <Fragment>
      <Col xs={12} sm={12} md={6} lg={6} xl={6} className="pb-3">
        <div>
          <p className="internal-analytics-centered-title">
            Total {orgChartName} By Organization
          </p>
        </div>
        <div className="card">
          <div className="row">
            <div className="mixed-chart pt-3">
              <Chart
                options={orgChartOptions}
                series={orgChartSeries}
                type="bar"
                height={420}
              />
            </div>
          </div>
        </div>
      </Col>
    </Fragment>
  );
};

OrganizationsChart.propTypes = {
  orgData: PropTypes.shape({
    dataArray: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        totalAmount: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    chartName: PropTypes.string.isRequired,
  }),
};

export default OrganizationsChart;

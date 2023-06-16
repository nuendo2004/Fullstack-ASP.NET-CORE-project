import React from "react";
import ApexCharts from "components/dashboard/analytics/ApexCharts";
import Icon from "@mdi/react";
import { mdiSquareRounded } from "@mdi/js";
import { Row, Col, Card, Table, ListGroup } from "react-bootstrap";
import "./googleanalytics.css";
import PropTypes from "prop-types";

function GoogleAnalyticsGraph({
  pathNameData,
  operatingSysData,
  sessionsData,
  sessionsTotals,
  locationData,
  userData,
  eventData,
}) {
  const mapOSData = (operatingSysData) => {
    return operatingSysData.dimensions;
  };
  const mapSessionDimensions = (sessionsData) => {
    return sessionsData.dimensions[0];
  };
  const mapSessionMetrics = (sessionsData) => {
    return sessionsData.metrics[0].values;
  };
  const mapEventAnalytics = (eventData) => {
    return (
      <tr key={`001${eventData.dimensions}`}>
        <td className="text-dark fw-medium py-1">
          <Icon
            path={mdiSquareRounded}
            className="text-warning fs-5 me-2"
            size={0.6}
          />
          {eventData.dimensions[0]}
        </td>
        <td className="text-end fw-semi-bold py-1 text-dark">
          {eventData.metrics[0].values}
        </td>
      </tr>
    );
  };
  const mapLocationAnalytics = (locationData) => {
    return (
      <tr key={`001${locationData.dimensions[0]}`}>
        <td className="text-dark fw-medium py-1">
          <Icon
            path={mdiSquareRounded}
            className="text-success fs-5 me-2"
            size={0.7}
          />
          {locationData.dimensions[0]}
        </td>
        <td className="text-end fw-semi-bold py-1 text-dark">
          {locationData.metrics[0].values}
        </td>
      </tr>
    );
  };

  const iconColor = [
    "text-success fs-5 me-2",
    "text-danger fs-5 me-2",
    "text-warning fs-5 me-2",
  ];

  const mapOSAnalytics = (operatingSysData) => {
    return (
      <ListGroup.Item
        key={`{001${
          operatingSysData.dimensions[0] + operatingSysData.metrics[0].values
        }`}
        as="li"
        bsPrefix="list-inline-item mx-3"
      >
        <h5 className="mb-0 d-flex align-items-center fs-5 lh-1">
          <Icon path={mdiSquareRounded} className={iconColor} size={0.6} />
          {operatingSysData.dimensions}
        </h5>
      </ListGroup.Item>
    );
  };
  const mapPathAnalytics = (pathNameData) => {
    return (
      <tr key={`001${pathNameData.dimensions[0]}`}>
        <td className="text-dark fw-medium py-1">
          <Icon
            path={mdiSquareRounded}
            className="text-info fs-5 me-2"
            size={0.6}
          />
          {pathNameData.dimensions[0]}
        </td>
        <td className="text-end fw-semi-bold py-1 text-dark">
          {pathNameData.metrics[0].values}
        </td>
      </tr>
    );
  };

  const SessionChartSeries = [
    {
      data: [null, null, null, null, null, null, null],
    },
    {
      name: "Total Sessions",
      data: sessionsData?.map(mapSessionMetrics),
    },
  ];
  const SessionChartOptions = {
    chart: {
      toolbar: { show: !1 },
      height: 200,
      type: "line",
      zoom: { enabled: !1 },
    },
    dataLabels: { enabled: !1 },
    stroke: { width: [5, 4, 3], curve: "smooth", dashArray: [6, 4] },
    legend: { show: !1 },
    colors: ["#754ffe", "#19cb98"],
    markers: { size: 0, hover: { sizeOffset: 8 } },
    xaxis: {
      categories: sessionsData?.map(mapSessionDimensions),
      labels: {
        style: {
          colors: ["#5c5776"],
          fontSize: "12px",
          fontFamily: "Inter",
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#5c5776"],
          fontSize: "12px",
          fontFamily: "Inter",
          cssClass: "apexcharts-xaxis-label",
        },
        offsetX: -12,
        offsetY: 0,
      },
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (e) {
              return e;
            },
          },
        },
        {
          title: {
            formatter: function (e) {
              return e;
            },
          },
        },
        {
          title: {
            formatter: function (e) {
              return e;
            },
          },
        },
      ],
    },
    grid: { borderColor: "#f1f1f1" },
    responsive: [
      { breakpoint: 480, options: { chart: { height: 300 } } },
      { breakpoint: 1441, options: { chart: { height: 360 } } },
      { breakpoint: 1980, options: { chart: { height: 400 } } },
      { breakpoint: 2500, options: { chart: { height: 470 } } },
      { breakpoint: 3000, options: { chart: { height: 450 } } },
    ],
  };
  const ActiveUserChartSeries = [
    {
      data: userData?.map((userData) => {
        return userData.metrics[0].values[0];
      }),
    },
  ];
  const ActiveUserChartOptions = {
    chart: { type: "bar", height: 302, sparkline: { enabled: !0 } },
    states: {
      normal: { filter: { type: "none", value: 0 } },
      hover: { filter: { type: "darken", value: 0.55 } },
      active: {
        allowMultipleDataPointsSelection: !1,
        filter: { type: "darken", value: 0.55 },
      },
    },
    colors: ["#8968fe"],
    plotOptions: { bar: { borderRadius: 4, columnWidth: "50%" } },
    xaxis: { crosshairs: { width: 1 } },
    tooltip: {
      fixed: { enabled: !1 },
      x: { show: !1 },
      y: {
        title: {
          formatter: function () {
            return "Average Users:";
          },
        },
      },
      marker: { show: !1 },
    },
    responsive: [
      { breakpoint: 480, options: { chart: { height: 300 } } },
      { breakpoint: 1441, options: { chart: { height: 300 } } },
      { breakpoint: 1981, options: { chart: { height: 300 } } },
      { breakpoint: 2500, options: { chart: { height: 400 } } },
      { breakpoint: 3000, options: { chart: { height: 450 } } },
    ],
  };
  const OperatingSystemChartSeries = operatingSysData?.map(
    (operatingSysData) => {
      return operatingSysData.metrics[0].values;
    }
  );
  const OperatingSystemChartOptions = {
    labels: operatingSysData?.map(mapOSData),
    chart: { type: "polarArea", height: 350 },
    colors: ["#e53f3c", "#19cb98", "#754FFE", "#29BAF9"],
    legend: { show: !1 },
    stroke: { colors: ["#fff"] },
    fill: { opacity: 0.9 },
    responsive: [
      { breakpoint: 480, options: { chart: { height: 300 } } },
      { breakpoint: 1441, options: { chart: { height: 270 } } },
      { breakpoint: 1980, options: { chart: { height: 370 } } },
      { breakpoint: 2500, options: { chart: { height: 350 } } },
      { breakpoint: 3000, options: { chart: { height: 500 } } },
    ],
  };

  return (
    <React.Fragment>
      <div>
        <Row>
          <Col xl={4} lg={12} md={12} className="mb-4">
            <Card className="h-100">
              <Card.Header className="graph-card-header">
                <h4 className="mb-0">Active Users</h4>
                <div></div>
              </Card.Header>
              <Card.Body>
                <Row className="m-2 align-content-center">
                  <span className="fw-semi-bold">7 days</span>
                  <span className="fw-bold mt-2 mb-0 h2">
                    {operatingSysData?.metrics}
                  </span>
                  <p className="text-success fw-semi-bold mb-0"></p>
                </Row>
                <ApexCharts
                  options={ActiveUserChartOptions}
                  series={ActiveUserChartSeries}
                  type="bar"
                />
              </Card.Body>
            </Card>
          </Col>
          <Col xl={4} lg={12} md={12} className="mb-4">
            <Card className="h-100">
              <Card.Header className="graph-card-header">
                <h4 className="mb-0">Country of Origin</h4>
              </Card.Header>
              <Card.Body className="p-1 googleAnalytics-traffic-chart">
                <div className="table-responsive">
                  <Table className="w-100 mt-5 text-nowrap" borderless>
                    <tbody>
                      <tr>
                        <td className="text-dark fw-medium py-1">
                          <h6>Country</h6>
                        </td>
                        <td className="text-end fw-semi-bold py-1 text-dark">
                          <h6>Users</h6>
                        </td>
                      </tr>
                      {locationData?.map(mapLocationAnalytics)}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={4} lg={12} md={12} className="mb-4">
            <Card className="h-100">
              <Card.Header className="graph-card-header">
                <h4 className="mb-0">Operating System</h4>
              </Card.Header>
              <Card.Body>
                <ApexCharts
                  options={OperatingSystemChartOptions}
                  series={OperatingSystemChartSeries}
                  type="polarArea"
                  height={350}
                />
                <div className="mt-4 d-flex justify-content-center">
                  <ListGroup as="ul" bsPrefix="list-inline" className="mb-0">
                    {operatingSysData.map(mapOSAnalytics)}
                  </ListGroup>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={12} lg={12} md={12} className="mb-4">
            <Card className="h-100">
              <Card.Header className="graph-card-header">
                <h4 className="mb-0">Sessions</h4>
              </Card.Header>
              <Card.Body>
                <div>
                  <h4>Total: {sessionsTotals}</h4>
                </div>
                <ApexCharts
                  options={SessionChartOptions}
                  series={SessionChartSeries}
                  type="line"
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xl={6} lg={12} md={12} className="mb-4">
            <Card className="channel-graph">
              <Card.Header className="graph-card-header">
                <h4 className="mb-0">Traffic Channel</h4>
              </Card.Header>
              <Card.Body className="channel-graph-body p-1">
                <div className="table-responsive">
                  <Table className=" mt-5 text-nowrap" borderless>
                    <thead className="table-transparent">
                      <tr>
                        <th scope="col" className="">
                          Path Name
                        </th>
                        <th scope="col" className="text-end ">
                          Time on page
                        </th>
                      </tr>
                    </thead>
                    <tbody>{pathNameData?.map(mapPathAnalytics)}</tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xl={6} lg={12} md={12} className="mb-4">
            <Card className="channel-graph">
              <Card.Header className="card-header-height">
                <h4 className="mb-0">Event Channel</h4>
              </Card.Header>
              <Card.Body className="channel-graph-body p-1">
                <div className="table-responsive">
                  <Table className=" mt-5 text-nowrap" borderless>
                    <thead className="table-transparent">
                      <tr>
                        <th scope="col" className="">
                          Event Name
                        </th>
                        <th scope="col" className="text-end ">
                          Events
                        </th>
                      </tr>
                    </thead>
                    <tbody>{eventData?.map(mapEventAnalytics)}</tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

GoogleAnalyticsGraph.propTypes = {
  pathNameData: PropTypes.shape({
    dimensions: PropTypes.string.isRequired,
    metrics: PropTypes.string.isRequired,
    map: PropTypes.string.isRequired,
  }),
  operatingSysData: PropTypes.shape({
    dimensions: PropTypes.string.isRequired,
    metrics: PropTypes.string.isRequired,
    map: PropTypes.string.isRequired,
  }),
  sessionsData: PropTypes.shape({
    dimensions: PropTypes.string.isRequired,
    metrics: PropTypes.string.isRequired,
    map: PropTypes.string.isRequired,
  }),
  locationData: PropTypes.shape({
    dimensions: PropTypes.string.isRequired,
    metrics: PropTypes.string.isRequired,
    map: PropTypes.string.isRequired,
  }),
  userData: PropTypes.shape({
    dimensions: PropTypes.string.isRequired,
    metrics: PropTypes.string.isRequired,
    map: PropTypes.string.isRequired,
  }),
  eventData: PropTypes.shape({
    dimensions: PropTypes.string.isRequired,
    metrics: PropTypes.string.isRequired,
    map: PropTypes.string.isRequired,
  }),
  sessionsTotals: PropTypes.shape({
    dimensions: PropTypes.string.isRequired,
    metrics: PropTypes.string.isRequired,
  }),
};

export default GoogleAnalyticsGraph;

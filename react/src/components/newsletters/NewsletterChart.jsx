import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import logger from "sabio-debug";
import newsletterSubscriptionService from "services/newsletterSubscriptionService";
import { format, add } from "date-fns";
import { Container, Row, Col, Card } from "react-bootstrap";
import toastr from "toastr";

const _logger = logger.extend("NewsLetter");

function NewsletterChart() {
  const months = [
    { month: "January", value: 1 },
    { month: "February", value: 2 },
    { month: "March", value: 3 },
    { month: "April", value: 4 },
    { month: "May", value: 5 },
    { month: "June", value: 6 },
    { month: "July", value: 7 },
    { month: "August", value: 8 },
    { month: "September", value: 9 },
    { month: "October", value: 10 },
    { month: "November", value: 11 },
    { month: "December", value: 12 },
  ];

  const chart = {
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [3],
        curve: "smooth",
        dashArray: [0],
      },
      legend: {
        tooltipHoverFormatter: function (val, opts) {
          return (
            val +
            " - " +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            ""
          );
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6,
        },
      },
      grid: {
        borderColor: "#f1f1f1",
      },
      noData: {
        text: undefined,
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: undefined,
          fontSize: "14px",
          fontFamily: undefined,
        },
      },
    },
  };

  const [pageData, setPageData] = useState({
    totalSubscribers: 0,
    currentSubscribers: 0,
    seriesChartData: [
      {
        name: "Total Subscribers",
        data: "",
      },
    ],
  });

  useEffect(() => {
    const endDate = new Date();
    const firstOfMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 1);
    const startDate = add(firstOfMonth, { months: -5 });
    const startMonth = startDate.getMonth();

    const onGetByDateSuccess = (response) => {
      setPageData((prevState) => {
        const update = { ...prevState };
        update.seriesChartData[0].data = getData(response.items, startMonth);
        update.totalSubscribers = response.items[0].totalCountSubscribers;
        update.currentSubscribers = response.items[0].currentSubscribers;
        return update;
      });
    };

    newsletterSubscriptionService
      .getEmailsByDate(
        format(startDate, "yyyyMMdd"),
        format(endDate, "yyyyMMdd")
      )
      .then(onGetByDateSuccess)
      .catch(onGetByDateError);
  }, []);

  const onGetByDateError = (error) => {
    toastr.error("Something Went Wrong. Please Refresh");
    _logger("There was an error", error);
  };

  const getData = (incomingData, startMonth) => {
    const data = [];
    let i = startMonth;
    for (i; data.length < 6; i++) {
      const month = months[i];
      const template = { x: "month", y: 0 };
      template.x = month.month;
      const index = incomingData.findIndex(checkMonth);
      if (index !== -1) {
        template.y = incomingData[index].totalSubscribersPerMonth;
      }
      data.push(template);
      function checkMonth(incomingData) {
        return month.value === incomingData.month;
      }
      if (i === 11) {
        i = -1;
      }
    }
    return data;
  };

  return (
    <Container>
      <Row lg={{ span: 8, offset: 2 }} md={12} sm={12}>
        <Col className="mb-12">
          <h1 className="display-4 fw-bold mb-3 col-12">
            <span className="text-primary">Newsletter Subscribers Data</span>
          </h1>
        </Col>
      </Row>
      <Row lg={{ span: 8, offset: 2 }} md={12} sm={12}>
        <Col>
          <Card className="d-flex">
            <h3 className="p-3">
              Total New Subscribers(last 6 Months): {pageData.totalSubscribers}
            </h3>
          </Card>
        </Col>
        <Col>
          <Card className="d-flex">
            <h3 className="p-3">
              Subscribers Still Subscribed(last 6 Months):{" "}
              {pageData.currentSubscribers}
            </h3>
          </Card>
        </Col>
      </Row>
      <Row lg={{ span: 8, offset: 2 }} md={12} sm={12}>
        <Col className="mt-3">
          <Card id="chart">
            <h3 className="m-3">New Subscriptions per Month</h3>
            <ReactApexChart
              options={chart.options}
              series={
                pageData.seriesChartData[0].data && pageData.seriesChartData
              }
              type="line"
              height={400}
            />
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NewsletterChart;

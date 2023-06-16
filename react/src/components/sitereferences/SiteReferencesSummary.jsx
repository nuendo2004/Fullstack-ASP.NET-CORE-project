import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import SiteReferenceService from "services/siteReferenceService";
import { Card, Col, Row } from "react-bootstrap";
import toastr from "toastr";

function SiteReferenceSummary() {
  const [pieData, setPieData] = useState({
    series: [],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Search Engine", "Social Media", "Friend or Colleague", "Other"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  });

  const getSummaryOfSiteReferences = () => {
    SiteReferenceService.getSummary()
      .then(onGetSummarySuccess)
      .catch(onGetSummaryError);
  };

  const onGetSummarySuccess = (response) => {
    const summaryArray = response.item;
    const totals = [0, 0, 0, 0];
    summaryArray.map((x) => (totals[x.id - 1] = x.total));

    setPieData((prevState) => {
      const newObject = {
        ...prevState,
      };
      newObject.series = totals;
      return newObject;
    });
  };

  const onGetSummaryError = (error) => {
    toastr.error("Error collecting data", error);
  };

  useEffect(() => {
    getSummaryOfSiteReferences();
  }, []);

  return (
    <React.Fragment>
      <Row className="ms-0 px-0">
        <Col xl={4} lg={6} md={6}>
          <Card>
            <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
              <div>
                <h4 className="mb-0">Site References Chart</h4>
              </div>
            </Card.Header>
            <Card.Body className="py-lg-7">
              {pieData.series.length > 0 ? (
                <div className="donut">
                  <Chart
                    options={pieData.options}
                    series={pieData.series}
                    type="pie"
                    width="380"
                  />
                </div>
              ) : (
                <h1>No Data To Show</h1>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}
export default SiteReferenceSummary;

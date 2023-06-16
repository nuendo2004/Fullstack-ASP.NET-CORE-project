import React, { useState, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { overviewFeaturesData } from "./rescueCenterData";
import FeatureTopIconWithLink from "./FeatureTopIconWithLink";

function RescueOverview() {
  const [overviewFeatures, setOverviewFeatures] = useState({
    featuresComponents: "",
  });
  useEffect(() => {
    setOverviewFeatures((prevState) => {
      const d = { ...prevState };
      d.featuresComponents = overviewFeaturesData.map(mapOverviewFeatures);
      return d;
    });
  }, []);
  const mapOverviewFeatures = (feature, index) => {
    return (
      <Col
        md={4}
        xs={12}
        className={index === 0 ? "" : "border-start-md"}
        key={index}
      >
        <FeatureTopIconWithLink
          item={feature}
          className={
            overviewFeaturesData.length - 1 === index ? "" : "border-bottom"
          }
        />
      </Col>
    );
  };

  return (
    <>
      <div className="pt-5 pb-20 bg-colors-gradient">
        <Container>
          <Row>
            <div>
              <h1 className="display-3 mt-4 pt-2 pb-6">
                {"Welcome to the Rescue Center"}
              </h1>
              <h3 className="pb-10 pe-20">
                {
                  "The Rescue Center is here to help you. Here you can find help after you have experience a cyber security issue in your training. You can start by exploring below!"
                }
              </h3>
              <h4 className="pb-2">{"What can you find here?"}</h4>
              <ul className="pb-10">
                <li className="pb-2">
                  {
                    "Need some tips to avoid falling for cyber security traps? Check out the tips"
                  }
                </li>
                <li className="pb-2">
                  {
                    "Did you run into a threat and want to report it? Check out the report tab"
                  }
                </li>
                <li>
                  {
                    "Did you get locked out of your account? Check out account recovery"
                  }
                </li>
              </ul>
              <h3 className="pb-10 text-center">
                {
                  "Get started below and start exploring some of the Rescue Center options"
                }
              </h3>
            </div>
          </Row>
          <div className="bg-white rounded-3 shadow-sm">
            <Row>{overviewFeatures.featuresComponents}</Row>
          </div>
        </Container>
      </div>
    </>
  );
}
export default RescueOverview;

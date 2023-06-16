import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import SectionHeadingCenter from "./SectionHeadingCenter";
import FeatureTopIcon from "./FeatureTopIcon";
import "./landing.css";

const Features4Columns = () => {
  const title = "Build better skills,faster";
  const subtitle = "Why Learn with Immersed";
  const description = `Explore new skills, deepen existing passions, and get lost in creativity. What you find
    just might surprise and inspire you.`;

  const features = [
    {
      id: 1,
      icon: "settings",
      title: "Learn the latest skills",
      description: `Lorem ipsum dolor sit amet, lorem consectetur adipiscing elit.`,
    },
    {
      id: 2,
      icon: "user",
      title: "Get ready for a career",
      description: `Pellentesque eu mi rhoncus, rhoncus tortor a, interdum nisi.`,
    },
    {
      id: 3,
      icon: "award",
      title: "Earn a Certificate",
      description: `Quisque tempus lectus cursus, imperdiet eros vel, pulvinar arcu.`,
    },
    {
      id: 4,
      icon: "users",
      title: "Upskill your organization",
      description: `Etiam dignissim est tristique ex porta, bibendum commodo.`,
    },
  ];

  return (
    <div className="py-8 py-lg-18 bg-style-herotype text-light">
      <Container className="text-wh">
        <SectionHeadingCenter
          title={title}
          description={description}
          subtitle={subtitle}
        />
        <Row>
          {features.map((item, index) => {
            return (
              <Col lg={3} md={6} sm={12} key={index}>
                <FeatureTopIcon item={item} className="text-wh" />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default Features4Columns;

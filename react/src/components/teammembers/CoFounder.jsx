import React from "react";
import { Card, Image } from "react-bootstrap";
import "../teammembers/aboutpage.css";

function CoFounder() {
  return (
    <div className="mx-4">
      <Card>
        <Card.Body classname="about-page-cards">
          <Card.Title>Mary Smith</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Co-Founder</Card.Subtitle>
          <Card.Text>Co-Founder of Immersed</Card.Text>
          <Image
            src=" http://www.hrinasia.com/wp-content/uploads/2017/03/women-in-tech-singapore.jpg"
            alt=""
            className="mr-2"
            style={{ height: "250px" }}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default CoFounder;

import React from "react";
import { Card, Image } from "react-bootstrap";
import "../teammembers/aboutpage.css";

function Founder() {
  return (
    <div className="mx-4">
      <Card about-page-content>
        <Card.Body classname="about-page-cards  ">
          <Card.Title>Jack Cooper</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Founder</Card.Subtitle>
          <Card.Text>Founder of Immersed</Card.Text>

          <Image
            src="https://tse3.mm.bing.net/th?id=OIP.cOfaBwd3r91t4XGhkIzkoAHaEo&pid=Api&P=0"
            alt=""
            className=""
            style={{ height: "250px" }}
          />
        </Card.Body>
      </Card>
    </div>
  );
}

export default Founder;

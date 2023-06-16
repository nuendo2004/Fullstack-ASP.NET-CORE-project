import debug from "sabio-debug";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import zoneTokenService from "services/zoneTokenService";
import "./traineeslink.css";
import toastr from "toastr";

const _logger = debug.extend("Trainees");

const TraineesLink = () => {
  const [show, setShow] = useState(false);
  const [searchParams] = useSearchParams();
  let tokenUrl = "";

  useEffect(() => {
    tokenUrl = searchParams.get("token");
    _logger("TOKEN", tokenUrl);
    zoneTokenService
      .getToken(tokenUrl)
      .then(onGetTokenSuccess)
      .catch(onGetTokenCatch);
  }, []);

  function onGetTokenSuccess(response) {
    _logger("RESPONSE", response.item.token);
    setShow(true);
  }

  const onGetTokenCatch = () => {
    toastr.error("Error while retrieving data");
  };

  const logIn = () => {
    return (
      <Container>
        <Row className="d-flex justify-content-center">
          <Col md={8} sm={12}>
            <Card className="p-3 m-3">
              <Card.Title>
                <h2>Already have an account?</h2>
              </Card.Title>
              <Card.Body>
                <Link to="/signin" className="btn btn-primary col-12">
                  Sign In
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col md={8}>
            <Card className="p-3 m-3">
              <Card.Title>
                <h2>{`Don't have an account?`}</h2>
              </Card.Title>
              <Card.Body>
                <Link to="/signup" className="btn btn-primary col-12">
                  Register
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return (
    <React.Fragment>
      <div className="container">
        <div className="card-center">
          {show ? logIn() : <h3>Invalid Token </h3>}
        </div>
      </div>
    </React.Fragment>
  );
};

export default TraineesLink;

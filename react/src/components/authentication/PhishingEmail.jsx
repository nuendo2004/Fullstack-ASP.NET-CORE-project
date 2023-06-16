import React, { useEffect, useState } from "react";
import { Col, Row, Container, Image } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import ComingSoonImage from "assets/images/background/comingsoon.svg";
import logger from "sabio-debug";
import emailService from "services/emailService";
import swal from "sweetalert2";

const _logger = logger.extend("Trainee Confirmated");

const PhishingEmail = () => {
  const [confirmed, setConfirmed] = useState(false);
  _logger("confirmed", confirmed);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  _logger("token ->", token);
  

  const confirmTrainee = () => {
    emailService
      .confirmTrainee(token)
      .then(onConfirmUserSuccess)
      .catch(onConfirmUserFail);
  };

  const onConfirmUserSuccess = (response) => {
    _logger("confirmUser success", response);
    setConfirmed(true);
    const Toast = swal.mixin({
      toast: true,
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });

    Toast.fire({
      icon: "success",
      title: "Thank you",
      text: "Redirecting you to page",
    });
    setTimeout(() => {
      navigate("/Redirecting page");
    }, 3000);
  };

  const onConfirmUserFail = (error) => {
    _logger("fail", error);
  };

  useEffect(() => {
    confirmTrainee();
  }, []);

  const displayText = confirmed
    ? "Error"
    : "Error";

  return (
    <div className="bg-white">
      <Container className="d-flex flex-column">
        <Row className="align-items-center justify-content-center g-0 py-lg-22 py-10">
          <Col
            xl={{ span: 5, offset: 1 }}
            lg={6}
            md={12}
            sm={12}
            className="text-center text-lg-start"
          >
            <h1 className="display-3 mb-2 fw-bold">{displayText}</h1>
          </Col>
          <Col
            xl={{ span: 5, offset: 1 }}
            lg={6}
            md={12}
            sm={12}
            className="mt-8 mt-lg-0"
          >
            <Image src={ComingSoonImage} alt="" className="w-100" />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PhishingEmail;

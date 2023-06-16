import React, { useEffect, useState } from "react";
import { Col, Row, Container, Image } from "react-bootstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import ComingSoonImage from "assets/images/background/comingsoon.svg";
import logger from "sabio-debug";
import userService from "services/userService";
import swal from "sweetalert2";

const _logger = logger.extend("EmailConfirmation");

const EmailConfirmation = () => {
  const [confirmed, setConfirmed] = useState(false);
  _logger("confirmed", confirmed);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  _logger("token ->", token);
  _logger("email ->", email);

  const confirmUser = () => {
    userService
      .confirmUser(token, email)
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
      title: "Thank you for confirming your email!",
      text: "Taking you back to the sign in page...",
    });
    setTimeout(() => {
      navigate("/signin");
    }, 3000);
  };

  const onConfirmUserFail = (error) => {
    _logger("confirmUser fail", error);
  };

  useEffect(() => {
    confirmUser();
  }, []);

  const displayText = confirmed
    ? "Registration Complete!"
    : "Unable to complete registration";

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

export default EmailConfirmation;

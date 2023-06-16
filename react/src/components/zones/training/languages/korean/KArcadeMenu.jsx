import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import { ImCog } from "react-icons/im";
import { FaUserCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import swal from "sweetalert2";
import toastr from "toastr";
import "./karcade.css";

function KArcadeMenu() {
  const navigate = useNavigate();
  const [ taskTig, setTaskTig ] = useState(false);
  const [ taskMag, setTaskMag] = useState(false);

  const handleMenuOptions = (e) => {
    const navMain = "/zones/10/k-arcade/main";
    switch (e.target.name) {
      case "city":
        navigate(navMain, { state: { type: "CITY_VIEW" }});
        break;
      case "academy":
        navigate(navMain, { state: { type: "ACADEMYHALL_VIEW" }});
        break;
      case "collection":
        navigate(navMain, { state: { type: "COLLECTION_VIEW" }});
        break;
      default:
        toastr.info(e.target.name);
        break;
    }
  };

  const onClickSettings = () => {
    swal.fire({
      backdrop: "rgba(0,0,0,0)",
      showConfirmButton: false,
      inputAutoFocus: false,
      allowOutsideClick: true,
      heightAuto: false,
      width: "15vw",
      padding: "1rem",
      position: "top-end",
      text: "Settings"
    });
  };

  const onClickMag = () => {
    navigate("/zones/10/k-arcade/main", { state: { type: "B_NATIVE_VIEW" }});
  };

  const onClickTig = () => {
    navigate("/zones/10/k-arcade/main", { state: { type: "B_SINO_VIEW" }});
  };

  const onMOverColMag = () => {
    setTaskMag((prevState) => !prevState);
  };

  const onMOutColMag = () => {
    setTaskMag((prevState) => !prevState);
  };

  const onMOverColTig = () => {
    setTaskTig((prevState) => !prevState);
  };

  const onMOutColTig = () => {
    setTaskTig((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <Container className="kr-menu-container mx-auto p-4 d-block mb-4">
        <Card className="kr-menu-card p-4">
          <Card.Header className="kr-menu-card__header d-block py-0 mx-auto">
            <Row className="kr-menu-card__header-row px-4 py-0">
                <Col className="kr-menu-card__header-col-user text-start ps-0 inline-flex">
                  <FaUserCircle 
                    viewBox="0 0 500 500"
                    className="kr-menu-user-icon"
                  />
                </Col>
                <Col className="kr-menu-card__header-col-misc text-start px-0">
                  <Image 
                    src="https://sabio-training.s3-us-west-2.amazonaws.com/immersed88175dbe-b244-4c6a-a45c-b0017d67ee55/KarcadeLogoWhite.png"
                    alt="KArcade Logo"
                    className="kr-menu-karcade-logo"
                  />
                </Col>
                <Col className="kr-menu-card__header-col-settings text-end pe-0">
                  <Button
                      className="kr-menu-settings-btn p-0 m-0 text-end"
                      onClick={onClickSettings}
                    >
                      <ImCog viewBox="-2 -2 20 20" className="kr-menu-settings-icon mx-0 p-0"/>
                    </Button>
                </Col>
            </Row>
          </Card.Header>
          <Card.Body className="kr-menu-card__body p-4 mx-auto mt-1">
            <Row className="kr-menu-card__body-row mx-0">
              <Col className="kr-menu-card__body-col px-0 d-flex">
                <Col className="kr-menu-card__body-col__mag p-0" onMouseOver={onMOverColMag} onMouseOut={onMOutColMag}>
                  <Row className="kr-menu-card__body__mag-top d-flex justify-content-center mx-0">
                    <Image 
                      src="https://sabio-training.s3-us-west-2.amazonaws.com/immersedeb0f0809-bf68-4287-b15b-a23cc78e35f8/MagC.png"
                      alt=""
                      className="kr-menu-card__body-mag"
                      onClick={onClickMag}
                    />
                  </Row>
                  <Row className="kr-menu-card__body__mag-bot d-flex justify-content-center mx-0">
                  <h1 className={`${taskMag === false ? "d-none" : null} text-center text-white`}>
                    {"Native Korean Numbers (1-10)"}
                  </h1>
                  </Row>
                </Col>
                <Col className="kr-menu-card__body-col__tig p-0" onMouseOver={onMOverColTig} onMouseOut={onMOutColTig}>
                  <Row className="kr-menu-card__body__tig-top d-flex justify-content-center mx-0">
                    <Image 
                      src="https://sabio-training.s3-us-west-2.amazonaws.com/immersedd8e92dd1-688c-4ec6-a3b6-29591f235bb5/TigC.png"
                      alt=""
                      className="kr-menu-card__body-tig"
                      onClick={onClickTig}
                    />
                  </Row>
                  <Row className="kr-menu-card__body__tig-bot d-flex justify-content-center mx-0">
                    <h1 className={`${taskTig === false ? "d-none" : null} text-center text-white`}>
                      {"Sino Korean Numbers (1-10)"}
                    </h1>
                  </Row>
                </Col>
              </Col>
              <Col className="kr-menu-card__body-col-x d-flex p-0">
                <Row 
                  className="kr-menu-card__body-col-x__row-city-view justify-content-center mx-auto align-items-center text-white">
                  <Button 
                    className="kr-menu-city-btn p-0 h-100"
                    name="city"
                    onClick={handleMenuOptions}
                  >
                    City View
                  </Button>
                </Row>
                <Row 
                  className="kr-menu-card__body-col-x__row-academy justify-content-center mx-auto align-items-center text-white" >
                  <Button
                    className="kr-menu-academy-btn p-0 h-100"
                    name="academy"
                    onClick={handleMenuOptions}
                  >
                    Academy
                  </Button>
                </Row>
                <Row 
                  className="kr-menu-card__body-col-x__row-collection justify-content-center mx-auto align-items-center text-white">
                  <Button
                    className="kr-menu-collection-btn p-0 h-100"
                    name="collection"
                    onClick={handleMenuOptions}
                  >
                    Collection
                  </Button>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  )
}

export default KArcadeMenu;

KArcadeMenu.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }),
};
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Container, Col, Row, Button, Image } from "react-bootstrap";
import KArcadeAcademyHall from "./KArcadeAcademyHall";
import KArcadeAcademy from "./KArcadeAcademy";
import KArcadeCity from "./KArcadeCity";
import KArcadeCollection from "./KArcadeCollection";
import KArcadeGameZone from "./KArcadeGameZone";
import { TiArrowBack } from "react-icons/ti";
import { ImCog } from "react-icons/im";
import swal from "sweetalert2";
import debug from "sabio-debug";
import "./karcade.css";

const _logger = debug.extend("KArcadeMain")

function KArcadeMain() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [ screen, setScreen ] = useState();
  const [ logo, setLogo ] = useState(true);

  useEffect(() => {
    switch (state?.type) {
      case "B_SINO_VIEW":
        setScreen(() => {
          return <KArcadeAcademy state={{ type: "B_SINO_VIEW" }} />
        });
        break;
      case "B_NATIVE_VIEW":
        setScreen(() => {
          return <KArcadeAcademy state={{ type: "B_NATIVE_VIEW" }}/>
        });
        break;
      case "CITY_VIEW":
        setScreen(() => {
          return <KArcadeCity />
        });
        break;
      case "ACADEMYHALL_VIEW":
        setScreen(() => {
          return <KArcadeAcademyHall />
        });
        break;
      case "COLLECTION_VIEW":
        setScreen(() => {
          return <KArcadeCollection />
        });
        break;
      case "BASIC_SINO_MEMORY":
        setScreen(() => {
          return <KArcadeGameZone state={{ type: "BASIC_SINO_MEMORY" }} />
        });
        break;
      case "BASIC_NATIVE_MEMORY":
        setScreen(() => {
          return <KArcadeGameZone state={{ type: "BASIC_NATIVE_MEMORY" }} />
        });
        break;
      default:
        _logger(state);
        break;
    };

  }, [state]);

  const onClickLogo = () => {
    navigate("/zones/10/k-arcade");
  };

  const onClickBack = () => {
    navigate(-1);
  };

  const onClickSettings = (e) => {
    e.preventDefault();
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

  return (
    <React.Fragment>
      <Container className="kr-main-container mx-auto p-4 d-block mb-4">
        <Card className="kr-main-card px-4 pb-4 pt-2">
          <Card.Header className="kr-main-card__header py-1 d-block mx-auto">
            <Row className="kr-main-card__header-row d-flex p-2">
                <Col className="kr-main-card__header-col-back text-start ps-0">
                  <Button
                    className="kr-main-back-btn p-0 text-start m-0"
                    onClick={onClickBack}
                  >
                    <TiArrowBack viewBox="2 5 16 16" className="kr-main-back-icon mx-0 mb-1" />
                    Back
                  </Button>
                </Col>
                <Col className="kr-main-card__header-col-logo px-0 text-center">
                  <Button 
                    className="kr-main-btn--logo p-0"
                    onMouseOver={() => setLogo(false)}
                    onMouseOut={() => setLogo(true)}
                    onClick={onClickLogo}
                    >
                    <Image 
                      src="https://sabio-training.s3-us-west-2.amazonaws.com/immersed88175dbe-b244-4c6a-a45c-b0017d67ee55/KarcadeLogoWhite.png"
                      alt="KArcade Logo - White"
                      className={`kr-main-karcade-logo ${logo === false ? "d-none" : null}`} 
                    />
                    <Image 
                      src="https://sabio-training.s3-us-west-2.amazonaws.com/immerseda6bb66d7-c861-412f-8e71-3939c455ec7c/KarcadeLogoOrange.png"
                      alt="KArcade Logo - Orange"
                      className={`kr-main-karcade-logo-hover ${logo === true ? "d-none" : null}`}
                    />
                  </Button>
                </Col>
                <Col className="kr-main-card__header-col-settings text-end pe-0">
                  <Button
                    className="kr-main-settings-btn p-0 m-0 text-end"
                    onClick={onClickSettings}
                  >
                    <ImCog viewBox="0 0 16 16" className="kr-main-settings-icon mx-0 p-0"/>
                  </Button>
                </Col>
            </Row>
          </Card.Header>
          <Card.Body className="kr-main-card__body px-4 pb-4 pt-0 mx-auto mt-2">
            <Col className="kr-main-card__body-col">
              {screen}
            </Col>
          </Card.Body>
        </Card>
      </Container>
    </React.Fragment>
  )
}

export default KArcadeMain;
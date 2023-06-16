import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Button } from "react-bootstrap";
import "./karcade.css";
import debug from "sabio-debug";

const _logger = debug.extend("KArcadeAcademyHall");

const KArcadeAcademyHall = () => {
  
  const navigate = useNavigate();

  const onClickSubject = (e) => {
    _logger("onClick ->", e.target.name);
    const navMain = "/zones/10/k-arcade/main";

    switch (e.target.name) {
      case "basicSinoKNumBtn":
        navigate(navMain, { state:{ type: "B_SINO_VIEW" }});
        break;
      case "basicNativeKNumBtn":
        navigate(navMain, { state:{ type: "B_NATIVE_VIEW" }});
        break;
      case "advSinoKNumBtn":
        _logger({ state:{ type: "A_SINO_VIEW" }});
        break;
      case "advNativeKNumBtn":
        _logger({ state:{ type: "A_NATIVE_VIEW" }});
        break;
      case "kFruitsBtn":
        _logger({ state:{ type: "K_FRUITS_VIEW" }});
        break;
      case "kColorsBtn":
        _logger({ state:{ type: "K_COLORS_VIEW" }});
        break;
      default:
        _logger(e.target);
        break;
    };
  };

  return (
    <Fragment>
      <Card className="kr-academyhall-card">
        <Card.Body className="kr-academyhall-card-body d-flex p-0">
          <Col className="kr-academyhall-card__col-left"/>
          <Col className="kr-academyhall-card__col-options d-flex">
            <Col className="kr-academyhall-card__col-options__col-left w-40 h-100">
              <Row className="h-30 w-100 mt-2 mx-0 px-0"/>
              <Row className="kr-academyhall-card__col-options__cl-row-a d-block ms-0 me-2 text-end">
                <Button 
                  className="rounded-0 text-end h6 text-black ps-6 pe-2" 
                  id="krAcademyHallBtnAL"
                  name="kFruitsBtn"
                  onClick={onClickSubject}>
                    {"Fruits"}
                </Button>
              </Row>
              <br />
              <Row className="kr-academyhall-card__col-options__cl-row-b d-block ms-0 me-3 mt-2 text-end">
                <Button 
                  className="rounded-0 text-end h4 text-black ps-9 pe-2" 
                  id="krAcademyHallBtnBL"
                  name="advSinoKNumBtn"
                  onClick={onClickSubject}>
                    {"Sino-K Numbers (1-100)"}
                </Button>
              </Row>
              <br /><br /><br />
              <Row className="kr-academyhall-card__col-options__cl-row-c d-block ms-0 me-4 mt-2 text-end">
                <Button 
                  className="rounded-0 text-end h2 text-black ps-12 pe-3" 
                  id="krAcademyHallBtnCL"
                  name="basicSinoKNumBtn"
                  onClick={onClickSubject}>
                    {"Sino-Korean Numbers (1-10)"}
                </Button>
              </Row>
            </Col>
            <Col className="kr-academyhall-card__col-options__col-right w-60 h-100">
              <Row className="h-30 w-100 mt-2 ms-0 me-1 px-0   krtest"/>
              <Row className="kr-academyhall-card__col-options__cr-row-a d-block ms-2 me-0 text-start">
                <Button 
                  className="rounded-0 text-start h6 text-black pe-6 ps-2" 
                  id="krAcademyHallBtnAR"
                  name="kColorsBtn"
                  onClick={onClickSubject}>
                    {"Colors"}
                </Button>
              </Row>
              <br />
              <Row className="kr-academyhall-card__col-options__cr-row-b d-block ms-3 me-0 mt-2 text-start">
                <Button 
                  className="rounded-0 text-start h4 text-black pe-6 ps-2" 
                  id="krAcademyHallBtnBR"
                  name="advNativeKNumBtn"
                  onClick={onClickSubject}>
                    {"Native K Numbers (1-99)"}
                </Button>
              </Row>
              <br /><br /><br />
              <Row className="kr-academyhall-card__col-options__cr-row-c d-block ms-4 me-0 mt-2 text-start">
                <Button 
                  className="rounded-0 text-start h2 text-black pe-12 ps-3" 
                  id="krAcademyHallBtnCR"
                  name="basicNativeKNumBtn"
                  onClick={onClickSubject}>
                    {"Native Korean Numbers (1-10)"}
                </Button>
              </Row>
            </Col>
          </Col>
          <Col className="kr-academyhall-card__col-right"/>
        </Card.Body>
      </Card>
    </Fragment>
  )
};

export default KArcadeAcademyHall;

import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Col, Row, Button } from "react-bootstrap";

const KArcadeCity = () => {

  const navigate = useNavigate();

  const onClickSign = (e) => {
    const navMain = "/zones/10/k-arcade/main";
    const id = e.target.id;

    switch (id) {
      case "krCityAcademyBtn":
        navigate(navMain, { state: { type: "ACADEMYHALL_VIEW" }});
        break;
      default:
        break;
    }
  };

  return (
    <Fragment>
      <Card className="kr-city-card w-100 h-100">
        <Card.Body className="kr-city-card__body p-0">
          <Col className="kr-city-card__body-col w-100 h-100">
            <Row className="kr-city-card__body-row d-flex h-100 p-0 m-0">
              <Col className="kr-city-card__body-row__col-1 d-flex h-100">
                <Row className="kr-city-card__body-arcade-row my-auto ps-7 pe-8 pb-11 pt-7">
                  <Button
                    className="kr-city-card__body-button--arcade"
                    id="krCityArcadeBtn"
                    onClick={onClickSign}
                  />
                </Row>
              </Col>
              <Col className="kr-city-card__body-row__col-2 d-flex h-100">
                <Row className="kr-city-card__body-library-row mt-auto ps-6 pe-7 pb-22 pt-4 mb-1">
                  <Button
                    className="kr-city-card__body-button--library"
                    id="krCityLibraryBtn"
                    onClick={onClickSign}
                  />
                </Row>
              </Col>
              <Col className="kr-city-card__body-row__col-3 h-100">
                
              </Col>
              <Col className="kr-city-card__body-row__col-4 d-flex h-100">
                <Row className="kr-city-card__body-acadoke-row mb-7 ps-1 pe-0 pb-21 pt-0">
                  <Button
                    className="kr-city-card__body-button--academy"
                    id="krCityAcademyBtn"
                    onClick={onClickSign}
                  />
                  <Button
                    className="kr-city-card__body-button--karaoke"
                    id="krCityKaraokeBtn"
                    onClick={onClickSign}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
        </Card.Body>
      </Card>
    </Fragment>
  )
}

export default KArcadeCity;
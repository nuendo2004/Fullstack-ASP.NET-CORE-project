import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import KArcadeMemoryGame from "./KArcadeMemoryGame";
import toastr from "toastr";

const KArcadeGameZone = () => {

  const { state } = useLocation();
  const [ game, setGame ] = useState();

  useEffect(() => {
    switch (state?.type) {
      case "BASIC_SINO_MEMORY":
        setGame(() => {
          return <KArcadeMemoryGame state={{ type: "BASIC_SINO_MEMORY" }}/>
        });
        break;
      case "NATIVE_GAME_ZONE":
        setGame(() => {
          return <KArcadeMemoryGame state={{ type: "BASIC_NATIVE_MEMORY" }}/>
        })
        break;
      default:
        toastr.info(state);
        break;
    }
  }, [state]);

  return (
    <>
      <Card className="kr-gamezone-card w-100 h-100 p-0 m-0">
        <Row className="kr-gamezone-card__row-filler"/>
        <Row className="kr-gamezone-card__row-top m-0 p-0">
          <Col id="gameZoneFillColTop" className="p-0 m-0"/>
          <Col className="kr-gamezone-card__row-top__col-main m-0 pt-3 ps-8 pe-9 pb-4">
            <Row className="kr-gamezone-card__row-top__col-main-row" id="gameZoneContent">
              {game}
            </Row>
          </Col>
          <Col id="gameZoneFillColTop2" className="p-0 m-0"/>
        </Row>
        <Row className="kr-gamezone-card__row-bottom m-0 p-0"></Row>
      </Card>
    </>
  )
}

export default KArcadeGameZone;
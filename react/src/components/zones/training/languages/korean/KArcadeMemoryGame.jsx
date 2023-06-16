import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card, Col, Image } from "react-bootstrap";
import toastr from "toastr";
import krNumbersService from "../../../../../services/trainingZones/krAcademyService";

function KArcadeMemoryGame() {
  const { state } = useLocation();
  const [ krData, setKrData ] = useState({ arrayOfKrData: [], enComponents: [], krComponents: [], shuffledComponents: []});

    const mapEN = (num) => {
      return (
        <Card 
          key={`${num.id}_EN`} 
          className="kr-basic-memory-card p-0 mx-5 my-1 text-center justify-content-center" 
          state={{type: `${num.pronunciation}`}}
          >
          <Card.Body className="kr-basic-memory-card-body p-0">
            <Col className="kr-basic-memory--front p-0">
              <Image
                id={`${num.id}_EN`}
                className="kr-basic-memory-image p-0"
                src="https://sabio-training.s3-us-west-2.amazonaws.com/immersedb283b377-64b6-4e5b-8182-74399575ba79/KArcadeGameZoneCardBack.jpg"
                alt=""
              />
            </Col>
            <Col className="kr-basic-memory--back px-0 pb-1 pt-2 text-black">
              {num.number}
            </Col>
          </Card.Body>
        </Card>
      );
    };

    const mapKR = (num) => {
      return (
        <Card 
          key={`${num.id}_KR`} 
          className="kr-basic-memory-card p-0 mx-5 my-1 text-center justify-content-center" 
          state={{type: `${num.pronunciation}`}}
          >
          <Card.Body className="kr-basic-memory-card-body p-0">
            <Col className="kr-basic-memory--front p-0">
              <Image
                id={`${num.id}_KR`}
                className="kr-basic-memory-image p-0"
                src="https://sabio-training.s3-us-west-2.amazonaws.com/immersedb283b377-64b6-4e5b-8182-74399575ba79/KArcadeGameZoneCardBack.jpg"
                alt=""
              />
            </Col>
            <Col className="kr-basic-memory--back px-0 pt-2 pb-1 text-black">
              {num.korean}
            </Col>
          </Card.Body>
        </Card>
      );
    };

    useEffect(() => {
      switch (state?.type) {
        case "BASIC_SINO_MEMORY":
          krNumbersService
            .getSinoNumbers()
            .then(onGetSinoSuccess)
            .catch(onGetSinoError);
          break;
        case "BASIC_NATIVE_MEMORY":
          krNumbersService
            .getNativeNumbers()
            .then(onGetNativeSuccess)
            .catch(onGetNativeError);
            break;
        default:
          toastr.info(state);
          break;
      }
    }, [state]);

    const onGetSinoSuccess = (response) => {
      const sinoArr = response.items;

      setKrData((prevState) => {
        const kD = {...prevState};
        kD.arrayOfKrData = sinoArr;
        kD.enComponents = sinoArr.map(mapEN);
        kD.krComponents = sinoArr.map(mapKR);
        kD.shuffledComponents = [...kD.enComponents, ...kD.krComponents].sort(() => Math.random() - 0.5);
        return kD;
      });
    };

    const onGetNativeSuccess = (response) => {
      const nativeArr = response.items;

      setKrData((prevState) => {
        const kD = {...prevState};
        kD.arrayOfKrData = nativeArr;
        kD.enComponents = nativeArr.map(mapEN);
        kD.krComponents = nativeArr.map(mapKR);
        kD.shuffledComponents = [...kD.enComponents, ...kD.krComponents].sort(() => Math.random() - 0.5);
        return kD;
      });
    };

    const onGetSinoError = (error) => {
      toastr.error("Failed to Load", error);
    };

    const onGetNativeError = (error) => {
      toastr.error("Failed to Load", error);
    };

    return (
      <>
        {krData.shuffledComponents}
      </>
    );
};

export default KArcadeMemoryGame;
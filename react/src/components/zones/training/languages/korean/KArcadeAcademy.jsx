import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Row, Col, Image, Button } from "react-bootstrap";
import debug from "sabio-debug";
import Slider from "react-slick";
import krNumbersService from "../../../../../services/trainingZones/krAcademyService";
import toastr from "toastr";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";

const _logger = debug.extend("KArcadeAcademy");

const KArcadeAcademy = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const [ krHeader, setKrHeader] = useState("");
  const [ krData, setKrData ] = useState({ arrayOfKrData: [], krDataComponents: []});
  const [ companion, setCompanion ] = useState();
  const [ taskMarginTop, setTaskMarginTop ] = useState("");
  const [ krAudioOpt, setKrAudioOpt ] = useState(true);
  const [ gameType, setGameType ] = useState("");

  const [ mag ] = useState({ 
    open: "https://sabio-training.s3-us-west-2.amazonaws.com/immersed3e4dc898-07d5-41b0-b59c-13170b0f907e/MagO.png", 
    closed: "https://sabio-training.s3-us-west-2.amazonaws.com/immersedeb0f0809-bf68-4287-b15b-a23cc78e35f8/MagC.png" 
  });

  const [ tig ] = useState({ 
    open: "https://sabio-training.s3-us-west-2.amazonaws.com/immersedaf13a4de-104f-4a26-8e7b-a2d275ec32c0/TigO.png", 
    closed: "https://sabio-training.s3-us-west-2.amazonaws.com/immersedd8e92dd1-688c-4ec6-a3b6-29591f235bb5/TigC.png" 
  });

  const settings = {
    infinite: true,
    initialSlide: 0,
    dots: false,
    swipe: true,
    arrows: true,
    vertical: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    focusOnSelect: true,
    centerMode: false,
    touchMove: true,
    prevArrow: <FaArrowLeft/>,
    nextArrow: <FaArrowRight/>,
    className: "krNumber-slider"
  };

  useEffect(() => {
    _logger("KArcadeAcademy -> get numbers");

    switch (state?.type) {
      case "B_SINO_VIEW":
        krNumbersService
        .getSinoNumbers()
        .then(onGetSinoSuccess)
        .catch(onGetSinoError);
        setCompanion(tig.closed);
        setTaskMarginTop("mt-14");
        setGameType("BASIC_SINO_MEMORY");
        break;
      case "B_NATIVE_VIEW":
        krNumbersService
        .getNativeNumbers()
        .then(onGetNativeSuccess)
        .catch(onGetNativeError);
        setCompanion(mag.closed);
        setTaskMarginTop("mt-4");
        setGameType("BASIC_NATIVE_MEMORY");
        break;
      default:
        _logger(undefined);
        break;
    }
  }, [state]);

  const mapNative = (num) => {
    const kAudio = new Audio(krAudioOpt === true ? num.urlB : num.urlG);
    _logger("mapNative", kAudio, setKrAudioOpt);
    
    return (
      <Card className="krNative-slide-card" key={num.id}>
        <Card.Body className="krNative-slide-body d-flex py-0">
          <Col className="krNative-slide-body__col-knum text-center">{num.korean}</Col>
          <Col className="krNative-slide-body__col-enum text-center">{num.number}</Col>
       </Card.Body>
        <Card.Footer className="krNative-slide-footer py-0 text-center">
          <Col>{`Pronunciation: " ${num.pronunciation} "`}</Col>
          <Col>
            <AiFillSound
              className="kr-slide-audio-icon"
              type="button" 
              viewBox="50 50 900 900"
              onClick={() => kAudio?.play()}
            />
          </Col>
       </Card.Footer>
      </Card>
    )
  };

  const mapSino = (num) => {
    const kAudio = new Audio(krAudioOpt === true ? num.urlB : num.urlG);
    _logger("mapNative", kAudio);

    return (
      <Card className="krSino-slide-card" key={num.id}>
        <Card.Body className="krSino-slide-body d-flex py-0">
          <Col className="krSino-slide-body__col-knum text-center">{num.korean}</Col>
          <Col className="krSino-slide-body__col-enum text-center">{num.number}</Col>
       </Card.Body>
        <Card.Footer className="krSino-slide-footer py-0 text-center">
          <Col>{`Pronunciation: " ${num.pronunciation} "`}</Col>
          <Col>
            <AiFillSound
              className="kr-slide-audio-icon"
              type="button" 
              viewBox="50 50 900 900"
              onClick={() => kAudio?.play()}
            />
          </Col>
       </Card.Footer>
      </Card>
    )
  };

  const onGetSinoSuccess = (response) => {
    _logger("onSinoSuccess", response);
    const sinoArr = response.items;

    setKrData((prevState) => {
      const newData = {...prevState};
      newData.arrayOfKrData = sinoArr;
      newData.krDataComponents = sinoArr.reverse().map(mapSino);
      return newData;
    });
    setKrHeader("Sino-Korean Numbers (1-10)");
  };

  const onGetNativeSuccess = (response) => {
    _logger("onNativeSuccess", response);
    const nativeArr = response.items;

    setKrData((prevState) => {
      const newData = {...prevState};
      newData.arrayOfKrData = nativeArr;
      newData.krDataComponents = nativeArr.reverse().map(mapNative);
      return newData;
    });
    setKrHeader("Native Korean Numbers (1-10)");
  };

  const onGetSinoError = (error) => {
    toastr.error("Failed to retrieve KR Sino Numbers", error);
  };

  const onGetNativeError = (error) => {
    toastr.error("Failed to retrieve KR Native Numbers", error);
  };

  const onClickPlay = () => {
    navigate("/zones/10/k-arcade/main", { state: { type: `${gameType}` } });
  };

  const onHovOverCompanion = () => {
    switch (companion) {
      case tig.closed:
        setCompanion(tig.open);
        break;
      case mag.closed:
        setCompanion(mag.open);
        break;
      default:
        _logger(null);
        break;
    };
  };

  const onHovOutCompanion = () => {
    switch (companion) {
      case tig.open:
        setCompanion(tig.closed);
        break;
      case mag.open:
        setCompanion(mag.closed);
        break;
      default:
        _logger(null);
        break;
    };
  };

  return (
    <Card className="kr-academy-card">
      <Card.Body className="kr-academy-card__body p-0">
        <Col className="kr-academy-card__body-col">
          <Row className="kr-academy-card__body-row d-flex justify-content-center p-0 m-0">
            <Col />
            <Col className="kr-academy-card__body-row__col mt-8 p-3 ms-2 text-white">
              <Row className="kr-academy-card__body-row__col-header p-0 m-0 justify-content-center">
                {`Lesson 1: ${krHeader}`}
              </Row>
              <Row className="kr-academy-card__body-row__col-body p-0 mx-0 my-2 justify-content-center">
                <Slider {...settings}>
                  {krData.krDataComponents}
                </Slider>
              </Row>
            </Col>
            <Col className="kr-academy-card__body-row__col--bottom text-center mt-1" onMouseLeave={onHovOutCompanion}>
              <Row className="kr-academy-card__body-row__col--bottom-row ps-4 pe-8 pt-20">
                <Card 
                  className={`kr-academy-card--task-card ${taskMarginTop} text-center ${(companion === tig.closed || companion === mag.closed) ? "d-none" : null}`}
                  id="academyTaskCard"
                  >
                  <Card.Header className="kr-academy-card--task-card-header pt-1 pb-0 px-2 m-0 text-white h4">
                      Test your Skills!
                    </Card.Header>
                    <Card.Body className="kr-academy-card--task-card-body pt-1 px-0 pb-0 m-0">
                      <Button 
                        className="px-0 py-2 mb-2 btn-warning w-100"
                        onClick={onClickPlay}
                        >
                        Lets Go!
                      </Button>
                    </Card.Body>
                </Card>
                <Image 
                  src={companion}
                  alt="companion"
                  id="academyCompanion"
                  onMouseEnter={onHovOverCompanion}
                />
              </Row>
            </Col>
          </Row>
        </Col>
      </Card.Body>
    </Card>
  )
}

export default KArcadeAcademy;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Row, Col, Card, OverlayTrigger, Popover, Button, Image } from "react-bootstrap";
import pseudoAdsService from "../../services/pseudoAdsService";
import Slider from "react-slick";
import { FaPencilAlt, FaTrash, FaCog, FaPlus } from "react-icons/fa";
import toastr from "toastr";
import swal from "sweetalert2";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import "./pseudo.css";

const _logger = debug.extend("PseudoAdsView");

const PseudoAdsView = (props) => {
  const user = props.currentUser;
  const navigate = useNavigate();

  const [ fakeAds, setFakeAds ] = useState({ arrayOfFakeAds: [], fakeAdsSlides: [], fakeAdsThumbs: []});
  const [ index, setIndex ] = useState(0);
  const [ deleteEvent, setDeleteEvent ] = useState(true);
  const [ nav, setNav ] = useState();

  const handleSelect = (selectedIndex, e) => {
    const newSlide = fakeAds.arrayOfFakeAds[selectedIndex];
    _logger("selectedIndex: ", selectedIndex, newSlide, e);
    setIndex(selectedIndex);
  };

  const settings = {
    asNavFor: nav, 
    ref: (thumb) => setNav(thumb),
    infinite: true,
    dots: false,
    swipe: true,
    arrows: false,
    draggable: true,
    vertical: true,
    afterChange: (index) => handleSelect(index),
    slidesToShow: 7,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: false,
    focusOnSelect: true,
    centerMode: true,
    touchMove: true,
    className: "render-adThumb-slider px-4 py-2 mb-4"
  };
  
  const mapSlideAd = (fakeAd) => {
    return(
      <Carousel.Item className="fakeAd-slide mx-auto mb-2 mt-14" key={fakeAd.id}>
        <Card className="fakeAd-slide-card p-4 my-auto mx-auto">
          <Card.Img
            className="fakeAd-slide-image pt-4 px-4"
            src={fakeAd.adMainImageUrl}
            alt={fakeAd.actionId}
            onClick={adImageAction}
          />
          <Image
            className="fakeAd-slide-image-bg"
            src={fakeAd.adMainImageUrl}
            alt={fakeAd.actionId}
          />
          <Card.Body className="fakeAd-caption p-0 d-flex">
            <Col as="h1" className="fakeAd-title mb-0 px-4 pt-2 text-white">
              {fakeAd.title}
            </Col>
            <Col as="span" className="fakeAd-details px-4 text-white">
              {fakeAd.details.replace(/<[^>]*>?/gi, "").replace(/(&nbsp;|<br>|<br \/>)/g, "").replace("amp;", "")}
            </Col>
          </Card.Body>
        </Card>
      </Carousel.Item>
    );
  };

  const mapThumbAd = (fakeAd) => {
    return (
      <Carousel.Item className="fakeAd-thumb" key={fakeAd.id}>
        <Card className="fakeAd-thumbCard my-4 mx-2">
          <Card.Img 
            className="fakeAd-thumbCard-img img-thumbnail"
            src={fakeAd.adMainImageUrl}
            alt={fakeAd.actionId}
          />
        </Card>
      </Carousel.Item>
    );
  };

  useEffect(() => {
    pseudoAdsService
      .getAll(0, 500)
      .then(onGetAllAdsSuccess)
      .catch(onGetAllAdsError);
  }, [deleteEvent]);

  const onGetAllAdsSuccess = (response) => {
    const adArr = response.item.pagedItems;

    setFakeAds((prevState) => {
      const newAdArr = {...prevState};

      newAdArr.arrayOfFakeAds = adArr;
      newAdArr.fakeAdsSlides = adArr.map(mapSlideAd);
      newAdArr.fakeAdsThumbs = adArr.map(mapThumbAd);

      return newAdArr;
    });
  };

  const onGetAllAdsError = (error) => {
    toastr.error("Retrieve Ads Failed", error);
  };

  const handleEditAd = () => {
    const id = fakeAds.arrayOfFakeAds[index].id;
    
    pseudoAdsService
      .getById(id)
      .then(onGetAdByIdSuccess)
      .catch(onGetAdByIdError);
  };

  const onGetAdByIdSuccess = (response) => {
    const adId = response.item.id;

    navigate(`/pseudoads/${adId}`, { state:{type: "AD_EDIT", payload: {...response.item}} });
  };

  const onGetAdByIdError = (error) => {
    toastr.error("Retrieve Ad by Id Failed", error);
  };

  const handleDeleteAd = (e) => {
    e.preventDefault();
    const id = fakeAds.arrayOfFakeAds[index].id;
    
    pseudoAdsService
      .deleteAd(id)
      .then(onDeleteAdSuccess)
      .catch(onDeleteAdError);
  };

  const onDeleteAdSuccess = () => {
    setTimeout(() => {
      _logger("Setting Re-Render Dependency ->", deleteEvent);
      setDeleteEvent((prevState) => !prevState);
    }, 500);
    toastr.success("Ad Delete Success");
  };

  const onDeleteAdError = (error) => {
    toastr.error("Ad Delete Failed", error);
  };

  const adImageAction = () => {
    swal.fire({
      text: "Do Something",
      showCancelButton: true
    })
  };

  const onClickDeleteAd = (e) => {
    swal.fire({
      text: "This action can not be undone. Do you wish to continue?",
      icon: "warning",
      iconColor: "red",
      position: "center center",
      reverseButtons: true,
      focusCancel: true,
      showCancelButton: true,
      confirmButtonColor: "red",
      confirmButtonText: "Delete"
    })
    .then(result=>{
      if (result.isConfirmed){
        handleDeleteAd(e)
      }
    });
  };

  const onClickCreateAd = () => {
    navigate("/pseudoads/new");
  };

  const showOptions = (props) => (  
    <Popover 
      id="popover-options" 
      className="adOption-popover m-0 p-0"
      {...props}
    >
      <Popover.Body className="adOption-popover-body py-1 px-0 mx-0 d-flex">
        <Row className="ad-option-row p-0 my-auto">
          <Button 
            className="adEdit-btn btn-success p-2 mx-4 d-flex"
            onClick={handleEditAd}> 
            <FaPencilAlt 
              className="me-1 my-auto adEdit-icon"
              viewBox="-50 0 650 650"
            />
              <span className="adEditBtn-text">Edit</span>
          </Button>
          <Button 
            className="adDelete-btn btn-danger p-2 mx-4 d-flex"  
            onClick={onClickDeleteAd}>
            <FaTrash 
              className="me-1 my-auto adDelete-icon px-0"
              viewBox="-100 0 600 600"
            />
              <span className="adDeleteBtn-text">Delete</span>
          </Button>
          <Button 
            className="adCreate-btn btn-warning p-2 mx-4 d-flex"  
            onClick={onClickCreateAd}>
            <FaPlus 
              className="me-1 my-auto adDelete-icon px-0"
              viewBox="-150 0 600 600"
            />
              <span className="adCreateBtn-text">Create</span>
          </Button>
        </Row>
      </Popover.Body>
    </Popover>
  );

  return (
    <React.Fragment>
        <Row as="div" className="px-4 mx-0 d-flex render-adHeader">
          <Col xl={2} lg={2} md={4} sm={4} className="adHeader-col text-center ps-4 pe-0">
            <h1 className="mb-0 text-white">
              Ads Viewer
            </h1>
          </Col>
          <Col 
            className={`adHeader-icon-col ps-4 d-flex pt-2 pb-2 text-center ${user.id !== 90 ? "d-none" : null}`}
            id="adSettings"
            >
            <OverlayTrigger
              trigger="click"
              placement="right"
              rootClose={true}
              rootCloseEvent="click"
              overlay={showOptions}
              >
                <Row as="div">
                  <FaCog 
                    viewBox="55 -15 400 550"
                    className="adSettings-icon"/>
                </Row>
            </OverlayTrigger> 
          </Col>
        </Row>
        <Row className="mx-0">
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            controls={false}
            indicators={false}
            interval={null}
            breakpoints={['xxl', 'xl', 'lg', 'md', 'sm']}
            className="d-block p-4 pt-0 mt-2 render-adThumb"
            bsPrefix="carousel-inner adThumb"
          >
            <Slider {...settings}>
              {fakeAds.fakeAdsThumbs}
            </Slider>
          </Carousel>
          <Col className="render-ad-col mt-3">
            <Carousel 
              activeIndex={index}
              onSelect={handleSelect}
              indicators={false}
              slide={false}
              fade={true}
              variant='dark'
              controls={true}
              interval={null}
              breakpoints={['xxl', 'xl', 'lg', 'md', 'sm']}
              className="p-2 pt-0 mx-0 my-2 render-adSlide"
              bsPrefix="carousel-inner adSlide"
            >
              {fakeAds.fakeAdsSlides}
            </Carousel>
          </Col>
          <Col as="div" />
        </Row>
    </React.Fragment>
  );
};

PseudoAdsView.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired
  }),
};

export default PseudoAdsView;
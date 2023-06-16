import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import storyService from "services/storiesService";
import debug from "sabio-debug";
import { Image, Col, Row } from "react-bootstrap";
import ReactPlayer from "react-player";
import Video from "assets/images/placeholder/immersed-test-2.mp4";
import image from "assets/images/background/immersedvertical.jpg";
import swal from "sweetalert";

const _logger = debug.extend("SingleStory");

const SingleStory = (props) => {
  const { storyId } = useParams();
  const [story, setStoryData] = useState({
    id: 0,
    title: "",
    email: "",
    story: "",
    isApproved: true,
    approvedBy: 1,
    files: [],
    createdByFirstName: "",
    createdByLastName: "",
    dateCreated: "",
    dateModified: "",
  });

  const [file, setFileData] = useState([
    {
      fileType: 0,
      url: "placeholder",
    },
    {
      fileType: 0,
      url: "placeholder",
    },
  ]);

  useEffect(() => {
    _logger(props);

    storyService
      .getStoryById(storyId)
      .then(onGetByIdSuccess)
      .catch(onGetByIdError);
  }, []);

  const onGetByIdSuccess = (response) => {
    const incomingStory = response.item;
    const incomingFile = response.item.files;

    _logger(response);

    setStoryData((prevState) => {
      let st = { ...prevState };
      _logger(st);
      st = incomingStory;
      return st;
    });
    setFileData((prevState) => {
      let fd = { ...prevState };
      _logger(file);
      fd = incomingFile;
      return fd;
    });
  };

  const onGetByIdError = (response) => {
    swal("Unable to get Story", response);
  };
  const checkFiles = (files) => {
    if (files.files === null) {
      return image;
    } else {
      return file[0].url;
    }
  };

  return (
    <React.Fragment>
      <div className="d-flex  story-justify-content-between align-items-center mb-1">
        <div className="d-flex align-items-center">
          <div className="ms-2 lh-1 text-center"> </div>
        </div>
        <div className="justify-content-between"></div>
      </div>

      <Row className="justify-content-center story-image">
        <Col xl={8} lg={8} md={12} sm={12} className="mb-7 mt-4">
          <h1 className="display-3 fw-bold mb-4 story-title-align-items-center">
            {story.title}
          </h1>
          <div className=" single-story-frame">
            <Image
              src={checkFiles(story)}
              alt=""
              className="story-center img-fluid rounded-3"
            />
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col xl={8} lg={8} md={12} sm={12} className="mb-2">
          <div className="frame single-story">
            {story.story}
            <div className="story-text-right text-muted">
              <span className=" mb-3 d-inline-block text-right">
                Created By: {story.createdByFirstName} {story.createdByLastName}
              </span>
              <span className="ms-2 text-muted text-right">
                {story.dateCreated.toString().substring(0, 10)}
              </span>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col
          style={{ paddingLeft: "18%" }}
          xl={10}
          lg={10}
          md={12}
          sm={12}
          className=" mt-6 mb-6 text-center"
        >
          <ReactPlayer
            className="story-player"
            controls={true}
            url={Video}
            sandbox="allow-presentation"
          ></ReactPlayer>
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default SingleStory;

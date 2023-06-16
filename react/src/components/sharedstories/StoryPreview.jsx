import React from "react";
import debug from "sabio-debug";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import "./storypreview.css";
import ReactPlayer from "react-player";

const _logger = debug.extend("StoryPreview");

const StoryPreview = (props) => {
  _logger(props);

  const { title, email, story, fileUrl } = props.data;

  return (
    <div>
      <Card className="preview-shadow">
        <Card.Header>
          <h1 className="text-center mb-1 fw-bold story-prev-title">
            Preview Story
          </h1>
        </Card.Header>
        <Card.Title className="text-center pt-6 fw-bold ">
          <h2 className="title">
            <strong>{title}</strong>
          </h2>
        </Card.Title>
        <Card.Title className="text-center pt-4">
          <h3 className="email">{email}</h3>
        </Card.Title>
        <Card.Body className="story">
          <div dangerouslySetInnerHTML={{ __html: story }} />
        </Card.Body>
        <img
          className="preview-image img-thumbnail mx-auto d-block"
          alt=""
          src={fileUrl}
        />
        {fileUrl?.includes(".mp4") && (
          <ReactPlayer
            className="storyPreview-player mt-6 mb-6 text-center"
            controls="true"
            url={fileUrl}
            sandbox="allow-presentation"
          ></ReactPlayer>
        )}
      </Card>
    </div>
  );
};

StoryPreview.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    story: PropTypes.string.isRequired,
    fileUrl: PropTypes.string.isRequired,
  }),
};
export default StoryPreview;

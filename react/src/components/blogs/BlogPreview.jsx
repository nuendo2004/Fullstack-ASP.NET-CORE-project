import React from "react";
import debug from "sabio-debug";
import { Card } from "react-bootstrap";
import PropTypes from "prop-types";
import "../blogs/blogForm.css";

const _logger = debug.extend("BlogPreview");

const BlogPreview = (props) => {
  _logger(props);

  const { title, subject, content, blogType, imageUrl } = props.data;

  return (
    <div>
      <Card className="preview-shadow">
        <Card.Header>
          <h1 className="mb-1 fw-bold">Blog Preview</h1>
        </Card.Header>
        <Card.Title className="text-center pt-6 fw-bold ">
          <h2 className="title"><strong>{title}</strong></h2>
        </Card.Title>
        <Card.Title className="text-center pt-4">
          <h3 className="subject">{subject}</h3>
        </Card.Title>
        <Card.Title className="text-center pt-4">
          {blogType}
        </Card.Title>
        <Card.Body className="content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </Card.Body>
        <img
          className="preview-image img-thumbnail mx-auto d-block"
          alt=""
          src={imageUrl}
        />
      </Card>
    </div>
  );
};

BlogPreview.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    blogType: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }),
};
export default BlogPreview;

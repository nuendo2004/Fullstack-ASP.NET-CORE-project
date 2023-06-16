import React from "react";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import { Card, Col, Button } from "react-bootstrap";
import "./blogs.css";
import "./blogsbuttons.css";
import { useNavigate } from "react-router-dom";
import Ratings from "components/ratings/Ratings";
import { ENTITY_TYPES_IDS } from "components/ratings/constants";

const _logger = debug.extend("BlogCard");

function BlogCard(props) {
  _logger(props);
  const navigate = useNavigate();

  const aBlog = props.blog;

  const newDate = new Date(aBlog.dateCreated).toLocaleDateString();
  _logger("New date", newDate);

  const handleClick = (e) => {
    e.preventDefault();
    
    navigate(`/blogs/${aBlog.id}`, {
      state: { aBlog, type:"BLOG VIEW"},
    });
  };

  const handleEditClick = (e) => {
    e.preventDefault();
    navigate(`/blogs/edit/${aBlog.id}`, {
      state: { aBlog },
    });
  };

  return (
    <Col className="col-4">
      <Card className="mb-4 shadow-lg blog-card">
        <img className="card-img-top" src={aBlog.imageUrl} alt="" />
        <Card.Body className="blog-card">
          <Card.Title>
            <strong>{aBlog.title}</strong>
          </Card.Title>
          <Card.Text className="card-text">{newDate}</Card.Text>
          <div className="d-flex flex-column gap-2 align-items-center">
            <Button
              className="blogs-button"
              variant="primary"
              onClick={handleClick}
            >
              Read Me
            </Button>

            <Button
              className="blogs-button"
              variant="secondary"
              onClick={handleEditClick}
            >
              Edit Blog
            </Button>
          </div>
        </Card.Body>
        <Card.Footer>
          <Ratings
            currentUser={props.currentUser}
            entityTypeId={ENTITY_TYPES_IDS.Blogs}
            entityId={aBlog.id}
          ></Ratings>
        </Card.Footer>
      </Card>
    </Col>
  );
}

BlogCard.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default BlogCard;

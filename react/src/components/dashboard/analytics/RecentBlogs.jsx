import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, ListGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect } from "react";
import RecentBlog from "./RecentBlog";

const RecentBlogs = (props) => {
  
  const [blogInfo, setBlogInfo] = useState({
    arrayData: [],
    componentData: [],
  });

  useEffect(() => {
    setBlogInfo((prevState) => {
      let bi = { ...prevState };
      bi.componentData = props.blogData?.map(mapBlogData);
      return bi;
    });
  }, [props]);

  const mapBlogData = (blog, index) => {
    return <RecentBlog blog={blog} key={index} />;
  };

  return (
    <Card className="h-100">
      <Card.Header className="d-flex align-items-center justify-content-between card-header-height">
        <h4 className="mb-0">{props.title}</h4>
        <Link to="#" className="btn btn-outline-white btn-sm">
          View all
        </Link>
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">{blogInfo.componentData}</ListGroup>
      </Card.Body>
    </Card>
  );
};

RecentBlogs.propTypes = {
  blogData: PropTypes.arrayOf(
    PropTypes.shape({})
  ).isRequired,
  title: PropTypes.string.isRequired,
};

export default RecentBlogs;

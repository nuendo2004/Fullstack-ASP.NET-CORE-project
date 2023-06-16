import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, Col, Row, Dropdown, Image } from "react-bootstrap";
import PropTypes from "prop-types";

const RecentBlog = (props) => {
  const blog = props.blog;
  const index = props.index;
  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));
  const ActionMenu = () => {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <i className="fe fe-more-vertical text-muted"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Header>SETTINGS</Dropdown.Header>
            <Dropdown.Item eventKey="1">
              <i className="fe fe-edit dropdown-item-icon"></i> Edit
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <i className="fe fe-trash dropdown-item-icon"></i> Remove
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  const blogDateCreated = new Date(blog.dateCreated);

  blogDateCreated.setDate(blogDateCreated.getDate());

  const newblogDateCreated = blogDateCreated.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <ListGroup.Item className={`px-0 ${index === 0 ? "pt-0" : ""}`}>
      <Row>
        <Col className="col-auto">
          <Link to="#">
            <Image
              src={blog.imageUrl}
              alt=""
              className="img-fluid rounded img-4by3-lg"
              style={{ height: "78px" }}
            />
          </Link>
        </Col>
        <Col className="ps-0">
          <Link to="#">
            <h5 className="text-primary-hover">{blog.title}</h5>
          </Link>
          <div className="d-flex align-items-center">
            <Image
              src={blog.author.avatarUrl}
              alt=""
              className="rounded me-2"
              style={{ height: "35px" }}
            />
            <span className="fs-6">{`${blog.author.firstName} ${blog.author.mi}. ${blog.author.lastName}`}</span>
          </div>
          <div className="mt-1">
            <span className="fs-6">{newblogDateCreated}</span>
          </div>
        </Col>
        <Col className="col-auto">
          <ActionMenu />
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

RecentBlog.propTypes = {
  blog: PropTypes.shape({
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    dateCreated: PropTypes.string,
    author: PropTypes.shape({
      avatarUrl: PropTypes.string,
      firstName: PropTypes.string,
      mi: PropTypes.string,
      lastName: PropTypes.string,
    }),
  }),
  index: PropTypes.number,
  title: PropTypes.string,
  children: PropTypes.func,
  onClick: PropTypes.func,
};

export default React.memo(RecentBlog);

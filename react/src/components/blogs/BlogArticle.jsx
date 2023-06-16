import React, { Fragment } from "react";
import { Col, Row, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "layouts/marketing/footers/Footer";
import { formatDateTime } from "utils/dateFormater";
import PropTypes from "prop-types";
import Comments from "components/comments/Comments";

const BlogArticle = (props) => {
  const timePosted = (dateCreated) => {
    const utcDate = `${dateCreated}`;
    const date = formatDateTime(utcDate);
    return date;
  };

  return (
    <Fragment>
      <div className="py-4 py-lg-8 pb-14 bg-white">
        <Container>
          <Fragment>
            <Row className="justify-content-center">
              <Col xl={8} lg={8} md={12} sm={12} className="mb-2">
                <div className="text-center mb-4">
                  <Link
                    to="#"
                    className="fs-5 fw-semi-bold d-block mb-4 text-primary"
                  >
                    {props.blog?.subject}
                  </Link>
                  <h1 className="display-3 fw-bold mb-4">
                    {props.blog?.title}{" "}
                  </h1>
                  <span className="mb-3 d-inline-block">
                    Date Published: {timePosted(props.blog.datePublished)}
                  </span>
                </div>
              </Col>
            </Row>
            <div className="avatar-image">
              <Image
                src={props.blog.author.avatarUrl}
                alt=""
                className="rounded-circle avatar-md"
              />
            </div>
            <div className="mb-3 d-inline-block">
              {`${props.blog.author.firstName}
                   ${props.blog.author.mi}
                  ${props.blog.author.lastName}`}
            </div>
            <Row className="justify-content-center">
              {/* Image */}
              <Col xl={10} lg={10} md={12} sm={12} className="mb-6">
                <Image
                  src={props.blog.imageUrl}
                  alt=""
                  className="img-fluid rounded-3"
                />
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xl={8} lg={8} md={12} sm={12} className="mb-2">
                <div
                  dangerouslySetInnerHTML={{
                    __html: props.blog.content,
                  }}
                ></div>
                <div>
                  <span className="mb-3 d-inline-block">
                    Date Created: {timePosted(props.blog.dateCreated)}
                    <p>Date Modified: {timePosted(props.blog.dateModified)}</p>
                  </span>
                </div>
                <hr className="mt-8 mb-5" />
              </Col>
              <Comments
                blog={props.blog}
                currentUser={props.currentUser}
              ></Comments>
            </Row>
            <Footer />
          </Fragment>
        </Container>
      </div>
    </Fragment>
  );
};

export default BlogArticle;

BlogArticle.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired,
    datePublished: PropTypes.string.isRequired,
    author: PropTypes.shape({
      id: PropTypes.number,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      mi: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
    }),
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
  }),
};

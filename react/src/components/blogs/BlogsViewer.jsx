import React from "react";
import { Col, Row, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogsViewer = () => {
  return (
    <Container>
      <div className="py-lg-20 py-10 mt-n12 mb-3 bg-colors-gradient">
        <Row>
          <Col
            lg={{ span: 10, offset: 1 }}
            xl={{ span: 8, offset: 2 }}
            md={12}
            sm={12}
          >
            <div className="text-center mb-5">
              <h1 className="display-2 fw-bold">Blogs</h1>
              <p className="lead">
                Read about our features, journey, tips and us being us.
              </p>
            </div>

            <div className="flush-nav">
              <Nav>
                <Link to="/blogs" className="ps-0 nav-link active">
                  Cybersecurity
                </Link>
                <Link to="/subscription" className="nav-link">
                  Subscribe
                </Link>
                <Link to="/signin" className="nav-link">
                  Sign In
                </Link>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </Nav>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default BlogsViewer;

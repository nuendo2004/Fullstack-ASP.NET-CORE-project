import React, { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { Row, Col, Container, Nav, Navbar } from "react-bootstrap";
import PropTypes from "prop-types";
// import ProfileBackground from "assets/images/background/profile-bg.jpg";
import debug from "sabio-debug";
import "./usersettings.css";
import {
  dashboardMenu,
  accountSettingsMenu,
} from "../../routes/userDashboardMenu";

const _logger = debug.extend("InternalAnalytics");
const UserLayout = (props) => {
  const location = useLocation();

  const mapAccountSettings = (item, index) => (
    <Nav.Item
      as="li"
      key={index}
      className={`${item.link === location.pathname ? "active" : ""}`}
    >
      <Link className="nav-link" to={item.link}>
        <i className={`fe fe-${item.icon} nav-icon`}></i>
        {item.title}
      </Link>
    </Nav.Item>
  );

  const mapDashBoardMenu = (item, index) => (
    <Nav.Item
      as="li"
      key={index}
      className={`${item.link === location.pathname ? "active" : ""}`}
    >
      <Link className="nav-link" to={item.link}>
        <i className={`fe fe-${item.icon} nav-icon`}></i>
        {item.title}
      </Link>
    </Nav.Item>
  );

  _logger("User Layout: ", props);

  return (
    <Fragment>
      <div className="user-profile-layout">
        <Container>
          {/* User info */}
          <Row className="user-settings-row">
            <Col xl={12} lg={12} md={12} sm={12}>
              {/* <!-- Bg --> */}
              <div className="userLayoutBanner shadow-sm"></div>
              <div className="shadow-sm userLayoutBannerBottom"></div>
            </Col>
          </Row>

          {/* Content */}
          <Row className="profile-dash">
            <Col lg={3} md={4} sm={12}>
              <Navbar
                expand="lg"
                className="profile-dash-navbar navbar-expand-md navbar-light shadow-sm sidenav"
              >
                <Link
                  className="profile-dash-navbar-link d-xl-none d-lg-none d-md-none text-inherit"
                  to="#"
                >
                  Menu
                </Link>
                <Navbar.Toggle
                  aria-controls="basic-navbar-nav"
                  className="profile-dash-navbar-toggle focus-none border-0"
                  label="Responsive Menu"
                >
                  <span
                    className="profile-dash-navbar-toggle navbar-toggler d-md-none icon-shape icon-sm rounded bg-primary text-white"
                    data-bs-toggle="collapse"
                    data-bs-target="#sidenav"
                    aria-controls="sidenav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="fe fe-menu"></span>
                  </span>
                </Navbar.Toggle>

                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav
                    className="profile-dash-navbar-collapse flex-column"
                    as="ul"
                  >
                    <Nav.Item className="navbar-header" as="li">
                      Dashboard
                    </Nav.Item>
                    {dashboardMenu.map(mapDashBoardMenu)}
                    <Nav.Item
                      className="profile-dash-navbar-item  navbar-header"
                      as="li"
                    >
                      ACCOUNT SETTINGS
                    </Nav.Item>
                    {accountSettingsMenu.map(mapAccountSettings)}
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Col>
            <Col>{props.children}</Col>
          </Row>
        </Container>
      </div>
    </Fragment>
  );
};

UserLayout.propTypes = {
  children: PropTypes.element,
};

export default UserLayout;

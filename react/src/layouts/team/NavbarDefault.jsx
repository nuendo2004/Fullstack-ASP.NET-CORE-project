import NavbarDefaultRoutes from "routes/marketing/NavbarDefault";
import NotificationList from "data/Notification";
import NavDropdownMain from "layouts/marketing/navbars/NavDropdownMain";
import React, { Fragment, useState } from "react";
import { useMediaQuery } from "react-responsive";
import PropTypes from "prop-types";
import SimpleBar from "simplebar-react";
import DotBadge from "../../dashboard/navbars/utils/DotBadge";
import { Link } from "react-router-dom";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";
import {
  Row,
  Col,
  Image,
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Form,
  Dropdown,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

const NavbarDefault = ({ headerstyle, currentUser }) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const [expandedMenu, setExpandedMenu] = useState(false);

  const QuickMenu = () => {
    return (
      <Fragment>
        <Dropdown
          as={Nav.Item}
          className={`${isDesktop || isLaptop ? "mt-2 me-0" : "mt-2 me-2"}`}
        >
          <Dropdown.Toggle
            as={Nav.Link}
            bsPrefix="dt"
            className="text-dark icon-notifications me-lg-1  btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted"
            id="dropdownNotification"
          >
            <i className="fe fe-bell"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu
            show={isDesktop ? true : false}
            className="dashboard-dropdown notifications-dropdown dropdown-menu-lg dropdown-menu-end mt-4 py-0"
            aria-labelledby="dropdownNotification"
            align="end"
          >
            <div className="border-bottom px-3 pt-3 pb-3 d-flex justify-content-between align-items-end">
              <span className="h4 mb-0">Notifications</span>
              <Link to="# " className="text-muted">
                <span className="align-middle">
                  <i className="fe fe-settings me-1"></i>
                </span>
              </Link>
            </div>
            <SimpleBar style={{ maxHeight: "300px" }}>
              <ListGroup variant="flush">
                {NotificationList.map(function (item, index) {
                  return (
                    <ListGroup.Item
                      className={index === 0 ? "bg-light" : ""}
                      key={index}
                    >
                      <Row>
                        <Col>
                          <Link className="text-body" to="#">
                            <div className="d-flex">
                              <Image
                                src={item.image}
                                alt=""
                                className="avatar-md rounded-circle"
                              />
                              <div className="ms-3">
                                <h5 className="fw-bold mb-1">{item.sender}</h5>
                                <p className="mb-3">{item.message}</p>
                                <span className="fs-6 text-muted">
                                  <span>
                                    <span className="fe fe-thumbs-up text-success me-1"></span>
                                    {item.date}
                                  </span>
                                  <span className="ms-1">{item.time}</span>
                                </span>
                              </div>
                            </div>
                          </Link>
                        </Col>
                        <Col className="col-auto text-center me-2">
                          <OverlayTrigger
                            key="top"
                            placement="top"
                            overlay={
                              <Tooltip id="tooltip-top">Mark as unread</Tooltip>
                            }
                          >
                            <Link to="#">
                              <DotBadge bg="secondary"></DotBadge>
                            </Link>
                          </OverlayTrigger>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </SimpleBar>
            <div className="border-top px-3 pt-3 pb-3">
              <Link
                to="/authentication/notifications"
                className="text-link fw-semi-bold"
              >
                See all Notifications
              </Link>
            </div>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown as={Nav.Item}>
          <Dropdown.Toggle
            as={Nav.Link}
            bsPrefix="dt"
            className="rounded-circle border-bottom-0"
            id="dropdownUser"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image
                alt="avatar"
                src={currentUser?.avatarUrl}
                className="rounded-circle"
              />
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            show={isDesktop ? true : false}
            className="dashboard-dropdown dropdown-menu-end mt-4 py-0"
            aria-labelledby="dropdownUser"
            align="end"
          >
            <Dropdown.Item className="mt-3">
              <div className="d-flex">
                <div className="avatar avatar-md avatar-indicators avatar-online">
                  <Image
                    alt="avatar"
                    src={currentUser?.avatarUrl}
                    className="rounded-circle"
                  />
                </div>
                <div className="ms-3 lh-1">
                  <h5 className="mb-1">Annette Black</h5>
                  <p className="mb-0 text-muted">annette@geeksui.com</p>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item eventKey="2">
              <i className="fe fe-user me-2"></i> Profile
            </Dropdown.Item>
            <Dropdown.Item eventKey="3">
              <i className="fe fe-star me-2"></i> Subscription
            </Dropdown.Item>
            <Dropdown.Item>
              <i className="fe fe-settings me-2"></i> Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item className="mb-3">
              <i className="fe fe-power me-2"></i> Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );
  };
  return (
    <Fragment>
      <Navbar
        onToggle={(collapsed) => setExpandedMenu(collapsed)}
        expanded={expandedMenu}
        expand="lg"
        className={`${currentUser?.isLoggedIn ? "bg-white" : ""}  p-2 ${
          headerstyle === "dark" ? "navbar-dark bg-dark" : "navbar-default py-2"
        }`}
      >
        <Container fluid className="px-0 ps-2">
          <Navbar.Brand as={Link} to="/">
            <Image src={Logo} alt="" />
          </Navbar.Brand>
          {currentUser.isLoggedIn && (
            <div
              className={`navbar-nav navbar-right-wrap ms-auto d-lg-none nav-top-wrap ${
                isDesktop || isLaptop ? "d-none" : "d-flex"
              }`}
            >
              <QuickMenu />
            </div>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="icon-bar top-bar mt-0"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              {NavbarDefaultRoutes.map((item, index) => {
                if (item.children === undefined) {
                  return (
                    <Nav.Link key={index} as={Link} to={item.link}>
                      {item.menuitem}
                    </Nav.Link>
                  );
                } else {
                  return (
                    <NavDropdownMain
                      item={item}
                      key={index}
                      onClick={(value) => setExpandedMenu(value)}
                    />
                  );
                }
              })}
              <NavDropdown
                title="..."
                id="basic-nav-dropdown"
                bsPrefix="no-dropdown-arrow d-block nav-link fs-3 lh-1 pt-0"
              >
                <NavDropdown.Item
                  as={Link}
                  to="/dashboard/documentation"
                  className="py-2 px-3"
                >
                  <div className="d-flex align-items-center">
                    <i className="fe fe-file-text fs-3 text-primary"></i>
                    <div className="ms-3 lh-3">
                      <h5 className="mb-0">Documentations</h5>
                      <p className="mb-0 fs-6">Browse the all documentation</p>
                    </div>
                  </div>
                </NavDropdown.Item>
                <NavDropdown.Item
                  as={Link}
                  to="/dashboard/changelog"
                  className="py-2 px-3"
                >
                  <div className="d-flex align-items-center">
                    <i className="fe fe-layers fs-3 text-primary"></i>
                    <div className="ms-3 lh-3">
                      <h5 className="mb-0">
                        Changelog{" "}
                        <span className="text-primary ms-1">v1.4.0</span>
                      </h5>
                      <p className="mb-0 fs-6">See what&apos;s new</p>
                    </div>
                  </div>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {/* Search Form */}
            <Form className="mt-3 mt-lg-0 ms-lg-3 d-flex align-items-center">
              <span className="position-absolute ps-3 search-icon">
                <i className="fe fe-search"></i>
              </span>
              <Form.Control
                type="Search"
                id="formSearch"
                className="ps-6"
                placeholder="Search Courses"
              />
            </Form>
            {/* Right side quick / shortcut menu  */}

            <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
              {currentUser.isLoggedIn && (
                <span className="ms-auto mt-3 mt-lg-0">
                  <Nav.Link
                    as={Link}
                    to="#"
                    bsPrefix="btn"
                    className="btn btn-white shadow-sm me-2"
                  >
                    Sign In
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="#"
                    bsPrefix="btn"
                    className="btn btn-primary shadow-sm"
                  >
                    Sign Up
                  </Nav.Link>
                </span>
              )}
              {currentUser.isLoggedIn && (
                <span
                  className={`navbar-nav navbar-right-wrap ms-auto d-lg-none nav-top-wrap ${
                    isDesktop || isLaptop ? "d-flex" : "d-none"
                  }`}
                >
                  <QuickMenu />
                </span>
              )}
            </Nav>
            {/* end of right side quick / shortcut menu  */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

// Specifies the default values for props
NavbarDefault.defaultProps = {
  headerstyle: "navbar-default",
  currentUser: { isLoggedIn: false },
};

// Typechecking With PropTypes
NavbarDefault.propTypes = {
  headerstyle: PropTypes.string,
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string,
    isLoggedIn: PropTypes.bool,
  }),
};

export default NavbarDefault;

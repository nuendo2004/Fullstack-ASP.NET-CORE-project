import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import logger from "sabio-debug";
import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  Navbar,
  Nav,
  // NavDropdown,
  Container,
  // Form,
  Dropdown,
  ListGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import DotBadge from "../../dashboard/navbars/utils/DotBadge";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";
import NotificationList from "../../dashboard/navbars/utils/Notification";
import NavDropdownMain from "layouts/marketing/navbars/NavDropdownMain";
import userService from "services/userService";
import swal from "sweetalert2";
// import allRoutes from "../../../routes/securedRoutes";
// import allPublicRoutes from "../../../routes/publicRoutes";
// import { v4 as uuid } from "uuid";
import NavbarDefaultRoutes from "../navbars/NavbarDefaultRoutes";
import "../../../components/traceability/traceabilityeventcard.css";
import { CgArrowsExchangeAlt } from "react-icons/cg";
import "./publicnavbar.css";

const _logger = logger.extend("NavbarDefault");

const NavbarDefault = (props, headerstyle) => {
  const user = props.loggedInUser;
  const navigate = useNavigate();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isLaptop = useMediaQuery({
    query: "(min-width: 1024px)",
  });

  const onLoginClick = () => {
    navigate("/signin");
  };

  const onRegisterClick = () => {
    navigate("/signup");
  };

  const onLogoutClick = () => {
    userService.logoutUser().then(onLogoutUserSuccess).catch(onLogoutUserFail);
  };

  const onLogoutUserSuccess = (response) => {
    _logger("logoutUser Success", response);
    swal
      .fire({
        icon: "success",
        title: "Sign Out Successful!",
        confirmButtonText: "Close",
      })
      .then((result) => {
        if (result.isConfirmed) {
          navigate("/", { state: { type: "LOGOUT" } });
        }
      });
  };

  const onLogoutUserFail = (error) => {
    _logger("logoutUser error", error);
    swal.fire({
      title: "Logout Unsuccessful",
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const [expandedMenu, setExpandedMenu] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const display = () => setIsShown(true);
  const dontDisplay = () => setIsShown(false);

  const QuickMenu = () => {
    return (
      <Fragment>
        {user.roles.includes("Trainee") && (
          <Link
            as={Nav.Item}
            className={`${isDesktop || isLaptop ? "mt-2 me-0" : "mt-2 me-2"}`}
            to={`usertrainees/${user.id}`}
            id="traineeSwitch"
          >
            {/* show only if user has role of Trainee*/}
            <CgArrowsExchangeAlt
              className="text-dark me-sm-1 rounded-circle navbar-trainee-select btn btn-icon btn-sm text-muted"
              onMouseEnter={display}
              onMouseLeave={dontDisplay}
            />
            {isShown && (
              <h5 className="trainee-switch-button text-secondary">
                Switch Trainees
              </h5>
            )}
          </Link>
        )}
        <Dropdown
          as={Nav.Item}
          className={`${isDesktop || isLaptop ? "mt-2 me-0" : "mt-2 me-2"}`}
        >
          <Dropdown.Toggle
            as={Nav.Link}
            bsprefix="dt"
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
              <Link to="#" className="text-muted">
                <span className="align-middle">
                  <i className="fe fe-settings me-1"></i>
                </span>
              </Link>
            </div>
            <SimpleBar className="navbar-simplebar">
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
            bsprefix="dt"
            className="rounded-circle border-bottom-0"
            id="dropdownUser"
          >
            <div className="avatar avatar-md avatar-indicators avatar-online">
              <Image
                alt="avatar"
                src={user.avatarUrl}
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
                    src={user.avatarUrl}
                    className="rounded-circle"
                  />
                </div>
                <div className="ms-3 lh-1">
                  <h5 className="mb-1">
                    {user.firstName} {user.lastName}
                  </h5>
                  <p className="mb-0 text-muted">{user.email}</p>
                </div>
              </div>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item
              eventKey="2"
              href="/usersettings"
              className="text-active"
            >
              <i className="fe fe-star me-2"></i> Profile
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="3"
              href="/usersettings/subscription"
              className="text-active"
            >
              <i className="fe fe-star me-2"></i> Subscription
            </Dropdown.Item>
            <Dropdown.Item to="/usersettings" className="text-active">
              <i className="fe fe-star me-2"></i> Settings
            </Dropdown.Item>
            <Dropdown.Divider />
            <Link bsprefix="btn" className="btn" onClick={onLogoutClick}>
              Log Out
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Navbar
        sticky="top"
        onToggle={(collapsed) => setExpandedMenu(collapsed)}
        expanded={expandedMenu}
        expand="lg"
        className={`${user.isLoggedIn ? "bg-grey" : ""} navbar p-2    ${
          headerstyle === "dark" ? "navbar-dark bg-dark" : "navbar-default py-2"
        }
        `}
      >
        <Container fluid className="px-0 ps-2 ">
          <Navbar.Brand as={Link} to="/">
            <Image src={Logo} alt="" id="navLogo" />
          </Navbar.Brand>
          <div
            className={`navbar-nav navbar-right-wrap ms-auto d-lg-none nav-top-wrap ${
              user.isLoggedIn
                ? isDesktop || isLaptop
                  ? "d-none"
                  : "d-flex"
                : "d-none"
            }`}
          >
            <QuickMenu />
          </div>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="icon-bar top-bar mt-0"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <h2 className="text-primary">Immersed</h2>
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
            </Nav>
            {/* Right side quick / shortcut menu  */}

            <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex nav-top-wrap">
              <span
                className={`ms-auto mt-3 mt-lg-0  ${
                  user.isLoggedIn ? "d-none" : ""
                }`}
              >
                <Link
                  to="/signup"
                  bsprefix="btn"
                  className="btn btn-primary shadow-sm me-2"
                  onClick={onRegisterClick}
                >
                  Register
                </Link>
                <Link
                  to="/signin"
                  bsprefix="btn"
                  className="btn btn-white shadow-sm me-2"
                  onClick={onLoginClick}
                >
                  Log In
                </Link>
              </span>
              <span
                className={`${
                  user.isLoggedIn
                    ? isDesktop || isLaptop
                      ? "d-flex"
                      : "d-none"
                    : "d-none"
                }`}
              >
                <QuickMenu />
              </span>
            </Nav>
            {/* end of right side quick / shortcut menu  */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

NavbarDefault.defaultProps = {
  headerstyle: "navbar-default",
};

NavbarDefault.propTypes = {
  loggedInUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default NavbarDefault;

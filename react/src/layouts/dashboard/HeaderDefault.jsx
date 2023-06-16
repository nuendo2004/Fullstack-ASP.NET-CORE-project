import React, { Fragment, useState, useEffect } from "react";
import { Menu, Search } from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import {
  Nav,
  Navbar,
  InputGroup,
  Dropdown,
  DropdownButton,
  Form,
  ListGroup,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
  Image,
  Button,
} from "react-bootstrap";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import DotBadge from "layouts/dashboard/navbars/utils/DotBadge";
import NotificationList from "layouts/dashboard/navbars/utils/Notification";
import toastr from "toastr";
import PropTypes from "prop-types";
import GoogleAnalyticsPlugin from "components/googleAnalytics/GoogleAnalyticsPlugin";
import lookUpService from "services/lookUpService";
import userService from "services/userService";
import ReactGA from "react-ga";
import logger from "sabio-debug";

const _logger = logger.extend("HeaderDefault");

const HeaderDefault = (props) => {
  const user = props.currentUser;
  const navigate = useNavigate();

  const [orgDropdownData, setOrgDropdownData] = useState({
    currentOrg: {},
    orgsArray: [],
    orgsComponents: [],
  });

  const onSignOutClick = () => {
    GoogleAnalyticsPlugin(
      ReactGA.event({ category: "User", action: "Sign Out", label: "Sign out" })
    );
    userService
      .logoutUser()
      .then(onSignOutUserSuccess)
      .catch(onSignOutUserFail);
  };

  const onSignOutUserSuccess = (response) => {
    _logger("signOutUser success", response);
    toastr.success("Successfully Signed Out!");
    let stateForTransport = { type: "LOGOUT" };
    navigate("/signin", { state: stateForTransport });
  };
  const onSignOutUserFail = (error) => {
    _logger("signOutUser fail", error);
    toastr.error("Unable to sign out");
  };

  const getAllOrgs = () => {
    lookUpService
      .LookUp(["OrganizationsLookup"])
      .then(renderDropdowns)
      .catch((error) => _logger("Organizations not found", error));
  };

  useEffect(() => {
    getAllOrgs();
  }, [user]);

  const renderDropdowns = (response) => {
    _logger("lookup response:", response);
    const allOrgsArr = response.item.organizationsLookup;
    const currentOrgs = allOrgsArr.filter((org) => {
      let result = false;
      for (let i = 0; i < user.organizations.length; i++) {
        if (org.id === user.organizations[i]) {
          result = true;
        }
      }
      return result;
    });
    const i = currentOrgs.findIndex((org) => org.id === user.currentOrgId);
    setOrgDropdownData(() => {
      const newData = {
        currentOrg: {
          id: user.currentOrgId,
          name: currentOrgs[i].name,
        },
        orgsArray: currentOrgs,
        orgsComponents: currentOrgs.map(mapOrgDropdowns),
      };
      return newData;
    });
  };

  const onChangeOrg = (e) => {
    e.preventDefault();
    if (props.handleChangeOrg) {
      props.handleChangeOrg(e.target.name);
    }
  };

  const mapOrgDropdowns = (org) => {
    return (
      <Dropdown.Item
        key={"dropdown" + org.id}
        name={org.id}
        onClick={onChangeOrg}
      >
        {org.name}
      </Dropdown.Item>
    );
  };

  const sideToggMenu = (e) => {
    e.preventDefault();
    if (props.data.SidebarToggleMenu) {
      props.data.SidebarToggleMenu(!props.data.isMenuOpened);
    }
  };

  return (
    <Fragment>
      <Navbar expanded="lg" className="navbar-default">
        <div className="d-flex justify-content-between w-100">
          <div className="d-flex align-items-center">
            <Link id="nav-toggle" to="#" onClick={sideToggMenu}>
              <Menu size="18px" />
            </Link>
            <div className="ms-lg-3 d-none d-md-none d-lg-block">
              <Form className=" d-flex align-items-center">
                <InputGroup
                  className="input-group-merge search-bar"
                  bsPrefix="group-of-input"
                >
                  <InputGroup.Text className="ps-2 pe-1 mx-2 my-1 h-40 position-absolute search-icon border-0">
                    <Search size="12px" className="text-secondary" />
                  </InputGroup.Text>
                  <Form.Control
                    type="search"
                    className="form-control form-control-sm ps-6"
                    placeholder="Search Entire Dashboard"
                  />
                </InputGroup>
              </Form>
            </div>
          </div>

          <Nav className="navbar-nav navbar-right-wrap ms-auto d-flex align-items-center nav-top-wrap">
            {orgDropdownData.orgsComponents.length > 1 ? (
              <DropdownButton
                as={Nav.Item}
                title={orgDropdownData.currentOrg.name}
                className="me-4 mt-1"
                size="sm"
              >
                {orgDropdownData.orgsComponents
                  ? orgDropdownData.orgsComponents
                  : null}
              </DropdownButton>
            ) : (
              <Button className="me-4 mt-1" size="sm">
                {orgDropdownData.currentOrg.name}
              </Button>
            )}

            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle
                as={Nav.Link}
                bsPrefix="dt"
                className="text-dark icon-notifications me-lg-2 me-2 btn btn-light btn-icon rounded-circle indicator indicator-primary text-muted"
                id="dropdownNotification"
              >
                <i className="fe fe-bell"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu
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
                                    <h5 className="fw-bold mb-1">
                                      {item.sender}
                                    </h5>
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
                                  <Tooltip id="tooltip-top">
                                    Mark as unread
                                  </Tooltip>
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
                    src={user.avatarUrl}
                    className="rounded-circle"
                  />
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu
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
                <Link bsprefix="btn" className="btn" onClick={onSignOutClick}>
                  Sign Out
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Navbar>
    </Fragment>
  );
};

HeaderDefault.propTypes = {
  data: PropTypes.shape({
    SidebarToggleMenu: PropTypes.func,
    isMenuOpened: PropTypes.bool,
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string.isRequired),
    currentOrgId: PropTypes.number.isRequired,
    organizations: PropTypes.arrayOf(PropTypes.number.isRequired),
  }),
  handleChangeOrg: PropTypes.func.isRequired,
};

export default HeaderDefault;

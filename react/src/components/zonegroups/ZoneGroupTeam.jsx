import React, { useState } from "react";
import {
  Breadcrumb,
  Offcanvas,
  Dropdown,
  Button,
  ButtonGroup,
} from "react-bootstrap";

import AddZoneGroupIntegrated from "./AddZoneGroupIntegrated";
import "../zonegroups/zonegroup.css";

import debug from "sabio-debug";
const _logger = debug.extend("ZoneView");

function ZoneGroupTeam() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  _logger("ZoneGroupView");

  return (
    <React.Fragment>
      <div className="container-fluid p-4">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="border-bottom pb-3 mb-2 d-md-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">C-121 Stargazer</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item href="/zones">Zones</Breadcrumb.Item>
                  <Breadcrumb.Item href="">Space Invaders</Breadcrumb.Item>
                  <Breadcrumb.Item href="/zone/zonegroupsview">
                    Space Invaders Groups
                  </Breadcrumb.Item>
                  <Breadcrumb.Item active>C-121 Stargazer</Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div>
                <Dropdown as={ButtonGroup}>
                  <Button variant="outline-primary" href="/zone/zonegroupsview">
                    Back to All Groups
                  </Button>
                  <Dropdown.Toggle
                    split
                    variant="outline-primary"
                    id="dropdown-split-basic"
                  />
                  <Dropdown.Menu>
                    <Dropdown.Item href="">Edit Group</Dropdown.Item>
                    <Dropdown.Item onClick={handleShow}>
                      Invite Member
                    </Dropdown.Item>
                    <Dropdown.Item href="">Leave Group</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Offcanvas
                  show={show}
                  onHide={handleClose}
                  placement="end"
                  name="end"
                  style={{ width: "600px" }}
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title as="h3"></Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body className="pt-3">
                    <AddZoneGroupIntegrated onClick={handleClose} />
                  </Offcanvas.Body>
                </Offcanvas>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="border-bottom mb-4 d-md-flex align-items-center justify-content-between">
              <ul className="nav nav-lb-tab">
                <li className="ms-0 me-3 mx-3 nav-item">
                  <a
                    className="nav-link mb-sm-3 mb-md-0"
                    href="/zonegroupview/overview"
                  >
                    Overview
                  </a>
                </li>
                <li className=" mx-3 nav-item">
                  <a className="nav-link mb-sm-3 mb-md-0 " href="">
                    Chat
                  </a>
                </li>
                <li className=" mx-3 nav-item">
                  <a className="nav-link mb-sm-3 mb-md-0 active" href="">
                    Team
                  </a>
                </li>
                <li className=" mx-3 nav-item">
                  <a
                    className="nav-link mb-sm-3 mb-md-0"
                    href="/zonegroupview/summary"
                  >
                    Summary
                  </a>
                </li>
              </ul>

              <div className="d-flex align-items-center">
                <div className="avatar-group me-0">
                  <span className="avatar avatar-md me-1  ">
                    <img
                      src="https://geeks-react.netlify.app/static/media/avatar-4.d0ed62998b9d77c2bac7.jpg"
                      className="mb-2 mb-lg-0 rounded-circle"
                      alt="..."
                    />
                  </span>
                  <span className="avatar avatar-md me-1  ">
                    <img
                      src="https://geeks-react.netlify.app/static/media/avatar-15.89d2fc9cd5570f7f110c.jpg"
                      className="mb-2 mb-lg-0 rounded-circle"
                      alt="..."
                    />
                  </span>
                  <span className="avatar avatar-md me-1  ">
                    <img
                      src="https://geeks-react.netlify.app/static/media/avatar-6.3905522d6589ed6dfcf0.jpg"
                      className="mb-2 mb-lg-0 rounded-circle"
                      alt="..."
                    />
                  </span>
                  <span className="avatar avatar-md me-1  ">
                    <img
                      src="/static/media/avatar-1.d2fd9642fd3628734b27.jpg"
                      className="mb-2 mb-lg-0 rounded-circle"
                      alt="..."
                    />
                  </span>
                  <span className="avatar avatar-md avatar-primary me-0 mb-2 mb-lg-0 ">
                    <span className="avatar-initials bg-light rounded-circle text-dark">
                      5+
                    </span>
                  </span>
                </div>
                <a
                  className="btn btn-icon btn-white border border-2 rounded-circle btn-dashed ms-2"
                  href="/zonegroupview/team"
                >
                  {" "}
                  +
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="mb-4 col-xxl-2 col-lg-3 col-md-12 col-12">
            <input
              placeholder="Search member"
              type="search"
              className="form-control"
              defaultValue=""
            />
          </div>
        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="mb-4 card">
                <div className="card-body">
                  <div className="d-flex align-items-center border-primary card-header">
                    <div className="avatar avatar-lg">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-4.d0ed62998b9d77c2bac7.jpg"
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className="mb-0">
                        <a className="text-inherit" href="">
                          Rick Sanchez
                        </a>
                      </h4>
                      <p className="mb-0 text-muted">Teacher</p>
                    </div>
                  </div>
                  <div className="mt-4 lh-1">
                    <a
                      className="me-3 text-muted"
                      data-template="phone"
                      href=""
                    >
                      <i className="fe fe-phone-call fs-4" />
                    </a>
                    <a
                      className="me-3 text-muted"
                      data-template="video"
                      href=""
                    >
                      <i className="fe fe-video fs-4" />
                    </a>
                    <span className="dropdown">
                      <a className="text-muted text-decoration-none" href="">
                        <i className="fe fe-more-horizontal fs-4" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="mb-4 card">
                <div className="card-body">
                  <div className="d-flex align-items-center border-primary card-header">
                    <div className="avatar avatar-lg">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-15.89d2fc9cd5570f7f110c.jpg"
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className="mb-0">
                        <a className="text-inherit" href="">
                          Dianna Smiley
                        </a>
                      </h4>
                      <p className="mb-0 text-muted">Teacher{"'"}s Assistant</p>
                    </div>
                  </div>
                  <div className="mt-4 lh-1">
                    <a
                      className="me-3 text-muted"
                      data-template="phone"
                      href=""
                    >
                      <i className="fe fe-phone-call fs-4" />
                    </a>
                    <a
                      className="me-3 text-muted"
                      data-template="video"
                      href=""
                    >
                      <i className="fe fe-video fs-4" />
                    </a>
                    <span className="dropdown">
                      <a className="text-muted text-decoration-none" href="">
                        <i className="fe fe-more-horizontal fs-4" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="mb-4 card">
                <div className="card-body">
                  <div className="d-flex align-items-center border-primary card-header">
                    <div className="avatar avatar-lg">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-6.3905522d6589ed6dfcf0.jpg"
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className="mb-0">
                        <a className="text-inherit" href="">
                          Sina Ray
                        </a>
                      </h4>
                      <p className="mb-0 text-muted">Student</p>
                    </div>
                  </div>
                  <div className="mt-4 lh-1">
                    <a
                      className="me-3 text-muted"
                      data-template="phone"
                      href=""
                    >
                      <i className="fe fe-phone-call fs-4" />
                    </a>
                    <a
                      className="me-3 text-muted"
                      data-template="video"
                      href=""
                    >
                      <i className="fe fe-video fs-4" />
                    </a>
                    <span className="dropdown">
                      <a className="text-muted text-decoration-none" href="">
                        <i className="fe fe-more-horizontal fs-4" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="mb-4 card">
                <div className="card-body">
                  <div className="d-flex align-items-center border-primary card-header">
                    <div className="avatar avatar-lg">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-1.d2fd9642fd3628734b27.jpg"
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className="mb-0">
                        <a className="text-inherit" href="">
                          Jacob Jones
                        </a>
                      </h4>
                      <p className="mb-0 text-muted">Student</p>
                    </div>
                  </div>
                  <div className="mt-4 lh-1">
                    <a
                      className="me-3 text-muted"
                      data-template="phone"
                      href=""
                    >
                      <i className="fe fe-phone-call fs-4" />
                    </a>
                    <a
                      className="me-3 text-muted"
                      data-template="video"
                      href=""
                    >
                      <i className="fe fe-video fs-4" />
                    </a>
                    <span className="dropdown">
                      <a className="text-muted text-decoration-none" href="">
                        <i className="fe fe-more-horizontal fs-4" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="mb-4 card">
                <div className="card-body">
                  <div className="d-flex align-items-center border-primary card-header">
                    <div className="avatar avatar-lg">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-7.34daf83d575c235d5d20.jpg"
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className="mb-0">
                        <a className="text-inherit" href="">
                          Kristin Watson
                        </a>
                      </h4>
                      <p className="mb-0 text-muted">Student</p>
                    </div>
                  </div>
                  <div className="mt-4 lh-1">
                    <a
                      className="me-3 text-muted"
                      data-template="phone"
                      href=""
                    >
                      <i className="fe fe-phone-call fs-4" />
                    </a>
                    <a
                      className="me-3 text-muted"
                      data-template="video"
                      href=""
                    >
                      <i className="fe fe-video fs-4" />
                    </a>
                    <span className="dropdown">
                      <a className="text-muted text-decoration-none" href="">
                        <i className="fe fe-more-horizontal fs-4" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="mb-4 card">
                <div className="card-body">
                  <div className="d-flex align-items-center border-primary card-header">
                    <div className="avatar avatar-lg">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-9.ce9a73de84b5e2cc414c.jpg"
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className="mb-0">
                        <a className="text-inherit" href="">
                          Brooklyn Simmons
                        </a>
                      </h4>
                      <p className="mb-0 text-muted">Student</p>
                    </div>
                  </div>
                  <div className="mt-4 lh-1">
                    <a
                      className="me-3 text-muted"
                      data-template="phone"
                      href=""
                    >
                      <i className="fe fe-phone-call fs-4" />
                    </a>
                    <a
                      className="me-3 text-muted"
                      data-template="video"
                      href=""
                    >
                      <i className="fe fe-video fs-4" />
                    </a>
                    <span className="dropdown">
                      <a className="text-muted text-decoration-none" href="">
                        <i className="fe fe-more-horizontal fs-4" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="mb-4 card">
                <div className="card-body">
                  <div className="d-flex align-items-center border-primary card-header">
                    <div className="avatar avatar-lg">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-5.991ead30c8a647a4c57f.jpg"
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className="mb-0">
                        <a className="text-inherit" href="">
                          Rivao Luke
                        </a>
                      </h4>
                      <p className="mb-0 text-muted">Student</p>
                    </div>
                  </div>
                  <div className="mt-4 lh-1">
                    <a
                      className="me-3 text-muted"
                      data-template="phone"
                      href=""
                    >
                      <i className="fe fe-phone-call fs-4" />
                    </a>
                    <a
                      className="me-3 text-muted"
                      data-template="video"
                      href=""
                    >
                      <i className="fe fe-video fs-4" />
                    </a>
                    <span className="dropdown">
                      <a className="text-muted text-decoration-none" href="">
                        <i className="fe fe-more-horizontal fs-4" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="mb-4 card">
                <div className="card-body">
                  <div className="d-flex align-items-center border-primary card-header">
                    <div className="avatar avatar-lg">
                      <img
                        src="/static/media/avatar-3.d3ce7f20113e7d124501.jpg"
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className="mb-0">
                        <a className="text-inherit" href="">
                          Nia Sikhone
                        </a>
                      </h4>
                      <p className="mb-0 text-muted">Student</p>
                    </div>
                  </div>
                  <div className="mt-4 lh-1">
                    <a
                      className="me-3 text-muted"
                      data-template="phone"
                      href="m"
                    >
                      <i className="fe fe-phone-call fs-4" />
                    </a>
                    <a
                      className="me-3 text-muted"
                      data-template="video"
                      href=""
                    >
                      <i className="fe fe-video fs-4" />
                    </a>
                    <span className="dropdown">
                      <a className="text-muted text-decoration-none" href="/">
                        <i className="fe fe-more-horizontal fs-4" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="mb-4 card">
                <div className="card-body">
                  <div className="d-flex align-items-center border-primary card-header">
                    <div className="avatar avatar-lg">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-8.4f2c1e3f1054805416e6.jpg"
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className="mb-0">
                        <a className="text-inherit" href="">
                          Francis Dubois
                        </a>
                      </h4>
                      <p className="mb-0 text-muted">Student</p>
                    </div>
                  </div>
                  <div className="mt-4 lh-1">
                    <a
                      className="me-3 text-muted"
                      data-template="phone"
                      href=""
                    >
                      <i className="fe fe-phone-call fs-4" />
                    </a>
                    <a
                      className="me-3 text-muted"
                      data-template="video"
                      href=""
                    >
                      <i className="fe fe-video fs-4" />
                    </a>
                    <span className="dropdown">
                      <a className="text-muted text-decoration-none" href="">
                        <i className="fe fe-more-horizontal fs-4" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="mb-4 card">
                <div className="card-body">
                  <div className="d-flex align-items-center border-primary card-header">
                    <div className="avatar avatar-lg">
                      <img
                        src="/static/media/avatar-2.397cdd4b772a83b9166e.jpg"
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className="mb-0">
                        <a className="text-inherit" href="">
                          Nicole Davis
                        </a>
                      </h4>
                      <p className="mb-0 text-muted">Student</p>
                    </div>
                  </div>
                  <div className="mt-4 lh-1">
                    <a
                      className="me-3 text-muted"
                      data-template="phone"
                      href=""
                    >
                      <i className="fe fe-phone-call fs-4" />
                    </a>
                    <a
                      className="me-3 text-muted"
                      data-template="video"
                      href=""
                    >
                      <i className="fe fe-video fs-4" />
                    </a>
                    <span className="dropdown">
                      <a className="text-muted text-decoration-none" href="">
                        <i className="fe fe-more-horizontal fs-4" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="mb-4 card">
                <div className="card-body">
                  <div className="d-flex align-items-center border-primary card-header">
                    <div className="avatar avatar-lg">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-18.9aa0c6a0f9f1aeb68ca9.jpg"
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className="mb-0">
                        <a className="text-inherit" href="">
                          Jennifer Garcia
                        </a>
                      </h4>
                      <p className="mb-0 text-muted">Student</p>
                    </div>
                  </div>
                  <div className="mt-4 lh-1">
                    <a
                      className="me-3 text-muted"
                      data-template="phone"
                      href=""
                    >
                      <i className="fe fe-phone-call fs-4" />
                    </a>
                    <a
                      className="me-3 text-muted"
                      data-template="video"
                      href=""
                    >
                      <i className="fe fe-video fs-4" />
                    </a>
                    <span className="dropdown">
                      <a className="text-muted text-decoration-none" href="">
                        <i className="fe fe-more-horizontal fs-4" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div className="mb-4 card">
                <div className="card-body">
                  <div className="d-flex align-items-center border-primary card-header">
                    <div className="avatar avatar-lg">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-12.504957a542902e1e16f2.jpg"
                        alt=""
                        className="rounded-circle"
                      />
                    </div>
                    <div className="ms-3">
                      <h4 className="mb-0">
                        <a className="text-inherit" href="">
                          Clyde Collier
                        </a>
                      </h4>
                      <p className="mb-0 text-muted">Student</p>
                    </div>
                  </div>
                  <div className="mt-4 lh-1">
                    <a
                      className="me-3 text-muted"
                      data-template="phone"
                      href=""
                    >
                      <i className="fe fe-phone-call fs-4" />
                    </a>
                    <a
                      className="me-3 text-muted"
                      data-template="video"
                      href=""
                    >
                      <i className="fe fe-video fs-4" />
                    </a>
                    <span className="dropdown">
                      <a className="text-muted text-decoration-none" href="">
                        <i className="fe fe-more-horizontal fs-4" />
                      </a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ZoneGroupTeam;

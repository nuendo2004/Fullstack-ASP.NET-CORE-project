import React, { useState } from "react";
import {
  Breadcrumb,
  Offcanvas,
  Dropdown,
  Button,
  ButtonGroup,
  Carousel,
  Image,
} from "react-bootstrap";

import AddZoneGroupIntegrated from "./AddZoneGroupIntegrated";
import "../zonegroups/zonegroup.css";

import debug from "sabio-debug";
const _logger = debug.extend("ZoneView");

function ZoneGroupOverview() {
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
                  <Breadcrumb.Item href="#">Space Invaders</Breadcrumb.Item>
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
                  <a className="nav-link mb-sm-3 mb-md-0 active" href="">
                    Overview
                  </a>
                </li>
                <li className=" mx-3 nav-item">
                  <a className="nav-link mb-sm-3 mb-md-0 " href="">
                    Chat
                  </a>
                </li>
                <li className=" mx-3 nav-item">
                  <a
                    className="nav-link mb-sm-3 mb-md-0 "
                    href="/zonegroupview/team"
                  >
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

        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-8 col-md-12 col-12">
              <div className="row">
                <div className="mb-4 col-12">
                  <div className="card">
                    <div className="card-header border-primary bg-light-purple">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h4 className="mb-0 fw-bolder">Space Invaders</h4>
                        </div>
                        <div>
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="currentColor"
                              className="text-primary"
                            >
                              <path d="M20.322.75a10.75 10.75 0 00-7.373 2.926l-1.304 1.23A23.743 23.743 0 0010.103 6.5H5.066a1.75 1.75 0 00-1.5.85l-2.71 4.514a.75.75 0 00.49 1.12l4.571.963c.039.049.082.096.129.14L8.04 15.96l1.872 1.994c.044.047.091.09.14.129l.963 4.572a.75.75 0 001.12.488l4.514-2.709a1.75 1.75 0 00.85-1.5v-5.038a23.741 23.741 0 001.596-1.542l1.228-1.304a10.75 10.75 0 002.925-7.374V2.499A1.75 1.75 0 0021.498.75h-1.177zM16 15.112c-.333.248-.672.487-1.018.718l-3.393 2.262.678 3.223 3.612-2.167a.25.25 0 00.121-.214v-3.822zm-10.092-2.7L8.17 9.017c.23-.346.47-.685.717-1.017H5.066a.25.25 0 00-.214.121l-2.167 3.612 3.223.679zm8.07-7.644a9.25 9.25 0 016.344-2.518h1.177a.25.25 0 01.25.25v1.176a9.25 9.25 0 01-2.517 6.346l-1.228 1.303a22.248 22.248 0 01-3.854 3.257l-3.288 2.192-1.743-1.858a.764.764 0 00-.034-.034l-1.859-1.744 2.193-3.29a22.248 22.248 0 013.255-3.851l1.304-1.23zM17.5 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-11 13c.9-.9.9-2.6 0-3.5-.9-.9-2.6-.9-3.5 0-1.209 1.209-1.445 3.901-1.49 4.743a.232.232 0 00.247.247c.842-.045 3.534-.281 4.743-1.49z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <p>
                        Aliens from outer space are invading Earth, it is the
                        player{"'"}s heroic duty to pilot a cannon that fires
                        lasers used against the ones to defend the home planet
                        from, which the targets are several squadrons of 55
                        black furry monsters inside of lander-spacecrafts that
                        resembles three types of multi-legged sea-creatures,
                        their obstacles are to either zap the tank or land in
                        front of it, so the player must make sure they won{"'"}t
                        survive at both.
                      </p>

                      <div className="list-group list-group-flush">
                        <div className="px-0 list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="text-primary"
                              >
                                <path d="M7.693 1.066a.75.75 0 01.614 0l7.25 3.25a.75.75 0 010 1.368L13 6.831v2.794c0 1.024-.81 1.749-1.66 2.173-.893.447-2.075.702-3.34.702-.278 0-.55-.012-.816-.036a.75.75 0 01.133-1.494c.22.02.45.03.683.03 1.082 0 2.025-.221 2.67-.543.69-.345.83-.682.83-.832V7.503L8.307 8.934a.75.75 0 01-.614 0L4 7.28v1.663c.296.105.575.275.812.512.438.438.688 1.059.688 1.796v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3c0-.737.25-1.358.688-1.796.237-.237.516-.407.812-.512V6.606L.443 5.684a.75.75 0 010-1.368l7.25-3.25zM2.583 5L8 7.428 13.416 5 8 2.572 2.583 5zM2.5 11.25c0-.388.125-.611.25-.735a.704.704 0 01.5-.203c.19 0 .37.071.5.203.125.124.25.347.25.735v2.25H2.5v-2.25z"></path>
                              </svg>
                              <div className="ms-2">
                                <h5 className="mb-0 text-body">Group</h5>
                              </div>
                            </div>
                            <div>
                              <p className="text-dark mb-0 fw-semi-bold">
                                C-121
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="px-0 list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="text-primary"
                              >
                                <path d="M4.75 0a.75.75 0 01.75.75V2h5V.75a.75.75 0 011.5 0V2h1.25c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0113.25 16H2.75A1.75 1.75 0 011 14.25V3.75C1 2.784 1.784 2 2.75 2H4V.75A.75.75 0 014.75 0zm0 3.5h8.5a.25.25 0 01.25.25V6h-11V3.75a.25.25 0 01.25-.25h2zm-2.25 4v6.75c0 .138.112.25.25.25h10.5a.25.25 0 00.25-.25V7.5h-11z"></path>
                              </svg>
                              <div className="ms-2">
                                <h5 className="mb-0 text-body">Quarter</h5>
                              </div>
                            </div>
                            <div>
                              <p className="text-dark mb-0 fw-semi-bold">2</p>
                            </div>
                          </div>
                        </div>
                        <div className="px-0 list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                width={16}
                                height={16}
                                fill="currentColor"
                                className="text-primary"
                              >
                                <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
                              </svg>
                              <div className="ms-2">
                                <h5 className="mb-0 text-body">Time Left</h5>
                              </div>
                            </div>
                            <div>
                              <p className="text-dark mb-0 fw-semi-bold">
                                26 Days
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="px-0 list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="text-primary"
                              >
                                <path d="M14.064 0a8.75 8.75 0 00-6.187 2.563l-.459.458c-.314.314-.616.641-.904.979H3.31a1.75 1.75 0 00-1.49.833L.11 7.607a.75.75 0 00.418 1.11l3.102.954c.037.051.079.1.124.145l2.429 2.428c.046.046.094.088.145.125l.954 3.102a.75.75 0 001.11.418l2.774-1.707a1.75 1.75 0 00.833-1.49V9.485c.338-.288.665-.59.979-.904l.458-.459A8.75 8.75 0 0016 1.936V1.75A1.75 1.75 0 0014.25 0h-.186zM10.5 10.625c-.088.06-.177.118-.266.175l-2.35 1.521.548 1.783 1.949-1.2a.25.25 0 00.119-.213v-2.066zM3.678 8.116L5.2 5.766c.058-.09.117-.178.176-.266H3.309a.25.25 0 00-.213.119l-1.2 1.95 1.782.547zm5.26-4.493A7.25 7.25 0 0114.063 1.5h.186a.25.25 0 01.25.25v.186a7.25 7.25 0 01-2.123 5.127l-.459.458a15.21 15.21 0 01-2.499 2.02l-2.317 1.5-2.143-2.143 1.5-2.317a15.25 15.25 0 012.02-2.5l.458-.458h.002zM12 5a1 1 0 11-2 0 1 1 0 012 0zm-8.44 9.56a1.5 1.5 0 10-2.12-2.12c-.734.73-1.047 2.332-1.15 3.003a.23.23 0 00.265.265c.671-.103 2.273-.416 3.005-1.148z"></path>
                              </svg>
                              <div className="ms-2">
                                <h5 className="mb-0 text-body">
                                  Total Games Played
                                </h5>
                              </div>
                            </div>
                            <div>
                              <p className="text-dark mb-0 fw-semi-bold">318</p>
                            </div>
                          </div>
                        </div>
                        <div className="px-0 list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="text-primary"
                              >
                                <path d="M3.25 9a.75.75 0 01.75.75c0 2.142.456 3.828.733 4.653a.121.121 0 00.05.064.207.207 0 00.117.033h1.31c.085 0 .18-.042.258-.152a.448.448 0 00.075-.366A16.74 16.74 0 016 9.75a.75.75 0 011.5 0c0 1.588.25 2.926.494 3.85.293 1.113-.504 2.4-1.783 2.4H4.9c-.686 0-1.35-.41-1.589-1.12A16.42 16.42 0 012.5 9.75.75.75 0 013.25 9z"></path>
                                <path d="M0 6a4 4 0 014-4h2.75a.75.75 0 01.75.75v6.5a.75.75 0 01-.75.75H4a4 4 0 01-4-4zm4-2.5a2.5 2.5 0 000 5h2v-5H4z"></path>
                                <path d="M15.59.082A.75.75 0 0116 .75v10.5a.75.75 0 01-1.189.608l-.002-.001h.001l-.014-.01a5.829 5.829 0 00-.422-.25 10.58 10.58 0 00-1.469-.64C11.576 10.484 9.536 10 6.75 10a.75.75 0 110-1.5c2.964 0 5.174.516 6.658 1.043.423.151.787.302 1.092.443V2.014c-.305.14-.669.292-1.092.443C11.924 2.984 9.713 3.5 6.75 3.5a.75.75 0 110-1.5c2.786 0 4.826-.484 6.155-.957.665-.236 1.154-.47 1.47-.64a5.82 5.82 0 00.421-.25l.014-.01a.75.75 0 01.78-.061zm-.78.06zm.44 11.108l-.44.607.44-.607z"></path>
                              </svg>
                              <div className="ms-2">
                                <h5 className="mb-0 text-body">
                                  Total Threats Reported
                                </h5>
                              </div>
                            </div>
                            <div>
                              <p className="text-dark mb-0 fw-semi-bold">167</p>
                            </div>
                          </div>
                        </div>
                        <div className="px-0 list-group-item">
                          <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 16 16"
                                width="16"
                                height="16"
                                fill="currentColor"
                                className="text-primary"
                              >
                                <path d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"></path>
                              </svg>
                              <div className="ms-2">
                                <h5 className="mb-0 text-body">
                                  Security Incidents
                                </h5>
                              </div>
                            </div>
                            <div>
                              <p className="text-dark mb-0 fw-semi-bold">3</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4 col-md-12">
                  <div className="card">
                    <div className="card-header border-primary bg-light-purple">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h4 className="mb-0 fw-bolder">Group Analytics</h4>
                        </div>
                        <div>
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="currentColor"
                              className="text-primary"
                            >
                              <path d="M2.5 2.75a.75.75 0 00-1.5 0v18.5c0 .414.336.75.75.75H20a.75.75 0 000-1.5H2.5V2.75z"></path>
                              <path d="M22.28 7.78a.75.75 0 00-1.06-1.06l-5.72 5.72-3.72-3.72a.75.75 0 00-1.06 0l-6 6a.75.75 0 101.06 1.06l5.47-5.47 3.72 3.72a.75.75 0 001.06 0l6.25-6.25z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-4 col-md-12 col-12">
                        <div className="d-flex align-items-center justify-content-between p-4">
                          <div>
                            <h2 className="h1 fw-bold mb-0">12</h2>
                            <p className="mb-0 ">Total Members</p>
                          </div>
                          <div className="ms-3">
                            <div className="icon-shape icon-lg bg-light-primary text-primary rounded-circle">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="text-primary"
                              >
                                <path d="M9.75 14a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75zm4.5 0a.75.75 0 01.75.75v2.5a.75.75 0 01-1.5 0v-2.5a.75.75 0 01.75-.75z"></path>
                                <path d="M12 2c-2.214 0-4.248.657-5.747 1.756a7.43 7.43 0 00-.397.312c-.584.235-1.077.546-1.474.952-.85.87-1.132 2.037-1.132 3.368 0 .368.014.733.052 1.086l-.633 1.478-.043.022A4.75 4.75 0 000 15.222v1.028c0 .529.31.987.564 1.293.28.336.637.653.967.918a13.262 13.262 0 001.299.911l.024.015.006.004.04.025.144.087c.124.073.304.177.535.3.46.245 1.122.57 1.942.894C7.155 21.344 9.439 22 12 22s4.845-.656 6.48-1.303c.819-.324 1.481-.65 1.941-.895a13.797 13.797 0 00.68-.386l.039-.025.006-.004.024-.015a8.829 8.829 0 00.387-.248c.245-.164.577-.396.912-.663.33-.265.686-.582.966-.918.256-.306.565-.764.565-1.293v-1.028a4.75 4.75 0 00-2.626-4.248l-.043-.022-.633-1.478c.038-.353.052-.718.052-1.086 0-1.331-.282-2.499-1.132-3.368-.397-.406-.89-.717-1.474-.952a7.386 7.386 0 00-.397-.312C16.248 2.657 14.214 2 12 2zm-8 9.654l.038-.09c.046.06.094.12.145.177.793.9 2.057 1.259 3.782 1.259 1.59 0 2.739-.544 3.508-1.492.131-.161.249-.331.355-.508a32.948 32.948 0 00.344 0c.106.177.224.347.355.508.77.948 1.918 1.492 3.508 1.492 1.725 0 2.989-.359 3.782-1.259.05-.057.099-.116.145-.177l.038.09v6.669a17.618 17.618 0 01-2.073.98C16.405 19.906 14.314 20.5 12 20.5c-2.314 0-4.405-.594-5.927-1.197A17.62 17.62 0 014 18.323v-6.67zm6.309-1.092a2.35 2.35 0 01-.38.374c-.437.341-1.054.564-1.964.564-1.573 0-2.292-.337-2.657-.75-.192-.218-.331-.506-.423-.89-.091-.385-.135-.867-.135-1.472 0-1.14.243-1.847.705-2.32.477-.487 1.319-.861 2.824-1.024 1.487-.16 2.192.138 2.533.529l.008.01c.264.308.429.806.43 1.568v.031a7.203 7.203 0 01-.09 1.079c-.143.967-.406 1.754-.851 2.301zm2.504-2.497a7.174 7.174 0 01-.063-.894v-.02c.001-.77.17-1.27.438-1.578.341-.39 1.046-.69 2.533-.529 1.506.163 2.347.537 2.824 1.025.462.472.705 1.179.705 2.319 0 1.21-.174 1.926-.558 2.361-.365.414-1.084.751-2.657.751-1.21 0-1.902-.393-2.344-.938-.475-.584-.742-1.44-.878-2.497z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-start-md col-lg-4 col-md-12 col-12">
                        <div className="d-flex align-items-center justify-content-between p-4">
                          <div>
                            <h2 className="h1 fw-bold mb-0">42</h2>
                            <p className="mb-0 ">Threats Reported This Week</p>
                          </div>
                          <div className="ms-3">
                            <div className="icon-shape icon-lg bg-light-danger text-danger rounded-circle">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="text-danger"
                              >
                                <path d="M22 1.75a.75.75 0 00-1.161-.627c-.047.03-.094.057-.142.085a9.15 9.15 0 01-.49.262c-.441.22-1.11.519-2.002.82-1.78.6-4.45 1.21-7.955 1.21H6.5A5.5 5.5 0 005 14.293v.457c0 3.061.684 5.505 1.061 6.621.24.709.904 1.129 1.6 1.129h2.013c1.294 0 2.1-1.322 1.732-2.453-.412-1.268-.906-3.268-.906-5.547 0-.03-.002-.06-.005-.088 3.382.028 5.965.644 7.703 1.251.89.312 1.559.62 2 .849.084.043.171.096.261.15.357.214.757.455 1.142.25A.75.75 0 0022 16.25V1.75zM10.5 12.912c3.564.029 6.313.678 8.193 1.335.737.258 1.34.517 1.807.74V2.993c-.467.216-1.073.467-1.815.718-1.878.634-4.624 1.26-8.185 1.288v7.913zm-4 1.838v-.25H9c0 2.486.537 4.648.98 6.01a.398.398 0 01-.057.343c-.07.104-.162.147-.249.147H7.661c-.105 0-.161-.058-.179-.109-.344-1.018-.982-3.294-.982-6.141zM6.5 5H9v8H6.5a4 4 0 010-8z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="border-start-md col-lg-4 col-md-12 col-12">
                        <div className="d-flex align-items-center justify-content-between p-4">
                          <div>
                            <h2 className="h1 fw-bold mb-0">121,121</h2>
                            <p className="mb-0 ">Average Group Score</p>
                          </div>
                          <div className="ms-3">
                            <div className="icon-shape icon-lg bg-light-success text-success rounded-circle">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                                fill="currentColor"
                                className="text-success"
                              >
                                <path d="M20.322.75a10.75 10.75 0 00-7.373 2.926l-1.304 1.23A23.743 23.743 0 0010.103 6.5H5.066a1.75 1.75 0 00-1.5.85l-2.71 4.514a.75.75 0 00.49 1.12l4.571.963c.039.049.082.096.129.14L8.04 15.96l1.872 1.994c.044.047.091.09.14.129l.963 4.572a.75.75 0 001.12.488l4.514-2.709a1.75 1.75 0 00.85-1.5v-5.038a23.741 23.741 0 001.596-1.542l1.228-1.304a10.75 10.75 0 002.925-7.374V2.499A1.75 1.75 0 0021.498.75h-1.177zM16 15.112c-.333.248-.672.487-1.018.718l-3.393 2.262.678 3.223 3.612-2.167a.25.25 0 00.121-.214v-3.822zm-10.092-2.7L8.17 9.017c.23-.346.47-.685.717-1.017H5.066a.25.25 0 00-.214.121l-2.167 3.612 3.223.679zm8.07-7.644a9.25 9.25 0 016.344-2.518h1.177a.25.25 0 01.25.25v1.176a9.25 9.25 0 01-2.517 6.346l-1.228 1.303a22.248 22.248 0 01-3.854 3.257l-3.288 2.192-1.743-1.858a.764.764 0 00-.034-.034l-1.859-1.744 2.193-3.29a22.248 22.248 0 013.255-3.851l1.304-1.23zM17.5 8a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-11 13c.9-.9.9-2.6 0-3.5-.9-.9-2.6-.9-3.5 0-1.209 1.209-1.445 3.901-1.49 4.743a.232.232 0 00.247.247c.842-.045 3.534-.281 4.743-1.49z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4 col-md-12">
                  <div className="card">
                    <div className="card-header border-primary">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h4 className="mb-0 fw-bolder">Leaderboard</h4>
                        </div>
                        <div>
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="24"
                              height="24"
                              fill="currentColor"
                              className="text-primary"
                            >
                              <path d="M5.09 10.121A5.252 5.252 0 011 5V3.75C1 2.784 1.784 2 2.75 2h2.364c.236-.586.81-1 1.48-1h10.812c.67 0 1.244.414 1.48 1h2.489c.966 0 1.75.784 1.75 1.75V5a5.252 5.252 0 01-4.219 5.149 7.01 7.01 0 01-4.644 5.478l.231 3.003a.326.326 0 00.034.031c.079.065.303.203.836.282.838.124 1.637.81 1.637 1.807v.75h2.25a.75.75 0 010 1.5H4.75a.75.75 0 010-1.5H7v-.75c0-.996.8-1.683 1.637-1.807.533-.08.757-.217.836-.282a.334.334 0 00.034-.031l.231-3.003A7.01 7.01 0 015.09 10.12zM5 3.5H2.75a.25.25 0 00-.25.25V5A3.752 3.752 0 005 8.537V3.5zm6.217 12.457l-.215 2.793-.001.021-.003.043a1.203 1.203 0 01-.022.147c-.05.237-.194.567-.553.86-.348.286-.853.5-1.566.605a.482.482 0 00-.274.136.265.265 0 00-.083.188v.75h7v-.75a.265.265 0 00-.083-.188.483.483 0 00-.274-.136c-.713-.105-1.218-.32-1.567-.604-.358-.294-.502-.624-.552-.86a1.203 1.203 0 01-.025-.19l-.001-.022-.215-2.793a7.076 7.076 0 01-1.566 0zM19 8.578V3.5h2.375a.25.25 0 01.25.25V5c0 1.68-1.104 3.1-2.625 3.578zM6.5 2.594c0-.052.042-.094.094-.094h10.812c.052 0 .094.042.094.094V9a5.5 5.5 0 11-11 0V2.594z"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="table-responsive overflow-y-hidden">
                      <table className="table mb-0 text-nowrap table">
                        <thead className="table-primary">
                          <tr>
                            <th scope="col" className="border-top-0">
                              Member
                            </th>
                            <th scope="col" className="border-top-0 ">
                              Average Score
                            </th>
                            <th scope="col" className="border-top-0 ">
                              High Score
                            </th>
                            <th scope="col" className="border-top-0 ">
                              Reports
                            </th>
                            <th scope="col" className="border-top-0 ">
                              Weekly Goal
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="align-middle">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-sm">
                                  <img
                                    src="https://geeks-react.netlify.app/static/media/avatar-6.3905522d6589ed6dfcf0.jpg"
                                    alt=""
                                    className="rounded-circle"
                                  />
                                </div>
                                <div className="ms-2">
                                  <h5 className="mb-0">Sina Ray</h5>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle ">216,238</td>
                            <td className="align-middle ">264,958</td>
                            <td className="align-middle ">4</td>
                            <td className="align-middle ">
                              <div className="d-flex align-items-center">
                                <div
                                  className="flex-auto progress"
                                  style={{ height: 6 }}
                                >
                                  <div
                                    role="progressbar"
                                    className="progress-bar bg-success"
                                    aria-valuenow={62}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "62%" }}
                                  />
                                </div>
                                <div className="ms-2">
                                  {" "}
                                  <span>62%</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="align-middle">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-sm">
                                  <img
                                    src="https://geeks-react.netlify.app/static/media/avatar-12.504957a542902e1e16f2.jpg"
                                    alt=""
                                    className="rounded-circle"
                                  />
                                </div>
                                <div className="ms-2">
                                  <h5 className="mb-0">Clyde Collier</h5>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle ">204,623</td>
                            <td className="align-middle ">249,617</td>
                            <td className="align-middle ">6</td>
                            <td className="align-middle ">
                              <div className="d-flex align-items-center">
                                <div
                                  className="flex-auto progress"
                                  style={{ height: 6 }}
                                >
                                  <div
                                    role="progressbar"
                                    className="progress-bar bg-success"
                                    aria-valuenow={45}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "45%" }}
                                  />
                                </div>
                                <div className="ms-2">
                                  {" "}
                                  <span>45%</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="align-middle">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-sm">
                                  <img
                                    src="/static/media/avatar-1.d2fd9642fd3628734b27.jpg"
                                    alt=""
                                    className="rounded-circle"
                                  />
                                </div>
                                <div className="ms-2">
                                  <h5 className="mb-0">Jacob Jones</h5>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle ">182,167</td>
                            <td className="align-middle ">196,075</td>
                            <td className="align-middle ">3</td>
                            <td className="align-middle ">
                              <div className="d-flex align-items-center">
                                <div
                                  className="flex-auto progress"
                                  style={{ height: 6 }}
                                >
                                  <div
                                    role="progressbar"
                                    className="progress-bar bg-success"
                                    aria-valuenow={80}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "80%" }}
                                  />
                                </div>
                                <div className="ms-2">
                                  {" "}
                                  <span>80%</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="align-middle">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-sm">
                                  <img
                                    src="/static/media/avatar-3.d3ce7f20113e7d124501.jpg"
                                    alt=""
                                    className="rounded-circle"
                                  />
                                </div>
                                <div className="ms-2">
                                  <h5 className="mb-0">Nia Sikhone</h5>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle ">155,049</td>
                            <td className="align-middle ">184,678</td>
                            <td className="align-middle ">1</td>
                            <td className="align-middle ">
                              <div className="d-flex align-items-center">
                                <div
                                  className="flex-auto progress"
                                  style={{ height: 6 }}
                                >
                                  <div
                                    role="progressbar"
                                    className="progress-bar bg-success"
                                    aria-valuenow={10}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "10%" }}
                                  />
                                </div>
                                <div className="ms-2">
                                  {" "}
                                  <span>10%</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="align-middle">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-sm">
                                  <img
                                    src="/static/media/avatar-2.397cdd4b772a83b9166e.jpg"
                                    alt=""
                                    className="rounded-circle"
                                  />
                                </div>
                                <div className="ms-2">
                                  <h5 className="mb-0">Nicole Davis</h5>
                                </div>
                              </div>
                            </td>
                            <td className="align-middle ">167,057</td>
                            <td className="align-middle ">176,073</td>
                            <td className="align-middle ">2</td>
                            <td className="align-middle ">
                              <div className="d-flex align-items-center">
                                <div
                                  className="flex-auto progress"
                                  style={{ height: 6 }}
                                >
                                  <div
                                    role="progressbar"
                                    className="progress-bar bg-success"
                                    aria-valuenow={8}
                                    aria-valuemin={0}
                                    aria-valuemax={100}
                                    style={{ width: "24%" }}
                                  />
                                </div>
                                <div className="ms-2">
                                  {" "}
                                  <span>24%</span>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-4 col-md-12 col-12">
              <div className="mb-4 card bg-primary border-primary">
                <Carousel indicators>
                  <Carousel.Item>
                    <Image
                      className="carousel-zonegroup-img"
                      src="https://s.yimg.com/uu/api/res/1.2/QeWy34h2Umm4ECaeFOQxXw--~B/aD0xMTI1O3c9MTgwMDthcHBpZD15dGFjaHlvbg--/https://o.aolcdn.com/hss/storage/midas/46d31a6cf021d0b0b15f479bab5c7dc5/206352358/eve-ed.jpg.cf.jpg"
                      alt="First slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image
                      className="carousel-zonegroup-img"
                      src="https://cdn.mos.cms.futurecdn.net/9UmWCbyxpKaEGXjwFG7dXo.jpg"
                      alt="Second slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image
                      className="carousel-zonegroup-img"
                      src="https://wallpaper.dog/large/5508433.jpg"
                      alt="Third slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image
                      className="carousel-zonegroup-img"
                      src="https://images.immediate.co.uk/production/volatile/sites/25/2020/04/Things-never-knew-astronomy-e454e5d.jpg"
                      alt="Fourth slide"
                    />
                  </Carousel.Item>
                  <Carousel.Item>
                    <Image
                      className="carousel-zonegroup-img"
                      src="https://venturebeat.com/wp-content/uploads/2021/03/eve-Bastions-of-War-No-Copy.jpg?w=1200&strip=all"
                      alt="Fifth slide"
                    />
                  </Carousel.Item>
                </Carousel>
              </div>

              <div className="mb-4 card">
                <div className="card-header border-primary bg-light-purple">
                  {" "}
                  <h1
                    className="display-6 card-title fw-bolder"
                    style={{ textAlign: "center" }}
                  >
                    Bulletin Board
                  </h1>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <div>
                      <a href="">
                        <h4 className=" mb-1">Common Cyber Attacks</h4>
                      </a>
                      <p className="mb-0">
                        Common Cyber Attacks And How To Prevent Them
                      </p>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-primary"
                      >
                        <path d="M7.886 1.553a1.75 1.75 0 012.869.604l.633 1.629a5.666 5.666 0 003.725 3.395l3.959 1.131a1.75 1.75 0 01.757 2.92L16.06 15l5.594 5.595a.75.75 0 11-1.06 1.06L15 16.061l-3.768 3.768a1.75 1.75 0 01-2.92-.757l-1.131-3.96a5.667 5.667 0 00-3.395-3.724l-1.63-.633a1.75 1.75 0 01-.603-2.869l6.333-6.333zm6.589 12.912l-.005.005-.005.005-4.294 4.293a.25.25 0 01-.417-.108l-1.13-3.96A7.166 7.166 0 004.33 9.99L2.7 9.356a.25.25 0 01-.086-.41l6.333-6.332a.25.25 0 01.41.086l.633 1.63a7.167 7.167 0 004.71 4.293l3.96 1.131a.25.25 0 01.108.417l-4.293 4.294z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <a href="">
                        <h4 className=" mb-1">Code of Conduct</h4>
                      </a>
                      <p className="mb-0">
                        Reminder: Be Respectful And Have Fun! :)
                      </p>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-primary"
                      >
                        <path d="M7.886 1.553a1.75 1.75 0 012.869.604l.633 1.629a5.666 5.666 0 003.725 3.395l3.959 1.131a1.75 1.75 0 01.757 2.92L16.06 15l5.594 5.595a.75.75 0 11-1.06 1.06L15 16.061l-3.768 3.768a1.75 1.75 0 01-2.92-.757l-1.131-3.96a5.667 5.667 0 00-3.395-3.724l-1.63-.633a1.75 1.75 0 01-.603-2.869l6.333-6.333zm6.589 12.912l-.005.005-.005.005-4.294 4.293a.25.25 0 01-.417-.108l-1.13-3.96A7.166 7.166 0 004.33 9.99L2.7 9.356a.25.25 0 01-.086-.41l6.333-6.332a.25.25 0 01.41.086l.633 1.63a7.167 7.167 0 004.71 4.293l3.96 1.131a.25.25 0 01.108.417l-4.293 4.294z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                      <a href="">
                        <h4 className="mb-1">
                          How To Report Cybersecurity Threats
                        </h4>
                      </a>
                      <p className="mb-0">Click For A Quick Refresher!</p>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                        className="text-primary"
                      >
                        <path d="M7.886 1.553a1.75 1.75 0 012.869.604l.633 1.629a5.666 5.666 0 003.725 3.395l3.959 1.131a1.75 1.75 0 01.757 2.92L16.06 15l5.594 5.595a.75.75 0 11-1.06 1.06L15 16.061l-3.768 3.768a1.75 1.75 0 01-2.92-.757l-1.131-3.96a5.667 5.667 0 00-3.395-3.724l-1.63-.633a1.75 1.75 0 01-.603-2.869l6.333-6.333zm6.589 12.912l-.005.005-.005.005-4.294 4.293a.25.25 0 01-.417-.108l-1.13-3.96A7.166 7.166 0 004.33 9.99L2.7 9.356a.25.25 0 01-.086-.41l6.333-6.332a.25.25 0 01.41.086l.633 1.63a7.167 7.167 0 004.71 4.293l3.96 1.131a.25.25 0 01.108.417l-4.293 4.294z"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header-height d-flex justify-content-between align-items-center card-header border-primary bg-light-purple">
                  <div>
                    {" "}
                    <h4 className="mb-0 fw-bolder">Recent Activity</h4>
                  </div>
                  <div>
                    <a className="" href="">
                      View All
                    </a>
                  </div>
                </div>
                <div className="card-body mb-3">
                  <div className="list-timeline-activity list-group list-group-flush">
                    <div className="px-0 pt-0 border-0 pb-6 list-group-item">
                      <div className="position-relative row">
                        <div className="col-auto">
                          <div className="icon-shape icon-md bg-light-primary text-primary rounded-circle">
                            <i className="fe fe-check" />
                          </div>
                        </div>
                        <div className="ms-n3 col">
                          <h4 className="mb-0 h5">Goal Completed</h4>
                          <p className="mb-0 text-body">
                            Jennifer reached her weekly goal!
                          </p>
                        </div>
                        <div className="col-auto">
                          <span className="text-muted fs-6">2 mins ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-0 pt-0 border-0 pb-6 list-group-item">
                      <div className="position-relative row">
                        <div className="col-auto">
                          <div className="icon-shape icon-md bg-light-primary text-primary rounded-circle">
                            <i className="fe fe-message-square" />
                          </div>
                        </div>
                        <div className="ms-n3 col">
                          <h4 className="mb-0 h5">New Comment</h4>
                          <p className="mb-0 text-body">
                            Rick posted a new comment.
                          </p>
                        </div>
                        <div className="col-auto">
                          <span className="text-muted fs-6">1 hour ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-0 pt-0 border-0 pb-6 list-group-item">
                      <div className="position-relative row">
                        <div className="col-auto">
                          <div className="icon-shape icon-md bg-light-primary text-primary rounded-circle">
                            <i className="fe fe-alert-triangle" />
                          </div>
                        </div>
                        <div className="ms-n3 col">
                          <h4 className="mb-0 h5">Task Overdue</h4>
                          <p className="mb-0 text-body">
                            Task{" "}
                            <a href="">
                              <u>Complete 5 Games</u>
                            </a>{" "}
                            is overdue.
                          </p>
                        </div>
                        <div className="col-auto">
                          <span className="text-muted fs-6">1 day</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-0 pt-0 border-0 pb-6 list-group-item">
                      <div className="position-relative row">
                        <div className="col-auto">
                          <div className="icon-shape icon-md bg-light-primary text-primary rounded-circle">
                            <i className="fe fe-check" />
                          </div>
                        </div>
                        <div className="ms-n3 col">
                          <h4 className="mb-0 h5">Goal Completed</h4>
                          <p className="mb-0 text-body">
                            Achievement{" "}
                            <a href="">
                              <u>Reach for the Stars</u>
                            </a>{" "}
                            unlocked! Good job!
                          </p>
                        </div>
                        <div className="col-auto">
                          <span className="text-muted fs-6">1 day</span>
                        </div>
                      </div>
                    </div>
                    <div className="px-0 pt-0 border-0 pb-0 list-group-item">
                      <div className="position-relative row">
                        <div className="col-auto">
                          <div className="icon-shape icon-md bg-light-primary text-primary rounded-circle">
                            <i className="fe fe-mail" />
                          </div>
                        </div>
                        <div className="ms-n3 col">
                          <h4 className="mb-0 h5">New Message</h4>
                          <p className="mb-0 text-body">
                            Kristin sent you a new message.
                          </p>
                        </div>
                        <div className="col-auto">
                          <span className="text-muted fs-6">2 days</span>
                        </div>
                      </div>
                    </div>
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

export default ZoneGroupOverview;

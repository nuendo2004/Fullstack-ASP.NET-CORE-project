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

function ZoneGroupSummary() {
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
                  <a
                    className="nav-link mb-sm-3 mb-md-0 "
                    href="/zonegroupview/team"
                  >
                    Team
                  </a>
                </li>
                <li className=" mx-3 nav-item">
                  <a className="nav-link mb-sm-3 mb-md-0 active" href="">
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
            <div className="mb-4 mb-xl-0 col-xl-6 col-12">
              <div className="card mb-4">
                <div className="card-header border-primary bg-light-purple">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="mb-0 fw-bolder">Group Description</h4>
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
                          <path d="M0 13C0 6.373 5.373 1 12 1s12 5.373 12 12v8.657a.75.75 0 01-1.5 0V13c0-5.799-4.701-10.5-10.5-10.5S1.5 7.201 1.5 13v8.657a.75.75 0 01-1.5 0V13z"></path>
                          <path d="M8 19.75a.75.75 0 01.75-.75h6.5a.75.75 0 010 1.5h-6.5a.75.75 0 01-.75-.75z"></path>
                          <path d="M5.25 9.5a1.75 1.75 0 00-1.75 1.75v3.5c0 .966.784 1.75 1.75 1.75h13.5a1.75 1.75 0 001.75-1.75v-3.5a1.75 1.75 0 00-1.75-1.75H5.25zm.22 1.47a.75.75 0 011.06 0L9 13.44l2.47-2.47a.75.75 0 011.06 0L15 13.44l2.47-2.47a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0L12 12.56l-2.47 2.47a.75.75 0 01-1.06 0l-3-3a.75.75 0 010-1.06z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p>
                    Cybersecurity awareness training often teaches response
                    procedures for addressing and managing risks to computer
                    systems. Teams can learn how to identify threats like cyber
                    attacks, data hacks and phishing activities, along with the
                    protocols for assessing the risk level, reporting the
                    incident and fixing the issue.{" "}
                    <span className="fw-bolder">
                      Learn Cybersecurity in a fun and{" "}
                      <span className="fst-italic">Immersed</span> way!
                    </span>
                  </p>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header border-primary bg-light-purple">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="mb-0 fw-bolder">Group Rules</h4>
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
                          <path d="M2.828 4.328C5.26 1.896 9.5 1.881 11.935 4.317c.024.024.046.05.067.076 1.391-1.078 2.993-1.886 4.777-1.89a6.216 6.216 0 014.424 1.825c.559.56 1.023 1.165 1.34 1.922.318.756.47 1.617.468 2.663 0 2.972-2.047 5.808-4.269 8.074-2.098 2.14-4.507 3.924-5.974 5.009l-.311.23a.752.752 0 01-.897 0l-.312-.23c-1.466-1.085-3.875-2.869-5.973-5.009-2.22-2.263-4.264-5.095-4.27-8.063v.012-.024.012a6.217 6.217 0 011.823-4.596zm8.033 1.042c-1.846-1.834-5.124-1.823-6.969.022a4.713 4.713 0 00-1.382 3.52c0 2.332 1.65 4.79 3.839 7.022 1.947 1.986 4.184 3.66 5.66 4.752a79.983 79.983 0 002.159-1.645l-2.14-1.974a.752.752 0 011.02-1.106l2.295 2.118c.616-.52 1.242-1.08 1.85-1.672l-2.16-1.992a.752.752 0 011.021-1.106l2.188 2.02a18.992 18.992 0 001.528-1.877l-.585-.586-1.651-1.652c-1.078-1.074-2.837-1.055-3.935.043-.379.38-.76.758-1.132 1.126-1.14 1.124-2.96 1.077-4.07-.043-.489-.495-.98-.988-1.475-1.482a.752.752 0 01-.04-1.019c.234-.276.483-.576.745-.893.928-1.12 2.023-2.442 3.234-3.576zm9.725 6.77c.579-1.08.92-2.167.92-3.228.002-.899-.128-1.552-.35-2.08-.22-.526-.551-.974-1.017-1.44a4.71 4.71 0 00-3.356-1.384c-1.66.004-3.25.951-4.77 2.346-1.18 1.084-2.233 2.353-3.188 3.506l-.351.423c.331.332.663.664.993.998a1.375 1.375 0 001.943.03c.37-.365.748-.74 1.125-1.118 1.662-1.663 4.373-1.726 6.06-.045.56.558 1.12 1.12 1.658 1.658l.333.334z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <ul className="list-unstyled">
                    <li className=" ">
                      - Take responsibility for your learning and behavior by
                      being respectful to the teachers, assistants, and your
                      classmates.
                    </li>
                    <li className="pt-2">- Always remember your manners.</li>
                    <li className=" pt-2">
                      - Communicate with peers and those in authority with
                      respect and consideration, and assume responsibility for
                      your own behavior and speech.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header border-primary bg-light-purple">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="mb-0 fw-bolder">Space Invader Rules</h4>
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
                    <span className="fw-bolder">Basic gameplay:</span> The
                    player controls the cannon at the bottom of the screen,
                    which can move only horizontally. The aliens moves both
                    horizontally and vertically (approaching the cannon). The
                    cannon can be controlled to shoot laser to destroy the
                    aliens, while the aliens will randomly shoot towards the
                    cannon. If an alien is shot by the cannon, it is destroyed;
                    if the cannon is shot, one life is lost. However, the
                    position of the aliens will not be reset if the cannon is
                    lost. The initial number of lives is three.
                  </p>
                  <p>
                    <span className="fw-bolder">Alien behavior:</span> The
                    aliens are aligned in a rectangular formation, floating
                    slowly in horizontal direction. As the formation reaches one
                    side, the aliens approach the bottom by a certain amount and
                    start floating in the opposite horizontal direction. The
                    aliens moves faster and faster as they come closer to the
                    bottom. Any column of the alien may shoot a laser towards
                    the cannon at a random time.
                  </p>
                  <p>
                    <span className="fw-bolder">Scores:</span> Each eliminated
                    alien is worth 10 pts.
                  </p>
                  <p>
                    <span className="fw-bolder">Completing a level:</span> When
                    all aliens are eliminated, the level is completed and a
                    congratulation screen is displayed within the playfield. If
                    the player{"'"}s score is higher than the stored high score,
                    the new high score is stored. No signature (i.e. record
                    holder name) is needed for the high score. After the player
                    hits any key, the game is reset to the title screen.
                  </p>
                  <p>
                    <span className="fw-bolder">Game over:</span> When all lives
                    have been lost, or the aliens have reached a certain
                    vertical position (successfully invaded the planet), the
                    game ends and a game over screen is shown in the playfield.
                    If the player{"'"}s score is higher than the stored high
                    score, the new high score is stored. After the player hits
                    any key, the game is reset to the title screen.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-6 col-12">
              <div className="mb-4 card">
                <div className="py-3 card-header border-primary">
                  <h4 className="card-title fw-bolder">Captain</h4>
                  <div className="d-flex align-items-center">
                    <img
                      src="https://geeks-react.netlify.app/static/media/avatar-4.d0ed62998b9d77c2bac7.jpg"
                      alt=""
                      className="avatar-md avatar rounded-circle"
                    />
                    <div className="ms-3">
                      <h4 className="mb-0">
                        Rick Sanchez{" "}
                        <small className="text-muted ">(Admin)</small>
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="border-top py-3 card-body">
                  <h4 className="card-title fw-bolder">Crewmates</h4>
                  <div className="d-flex align-items-center">
                    <span className="avatar avatar-sm me-1  me-2">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-15.89d2fc9cd5570f7f110c.jpg"
                        className="mb-2 mb-lg-0 rounded-circle"
                        alt="..."
                      />
                    </span>
                    <span className="avatar avatar-sm me-1  me-2">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-6.3905522d6589ed6dfcf0.jpg"
                        className="mb-2 mb-lg-0 rounded-circle"
                        alt="..."
                      />
                    </span>
                    <span className="avatar avatar-sm me-1  me-2">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-1.d2fd9642fd3628734b27.jpg"
                        className="mb-2 mb-lg-0 rounded-circle"
                        alt="..."
                      />
                    </span>
                    <span className="avatar avatar-sm me-1  me-2">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-7.34daf83d575c235d5d20.jpg"
                        className="mb-2 mb-lg-0 rounded-circle"
                        alt="..."
                      />
                    </span>
                    <span className="avatar avatar-sm me-1  me-2">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-18.9aa0c6a0f9f1aeb68ca9.jpg"
                        className="mb-2 mb-lg-0 rounded-circle"
                        alt="..."
                      />
                    </span>
                    <span className="avatar avatar-sm me-1  me-2">
                      <img
                        src="https://geeks-react.netlify.app/static/media/avatar-5.991ead30c8a647a4c57f.jpg"
                        className="mb-2 mb-lg-0 rounded-circle"
                        alt="..."
                      />
                    </span>
                    <a
                      className="btn btn-icon btn-white border border-2 rounded-circle btn-dashed ms-2"
                      href="/zonegroupview/team"
                    >
                      +
                    </a>
                  </div>
                </div>
              </div>

              <div className="mb-4 card">
                <div className="py-3 card-body">
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
                      <div>
                        <p className="text-dark mb-0 fw-semi-bold">C121</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-top py-3 card-body">
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
                        <h5 className="mb-0 text-body">Quarter</h5>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p className="text-dark mb-0 fw-semi-bold">2</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-top py-3 card-body">
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
                      <div>
                        <p className="text-dark mb-0 fw-semi-bold">26 Days</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-top py-3 card-body">
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
                        <h5 className="mb-0 text-body">Total Games Played</h5>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p className="text-dark mb-0 fw-semi-bold">318</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-top py-3 card-body">
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
                      <div>
                        <p className="text-dark mb-0 fw-semi-bold">167</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-top py-3 card-body">
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
                        <h5 className="mb-0 text-body">Security Incidents</h5>
                      </div>
                    </div>
                    <div>
                      <div>
                        <p className="text-dark mb-0 fw-semi-bold">3</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-3 card">
                <div className="card-body">
                  <h4 className="mb-3 fw-bolder">Weekly Goal</h4>
                  <div
                    className="progress-tooltip progress"
                    style={{ height: 6 }}
                  >
                    <div
                      role="progressbar"
                      className="progress-bar"
                      aria-valuenow={50}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      style={{ width: "61%" }}
                    >
                      <span className="visually-hidden">61%</span>
                    </div>
                    <div className="progress-bar">
                      <span>61%</span>
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

export default ZoneGroupSummary;

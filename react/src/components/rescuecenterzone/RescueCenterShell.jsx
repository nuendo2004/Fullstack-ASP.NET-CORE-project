import React from "react";
import { Col, Row, Tab, Nav, NavDropdown } from "react-bootstrap";
import RescueOverview from "./RescueOverview";
import SecurityTips from "./SecurityTips";
import RescueCenterReportForm from "./RescueCenterReportForm";
import AccountRecoveryForm from "./AccountRecoveryForm";
import HowToCreatePassword from "./HowToCreatePassword";
import HowToPhishingAttack from "./HowToPhishingAttack";
import HowToRecoverAccount from "./HowToRecoverAccount";
import { PropTypes } from "prop-types";
import debug from "sabio-debug";
import ZoneLogger from "components/zonetracker/ZoneLogger";

const _logger = debug.extend("RescueCenterShell");

function RescueCenterShell(props) {
  _logger("props", props);

  return (
    <>
      <ZoneLogger
        entityType={"trainee"}
        entityId={props.currentUser.currentTraineeId}
        zoneId={5}
      />
      <Row>
        <Col lg={12} md={12} xs={12} className="mb-2">
          <div
            className="d-lg-flex
                align-items-center justify-content-between"
          >
            <div className="mb-2 mb-lg-0">
              <h1 className="mb-0 display-4 fw-bold">Rescue Center Zone</h1>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={12} md={12} sm={12}>
          <Tab.Container defaultActiveKey="overview">
            <Nav className="nav-lb-tab">
              <Nav.Item>
                <Nav.Link eventKey="overview" className="mb-sm-3 mb-md-0">
                  Overview
                </Nav.Link>
              </Nav.Item>
              <NavDropdown title="How To..." className="mb-sm-3 mb-md-0">
                <NavDropdown.Item eventKey="actionOne">
                  Create a Secure Password
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="actionTwo">
                  Avoid a Phising Scam
                </NavDropdown.Item>
                <NavDropdown.Item eventKey="actionThree">
                  Recover Your Account
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Item>
                <Nav.Link eventKey="securityTips" className="mb-sm-3 mb-md-0">
                  Security Tips
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="reportMaliciousAct"
                  className="mb-sm-3 mb-md-0"
                >
                  Report a Security Event
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="recoverAccount" className="mb-sm-3 mb-md-0">
                  Recover My Account
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              <Tab.Pane eventKey="overview" className="pb-4">
                <RescueOverview />
              </Tab.Pane>
              <Tab.Pane eventKey="actionOne" className="pb-4">
                <HowToCreatePassword />
              </Tab.Pane>
              <Tab.Pane eventKey="actionTwo" className="pb-4">
                <HowToPhishingAttack />
              </Tab.Pane>
              <Tab.Pane eventKey="actionThree" className="pb-4">
                <HowToRecoverAccount />
              </Tab.Pane>
              <Tab.Pane eventKey="securityTips" className="pb-4">
                <SecurityTips />
              </Tab.Pane>
              <Tab.Pane eventKey="reportMaliciousAct" className="pb-4">
                <RescueCenterReportForm
                  currentUser={props.currentUser}
                ></RescueCenterReportForm>
              </Tab.Pane>
              <Tab.Pane eventKey="recoverAccount" className="pb-4">
                <AccountRecoveryForm
                  currentUser={props.currentUser}
                ></AccountRecoveryForm>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </>
  );
}

RescueCenterShell.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool,
    roles: PropTypes.arrayOf(PropTypes.string),
    currentOrgId: PropTypes.number,
    currentTraineeId: PropTypes.number.isRequired,
  }),
};

export default RescueCenterShell;

import React, { Fragment, useEffect, useState } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import PropTypes from "prop-types";
import toastr from "toastr";
import "./internalanalytics.css";
import analyticsService from "services/analyticsService";
import demoAccountsService from "services/demoAccountsService";
import inviteMemberService from "services/inviteMembersService";
import organizationsService from "services/organizationService";
import securityEventsService from "services/securityEventsService";
import stripeService from "services/stripeService";
import userService from "services/userService";
import ActiveDemoChart from "./ActiveDemoChart";
import OrgHacksChart from "./OrgHacksChart";
import OrganizationsChart from "./OrganizationsChart";
import UsersAnalytics from "./UsersAnalytics";
import debug from "sabio-debug";
import RevenueChart from "./RevenueChart";
import Stats from "./Stats";
import { getSelectYearsOptions } from "./internalFunctions";
import StoryApprovalList from "./StoryApprovalList";
const _logger = debug.extend("InternalAnalytics");

const InternalAnalytics = (props) => {
  _logger("props", props);

  useEffect(() => {
    getActiveDemoAccts();
    getOrgTotalTrainees();
    getOrgTotalUsers();
    getPendingUsersOverTime();
    getSecurityEventsOrgs();
    getStats();
    getTotalRevenue();
    getUserStatusOverTime();
    getUserStatusTotals();

    setYearOption(getSelectYearsOptions(3)[2].value);
  }, []);

  //#region | getActiveDemoAccts
  //Gets the active demo accounts by each week, based on their start date, for the most recent 8 weeks 
  const [activeDemoAccounts, setActiveDemoAccounts] = useState([]);

  const getActiveDemoAccts = () => {
    demoAccountsService
      .getActive()
      .then(onGetActiveDemoAcctsSuccess)
      .catch(onGetActiveDemoAcctsError);
  };

  const onGetActiveDemoAcctsSuccess = (response) => {
    _logger("onGetActiveDemoAcctsSuccess", response);
    let activeDemoAccts = response.items;

    setActiveDemoAccounts((prevState) => {
      let newState = { ...prevState };
      newState = activeDemoAccts;
      return newState;
    });
  };

  const onGetActiveDemoAcctsError = (response) => {
    _logger("onGetActiveDemoAcctsError", response);
    toastr.error("Failed to get active demo accounts.", "Error");
  };
  //#endregion

  //#region | getOrgTotalTrainees
  //Gets the total amount of trainees for each organization with the name of the organization
  const [totalTraineesByOrg, setTotalTraineesByOrg] = useState({
    dataArray: [],
    chartName: "Trainees",
  });

  const getOrgTotalTrainees = () => {
    organizationsService
      .getTotalTrainees()
      .then(onOrgTotalTraineesSuccess)
      .catch(onOrgTotalTraineesError);
  };

  const onOrgTotalTraineesSuccess = (response) => {
    _logger("onOrgTotalTraineesSuccess", response);
    let orgTotalTrainees = response.items;

    setTotalTraineesByOrg((prevState) => {
      let newState = { ...prevState };
      newState.dataArray = orgTotalTrainees;
      return newState;
    });
  };

  const onOrgTotalTraineesError = (response) => {
    _logger("onOrgTotalTraineesError", response);
    toastr.error("Failed to get total trainees per organization.", "Error");
  };
  //#endregion

  //#region | getOrgTotalUsers
  //Gets the total amount of users for each organization with the name of the organization
  const [totalUsersByOrg, setTotalUsersByOrg] = useState({
    dataArray: [],
    chartName: "Users",
  });

  const getOrgTotalUsers = () => {
    organizationsService
      .getTotalUsers()
      .then(onOrgTotalUsersSuccess)
      .catch(onOrgTotalUsersError);
  };

  const onOrgTotalUsersSuccess = (response) => {
    _logger("onOrgTotalUsersSuccess", response);
    let orgTotalUsers = response.items;

    setTotalUsersByOrg((prevState) => {
      let newState = { ...prevState };
      newState.dataArray = orgTotalUsers;
      return newState;
    });
  };

  const onOrgTotalUsersError = (response) => {
    _logger("onOrgTotalUsersError", response);
    toastr.error("Failed to get total users per organization.", "Error");
  };
  //#endregion

  //#region | getPendingUsersOverTime
  // Gets the total amount of pending users over time from the InviteMembers table
  const [pendingUsersOverTime, setPendingUsersOverTime] = useState([]);

  const getPendingUsersOverTime = () => {
    inviteMemberService
      .getPendingOverTime()
      .then(onGetPendingOverTimeSuccess)
      .catch(onGetPendingOverTimeError);
  };

  const onGetPendingOverTimeSuccess = (response) => {
    _logger("onGetPendingOverTimeSuccess", response);
    let pendingOverTime = response.items;

    setPendingUsersOverTime((prevState) => {
      let newState = { ...prevState };
      newState = pendingOverTime;
      return newState;
    });
  };

  const onGetPendingOverTimeError = (response) => {
    _logger("onGetStatusOverTimeError", response);
    toastr.error("Failed to get pending users over time.", "Error");
  };
  //#endregion

  //#region | getSecurityEventsOrgs
  // Gets the Organizations that have security events
  const [securityEventsOrgs, setSecurityEventsOrgs] = useState([]);

  const getSecurityEventsOrgs = () => {
    securityEventsService
      .getOrganizations(["SecurityEventsOrgs"])
      .then(onGetSecEvtsOrgsSuccess)
      .catch(onGetSecEvtsOrgsError);
  };

  const onGetSecEvtsOrgsSuccess = (response) => {
    _logger("onGetSecEvtsSuccess", response);
    let secEvtsOrgs = response.item.securityEventsOrgs;

    setSecurityEventsOrgs((prevState) => {
      let newState = { ...prevState };
      newState = secEvtsOrgs;
      return newState;
    });
  };

  const onGetSecEvtsOrgsError = (response) => {
    _logger("onGetSecEvtsOrgsError", response);
    toastr.error(
      "Failed to get organizations that have security events.",
      "Error"
    );
  };
  //#endregion

  //#region | getStats
  // Gets Total Orgs, Active Orgs, Demo Accounts 60 Days, Active Subscriptions stats
  const [variousStats, setVariousStats] = useState({
    totalOrgs: 0,
    activeOrgs: 0,
    demo60Days: 0,
    activeSubs: 0,
  });

  const getStats = () => {
    analyticsService.getStats().then(onGetStatsSuccess).catch(onGetStatsError);
  };

  const onGetStatsSuccess = (response) => {
    _logger("onGetStatsSuccess", response);
    let statsData = response.item;

    setVariousStats((prevState) => {
      const newState = { ...prevState };
      newState.totalOrgs = statsData.totalOrgs;
      newState.activeOrgs = statsData.activeOrgs;
      newState.demo60Days = statsData.demoAccounts60Days;
      newState.activeSubs = statsData.activeSubscriptions;
      return newState;
    });
  };

  const onGetStatsError = (response) => {
    _logger("onGetStatsError", response);
    toastr.error("Failed to get stats.", "Error");
  };
  //#endregion

  //#region | getTotalRevenue
  // Gets the total revenue from the SubscriptionTransactions table, uses StripeApiController 
  const [totalRevenueOverTime, setTotalRevenueOverTime] = useState({
    byWeek: [],
    byMonth: [],
    byYear: [],
  });

  const getTotalRevenue = () => {
    stripeService
      .getTotalRevenue()
      .then(onGetTotalRevenueSuccess)
      .catch(onGetTotalRevenueError);
  };

  const onGetTotalRevenueSuccess = (response) => {
    _logger("onGetTotalRevenueSuccess", response);

    setTotalRevenueOverTime((prevState) => {
      let newState = { ...prevState };
      newState.byWeek = response.items[0];
      newState.byMonth = response.items[1];
      newState.byYear = response.items[2];
      return newState;
    });
  };

  const onGetTotalRevenueError = (response) => {
    _logger("onGetTotalRevenueError", response);
    toastr.error("Failed to get total revenue over time.", "Error");
  };
  //#endregion

  //#region | getUserStatusOverTime
  // Gets the total amount of users based on status over time 
  const [userStatusOverTime, setUserStatusOverTime] = useState([]);

  const getUserStatusOverTime = () => {
    userService
      .getStatusOverTime()
      .then(onGetStatusOverTimeSuccess)
      .catch(onGetStatusOverTimeError);
  };

  const onGetStatusOverTimeSuccess = (response) => {
    _logger("onGetStatusOverTimeSuccess", response);
    let statusOverTime = response.items;

    setUserStatusOverTime((prevState) => {
      let newState = { ...prevState };
      newState = statusOverTime;
      return newState;
    });
  };

  const onGetStatusOverTimeError = (response) => {
    _logger("onGetStatusOverTimeError", response);
    toastr.error("Failed to get users' status over time.", "Error");
  };
  //#endregion

  //#region | getUserStatusTotals
  //Gets the total amount of users for each status type
  const [userStatusStats, setUserStatusStats] = useState({
    active: 0,
    inactive: 0,
    pending: 0,
    flagged: 0,
    removed: 0,
    total: 0,
  });

  const getUserStatusTotals = () => {
    userService
      .getStatusTotals()
      .then(onGetStatusTotalsSuccess)
      .catch(onGetStatusTotalsError);
  };

  const onGetStatusTotalsSuccess = (response) => {
    _logger("onGetUsersStatusSuccess", response);
    let statusData = response.item;

    setUserStatusStats((prevState) => {
      const data = { ...prevState };
      data.active = statusData.active;
      data.inactive = statusData.inactive;
      data.pending = statusData.pending;
      data.flagged = statusData.flagged;
      data.removed = statusData.removed;
      data.total = statusData.total;
      return data;
    });
  };

  const onGetStatusTotalsError = (response) => {
    _logger("onGetUsersStatusError", response);
    toastr.error("Failed to get users' status stats.", "Error");
  };
  //#endregion

  //#region | selectYear
  const [yearOption, setYearOption] = useState();
  const onYearChange = (e) => {
    setYearOption(e.value);
  };
  //#endregion

  return (
    <Fragment>
      {
        //#region | Header
      }
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="internal-analytics-dashboard-container border-bottom">
            <img
              className="internal-analytics-company-logo-header"
              src="https://immersed.azurewebsites.net/static/media/immersed-spiral-logo.945b933952a68451d87a.png"
              alt="Immersed Logo"
            />
            <h1 className="internal-analytics-dashboard-header">Analytics</h1>
            <Badge bg="warning">Warnings</Badge>
          </div>
        </Col>
      </Row>
      {
        //#endregion
      }

      {
        //#region | Links
      }
      <Container fluid className="pb-3">
        <div className="card">
          <ul className="nav nav-tabs nav-fill">
            <li className="nav-item">
              <Link to="/zones">
                <button type="button" className="nav-link">
                  Zone Management
                </button>
              </Link>
            </li>
            <li className="nav-item">
              <button type="button" className="nav-link">
                User Management
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="nav-link">
                Subscription Management
              </button>
            </li>
            <li className="nav-item">
              <button type="button" className="nav-link">
                Red Cell
              </button>
            </li>
          </ul>
        </div>
      </Container>
      {
        //#endregion
      }

      {
        //#region | Data Charts
      }
      <Container fluid>
        <Row className="mb-2 flex-row-reverse">
          <Col xs={4} sm={3} md={2} lg={2} xl={1}>
            <Select
              defaultValue={getSelectYearsOptions(3)[2]}
              options={getSelectYearsOptions(3)}
              onChange={onYearChange}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  width: "100px",
                }),
                option: (baseStyles) => ({
                  ...baseStyles,
                  width: "100px",
                }),
                menu: (baseStyles) => ({
                  ...baseStyles,
                  width: "100px",
                }),
              }}
            ></Select>
          </Col>
        </Row>

        <Stats stats={variousStats}></Stats>

        <UsersAnalytics
          statusData={userStatusStats}
          statusOverTime={userStatusOverTime}
          pendingOverTime={pendingUsersOverTime}
          selectedYear={yearOption}
        ></UsersAnalytics>

        <Row>
          <OrganizationsChart orgData={totalUsersByOrg}></OrganizationsChart>
          <OrganizationsChart orgData={totalTraineesByOrg}></OrganizationsChart>
        </Row>

        <Row>
          <ActiveDemoChart demoData={activeDemoAccounts}></ActiveDemoChart>
          <RevenueChart
            revenue={totalRevenueOverTime}
            selectedYear={yearOption}
          ></RevenueChart>
        </Row>

        <OrgHacksChart
          secEvtsOrgs={securityEventsOrgs}
          selectedYear={yearOption}
        ></OrgHacksChart>
        {props.currentUser?.roles?.includes("SysAdmin") && (
          <StoryApprovalList></StoryApprovalList>
        )}
      </Container>
      {
        //#endregion
      }
    </Fragment>
  );
};

InternalAnalytics.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    avatarUrl: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default InternalAnalytics;

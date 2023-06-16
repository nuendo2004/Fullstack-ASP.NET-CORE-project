import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { Col, Row, Image, Card, Dropdown  } from "react-bootstrap";
import { Link } from "react-router-dom";
import organizationsService from "services/organizationService";
import orgAdminService from "services/orgAdminService";
import logger from "sabio-debug";
import StatRightIcon from "./StatRightIcon";
import ApexCharts from "./ApexCharts";
import ReactCardFlip from "react-card-flip";
import {
  TrafficChannelChartSeries,
  TrafficChannelChartOptions,
  //EarningsChartSeries,
  //EarningsChartOptions,
  EmployeeChartSeries,
  EmployeeChartOptions,
  TraineeChartSeries,
  TraineeChartOptions,
} from "./ChartData";
import SchedulesList from "./SchedulesList";
import RecentBlogs from "./RecentBlogs";
import RecentNewsletters from "./RecentNewsletters";
import toastr from "toastr";

const _logger = logger.extend("Analytics");

const organization = {
  orgId: "",
  orgLogo: "",
  name: "",
  orgType: "",
  employeeCount: "",
  traineeCount: "",
};

const blogData = [];

const trainingSchedule = [];

const Analytics = (props) => {
  const user = props.currentUser;

  let [currentOrg, setCurrentOrg] = useState({
    ...organization,
  });

  let [blog, setBlog] = useState(() => {
    return blogData;
  });

  let [schedule, setSchedule] = useState(() => {
    return trainingSchedule;
  });

  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    getOrganization();
  }, []);

  useEffect(() => {
    if (currentOrg?.orgId) {
      getOrganizationData();
    }
  }, [currentOrg?.orgId, isDeleted]);

  const getOrganization = () => {
    organizationsService
      .getById(user.currentOrgId)
      .then(onGetOrganizationSuccess)
      .catch(onGetOrganizationFail);
  };

  const getOrganizationData = () => {
    const orgId = currentOrg.orgId;
    const numberSelection = 2;
    orgAdminService
      .getOrgAdminData(orgId, numberSelection)
      .then(onGetOrganizationDataSuccess)
      .catch(onGetOrganizationDataFail);
  };

  const onGetOrganizationSuccess = (response) => {
    _logger("getOrganization success", response);
    setCurrentOrg((prevState) => {
      let orgInfo = { ...prevState };
      orgInfo.orgId = response.item.id;
      orgInfo.orgLogo = response.item.logoUrl;
      orgInfo.name = response.item.name;
      orgInfo.orgType = response.item.organizationType.name;
      return orgInfo;
    });
  };
  const onGetOrganizationDataSuccess = (response) => {
    _logger("getOrganizationData success", response);
    setCurrentOrg((prevState) => {
      let orgData = { ...prevState };
      orgData.employeeCount = response.item.employeeCount;
      orgData.traineeCount = response.item.traineeCount;
      return orgData;
    });
    setBlog((prevState) => {
      let blogInfo = { ...prevState };
      blogInfo = response.item.blogs;
      return blogInfo;
    });
    setSchedule((prevState) => {
      let scheduleInfo = { ...prevState };
      scheduleInfo = response.item.trainings;
      return scheduleInfo;
    });
    setIsDeleted(false);
  };

  const onGetOrganizationFail = (error) => {
    _logger("getOrganization fail", error);
    toastr.error("Could not find organization");
  };

  const onGetOrganizationDataFail = (error) => {
    _logger("getOrganizationData fail", error);
    toastr.error("Could not find organization data");
  };

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <Link
      to=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
    </Link>
  ));

  
  const [flip, setFlip] = useState(false);
  const onCardClick = () => {
    setFlip((prevState) => {
      return { flipped: !prevState.flipped };
    });
  };

  const ChartActionMenu = () => {
    return (
      <div>
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle}>
            <i className="fe fe-more-vertical text-muted"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu align="end">
            <Dropdown.Header>SETTINGS</Dropdown.Header>
            <Dropdown.Item eventKey="1">
              <i className="fe fe-external-link dropdown-item-icon "></i> Export
            </Dropdown.Item>
            <Dropdown.Item eventKey="2">
              <i className="fe fe-mail dropdown-item-icon "></i> Email Report
            </Dropdown.Item>
            <Dropdown.Item eventKey="3">
              <i className="fe fe-download dropdown-item-icon "></i> Download
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  return (
    <Fragment>
      <Row className="align-items-center, mb-3 mt-1">
        <Col xl={12} lg={12} md={12} sm={12}>
          <div className="d-flex align-items-end justify-content-between bg-white px-4 pt-2 pb-4 rounded-none rounded-bottom-md shadow-sm">
            <div className="d-flex align-items-center">
              <div className="me-2 position-relative d-flex justify-content-end align-items-end mt-n5">
                <Image
                  src={currentOrg.orgLogo}
                  className="avatar-xl rounded-circle border border-4 border-white position-relative"
                  alt="avatar"
                />
              </div>
              <div className="lh-1">
                <h2 className="mb-0">{currentOrg.name}</h2>
                <p className="mb-0 d-block">{currentOrg.orgType}</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col lg={12} md={12} sm={12} xl={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex justify-content-between align-items-center">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-0 h2 fw-bold">Dashboard</h1>
            </div>
          </div>
        </Col>
      </Row>
        <Row className="ms-0 px-0">
          <Col xl={3} lg={6} md={12} sm={12}>
            <StatRightIcon
              title="EMPLOYEES"
              value={66} //{currentOrg.employeeCount}
              iconName="user-check"
              iconColorVariant="primary"
              classValue="mb-4"
              summary="Employees"
              summaryValue="+12"
              summaryIcon="up"
              showSummaryIcon="true"
            />
          </Col>
          <Col xl={3} lg={6} md={12} sm={12}>
            <StatRightIcon
              title="TRAINEES"
              value={75} //{currentOrg.traineeCount}
              summary="Trainees" 
              summaryValue="-23"
              summaryIcon="down"
              showSummaryIcon="true"
              iconName="users"
              iconColorVariant="primary"
              classValue="mb-4"
            />
          </Col>
          <Col xl={3} lg={6} md={12} sm={12}>
            <StatRightIcon
              title="SCHEDULES"
              value={schedule?.length}
              summary="Pending Schedules"
              summaryValue="+3"
              summaryIcon="up"
              iconName="book-open"
              iconColorVariant="primary"
              classValue="mb-4"
              showSummaryIcon="true"
            />
          </Col>
          <Col xl={3} lg={6} md={12} sm={12}>
            <StatRightIcon
              title="TRAFFIC" 
              value={"150 visits"} 
              summary="Decrease"
              summaryValue="-10%"
              summaryIcon="down"
              showSummaryIcon="true"
              iconName="bar-chart"
              iconColorVariant="primary"
              classValue="mb-4"
            />
          </Col>
       </Row>
       <Row className="ms-0 px-0">
       <Col xl={8} lg={12} md={12} className="mb-4">

        <ReactCardFlip isFlipped={flip.flipped} flipDirection="vertical" containerStyle={Col-8}>
              <Card onClick={onCardClick}>
                <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                    <div>
                      <h4 className="mb-0">Employees by Role and Month</h4>
                    </div>
                    <div>
                      <ChartActionMenu />
                    </div>
                </Card.Header>
                <Card.Body>
                    <ApexCharts
                      options={EmployeeChartOptions}
                      series={EmployeeChartSeries} //EarningsChartSeries here originally
                      type="line"
                    />
                </Card.Body>
              </Card>
        
            <Card onClick={onCardClick}>
            <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                  <div>
                    <h4 className="mb-0">Active Trainees</h4>
                  </div>
                  <div>
                    <ChartActionMenu />
                  </div>
                </Card.Header>
                <Card.Body>
                  <ApexCharts
                    options={TraineeChartOptions} 
                    series={TraineeChartSeries}
                    type="bar"
                  />
                </Card.Body>
            </Card>
          </ReactCardFlip>
          </Col> 
         <Col xl={4} lg={4} md={4} className="mb-4">
            <Card>
              <Card.Header className="align-items-center card-header-height d-flex justify-content-between align-items-center">
                <div>
                  <h4 className="mb-0">Traffic</h4>
                </div>
                <div>
                  <ChartActionMenu />
                </div>
              </Card.Header>
              <Card.Body className="py-lg-7">
                <div id="chart">
                  <ApexCharts
                    options={TrafficChannelChartOptions}
                    series={TrafficChannelChartSeries}
                    type="donut"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="ms-0 px-0">
        <Col xl={4} lg={6} md={12} className="mb-4">
          <SchedulesList
            title="Schedules"
            scheduleData={schedule}
            setIsDeleted={setIsDeleted}
          />
        </Col>
        <Col xl={4} lg={6} md={12} className="mb-4">
          <RecentBlogs title="Recent Blogs" blogData={blog} />
        </Col>
        <Col xl={4} lg={6} md={12} className="mb-4">
          <RecentNewsletters title="Recent Newsletters" />
        </Col>
      </Row>
      </Fragment>
  );
};

Analytics.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    currentOrgId: PropTypes.number.isRequired,
  }),
  children: PropTypes.func,
  onClick: PropTypes.func,
};

export default Analytics;

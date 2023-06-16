import React, { useState, useEffect } from "react";
import {
  ButtonGroup,
  Col,
  Card,
  DropdownButton,
  Dropdown,
  Form,
  Row,
  Table,
  Tab,
} from "react-bootstrap";
import debug from "sabio-debug";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import TableLog from "./TableLog";
import accessLogsService from "../../services/accessLogsService";
import "./accesslogs.css";
import toastr from "toastr";
import lookUpService from "services/lookUpService";

const _logger = debug.extend("AccessLog");

let entityAccessTypes = ["entityTypes", "accessStatus"];

const AccessLogs = () => {
  const [data, setData] = useState({
    arrayOfAllAccessLogs: [],
    accessLogsComponents: [],
    accessLogsFilters: [],
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
    initialIndex: 0,
  });


  
  const [search, setSearch] = useState("");

  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const [filter, setFilter] = useState({
    entityTypeId: 0,
    accessStatusId: 0,
  });

  _logger(data.arrayOfAllAccessLogs);

  useEffect(() => {
    _logger("useEffect is firing");

    if (search !== "") {
      accessLogsService
        .searchAccessLogs(data.pageIndex, data.pageSize, search)
        .then(onSearchSuccess)
        .catch(onSearchError);
    } else if (dateRange.startDate !== "" && dateRange.endDate !== "") {
      accessLogsService
        .getAccessLogsByDate(
          data.pageIndex,
          data.pageSize,
          dateRange.startDate,
          dateRange.endDate
        )
        .then(onDateRangeSuccess)
        .catch(onDateRangeError);
    } else if (filter.entityTypeId > 0 || filter.accessStatusId > 0) {
      accessLogsService
        .getAccessLogsByEntityOrAccess(
          data.pageIndex,
          data.pageSize,
          filter.entityTypeId,
          filter.accessStatusId
        )
        .then(onGetByEntityAccessSuccess)
        .catch(onGetByEntityAccessError);
    } else {
      accessLogsService
        .getAccessLogs(data.pageIndex, data.pageSize)
        .then(onGetAccessLogsSuccess)
        .catch(onGetAccessLogsError);
    }
  }, [
    data.pageIndex,
    search,
    dateRange.startDate,
    dateRange.endDate,
    filter.entityTypeId,
    filter.accessStatusId, 
  ]);

  const [types, setTypes] = useState({
    entityType: [],
    accessStatusType: [],
  });

  useEffect(() => {
    lookUpService.LookUp(entityAccessTypes).then(onTypesSuccess).catch();
  }, []);

  const onTypesSuccess = (response) => {
    let entityTypes = response.item.entityTypes;
    let accessStatus = response.item.accessStatus;
    _logger("Types", response);
    setTypes((prevState) => {
      let mappedEntityTypes = { ...prevState };
      mappedEntityTypes.entityType = entityTypes.map(mapEntity);
      mappedEntityTypes.accessStatusType = accessStatus.map(mapEntity);
      return mappedEntityTypes;
    });
  };

  const mapEntity = (item) => {
    _logger("mapping Entity Access DropDown", item);
    return (
      <Dropdown.Item eventKey={item.id} value={item.id}>
        {item.name}
      </Dropdown.Item>
    );
  };

  const onGetAccessLogsSuccess = (response) => {
    _logger(response);
    let arrayOfAllAccessLogs = response.item.pagedItems;
    _logger({ arrayOfAllAccessLogs });

    setData((prevState) => {
      const logData = { ...prevState };
      logData.arrayOfAllAccessLogs = arrayOfAllAccessLogs;
      logData.accessLogsComponents = arrayOfAllAccessLogs.map(mapAccessLog);

      logData.pageSize = response.item.pageSize;
      logData.pageIndex = response.item.pageIndex;
      logData.totalCount = response.item.totalCount;

      return logData;
    });
  };

  const onGetAccessLogsError = (err) => {
    _logger(err);
  };

  const handleEntitySelect = (event) => {
    _logger("Selecting", event);
    const filterValue = event;

    setFilter((prevState) => {
      const newFilterObject = {
        ...prevState,
        entityTypeId: filterValue,
      };

      return newFilterObject;
    });
  };

  const handleAccessSelect = (event) => {
    _logger("Selecting", event);
    const filterValue = event;

    setFilter((prevState) => {
      const newFilterObject = {
        ...prevState,
        accessStatusId: filterValue,
      };

      return newFilterObject;
    });
  };

  const onGetByEntityAccessSuccess = (response) => {
    _logger(response);

    let accessLogsList = response.item.pagedItems;

    setData((prevState) => {
      const logData = { ...prevState };
      logData.arrayOfAllAccessLogs = accessLogsList;
      logData.accessLogsComponents = accessLogsList.map(mapAccessLog);

      logData.totalCount = response.item.totalCount;
      return logData;
    });
  };

  const onGetByEntityAccessError = (err) => {
    _logger(err);
  };

  const getSearch = (event) => {
    const search = event.target.value;
    setSearch(search);
  };

  const onSearchSuccess = (response) => {
    _logger(response);

    let accessLogsList = response.item.pagedItems;

    setData((prevState) => {
      const logData = { ...prevState };
      logData.arrayOfAllAccessLogs = accessLogsList;
      logData.accessLogsComponents = accessLogsList.map(mapAccessLog);

      logData.totalCount = response.item.totalCount;
      return logData;
    });
  };

  const onSearchError = (err) => {
    _logger(err);
  };

  const onDateRange = (event) => {
    const dateValue = event.target.value;
    const date = event.target.name;

    _logger("Choosing", date, dateValue);

    setDateRange((prevState) => {
      const newDateObject = {
        ...prevState,
      };

      newDateObject[date] = dateValue;

      return newDateObject;
    });
  };

  const onDateRangeSuccess = (response) => {
    _logger(response);

    let accessLogsList = response.item.pagedItems;

    setData((prevState) => {
      const logData = { ...prevState };
      logData.arrayOfAllAccessLogs = accessLogsList;
      logData.accessLogsComponents = accessLogsList.map(mapAccessLog);

      logData.totalCount = response.item.totalCount;
      return logData;
    });
  };

  const onDateRangeError = (err) => {
    _logger("Error with Date Range", err);
    toastr.error("Invalid Date Range Selected");
  };

  const mapAccessLog = (aLog) => {
    _logger("mapping", aLog);
    return <TableLog log={aLog} key={"List-A" + aLog.id} />;
  };

  const onPageChange = (page) => {
    setData((prevState) => {
      let pageData = { ...prevState };
      pageData.pageIndex = page - 1;

      return pageData;
    });
  };

  return (
    <React.Fragment>
      <Tab.Container>
        <Col xl={12} lg={12} md={12} sm={12} className="mb-4">
          <div className="row">
            <div className="col-sm-6">
              <div id="examples" className="mb-4 ">
                <h2>Administrative Logs</h2>
              </div>
            </div>
          </div>
        </Col>
        <Tab.Content>
          <div className="row">
            <div className="col-sm-4">
              <h4 className="access-log-text">Search</h4>
              <Form.Control
                placeholder="Search All Logs"
                type="search"
                value={search}
                name="search"
                onChange={getSearch}
              />
            </div>
            <div className="col-sm-2">
              <h4 className="access-log-text">Start Date</h4>
              <Form.Control
                type="date"
                className="form-control"
                name="startDate"
                value={dateRange.startDate}
                onChange={onDateRange}
              />
            </div>
            <div className="col-sm-2">
              <h4 className="access-log-text">End Date</h4>
              <Form.Control
                type="date"
                className="form-control"
                name="endDate"
                value={dateRange.endDate}
                onChange={onDateRange}
              />
            </div>
            <div className="col-sm-2 pb-3 vertical-container">
              <h4 className=".access-log-text-left">Filter By</h4>
              <ButtonGroup aria-label="Basic example">
                <DropdownButton
                  align="end"
                  title="Entity Type"
                  className="access-logs-button-left access-logs-button"
                  value={filter.entityTypeId}
                  onSelect={handleEntitySelect}
                >
                  <Dropdown.Item eventKey="0">No Selection</Dropdown.Item>
                  {types.entityType}
                </DropdownButton>
              </ButtonGroup>
            </div>
            <div className="col-sm-2 pb-3 access-status vertical-container">
              <h4 className=".access-log-text-right">Filter By</h4>
              <ButtonGroup aria-label="Basic example">
                <DropdownButton
                  align="end"
                  title="Access Status"
                  id="dropdown-menu-align-end"
                  className="access-logs-button-right"
                  value={filter.accessStatusId}
                  onSelect={handleAccessSelect}
                >
                  <Dropdown.Item eventKey="0">No Selection</Dropdown.Item>
                  {types.accessStatusType}
                </DropdownButton>
              </ButtonGroup>
            </div>
          </div>
        </Tab.Content>
      </Tab.Container>
      <Tab.Container defaultActiveKey="design">
        <Card>
          <Card.Body className="p-0">
            <Tab.Content>
              <Tab.Pane eventKey="design" className="pb-4 p-4">
                <Table hover responsive className="text-nowrap">
                  <thead>
                    <tr>
                      <th scope="col">Id</th>
                      <th scope="col">Entity Type</th>
                      <th scope="col">Access Type</th>
                      <th scope="col">Access Status</th>
                      <th scope="col">IP Address Port</th>
                      <th scope="col">Endpoint</th>
                      <th scope="col">Date Created</th>
                      <th scope="col">Payload</th>
                      <th scope="col">Route</th>
                      <th scope="col">Device Type</th>
                    </tr>
                  </thead>
                  <tbody>{data.accessLogsComponents}</tbody>
                </Table>
              </Tab.Pane>
              <Tab.Pane
                eventKey="react"
                className="pb-4 p-4 react-code"
              ></Tab.Pane>
            </Tab.Content>
            <Tab.Container defaultActiveKey="grid">
              <Row>
                <div className="access-logs-pagination mb-4">
                  {data.totalCount > data.pageSize && (
                    <Pagination
                      current={data.pageIndex + 1}
                      locale={locale}
                      onChange={onPageChange}
                      pageSize={data.pageSize}
                      showTitle={false}
                      total={data.totalCount} 
                    />
                  )}
                </div>
              </Row>
            </Tab.Container>
          </Card.Body>
        </Card>
      </Tab.Container>
    </React.Fragment>
  );
};

export default AccessLogs;

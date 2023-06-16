import React, { useState } from "react";
import {
  Form,
  Breadcrumb,
  Offcanvas,
  Button,
  Tab,
  Row,
  CloseButton,
} from "react-bootstrap";
import { useEffect } from "react";
import toastr from "toastr";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";

import AddZoneGroupIntegrated from "./AddZoneGroupIntegrated";
import zoneGroupService from "services/zoneGroupService";
import ZoneGroupCard from "./ZoneGroupCard";
import "../zonegroups/zonegroup.css";

import debug from "sabio-debug";
const _logger = debug.extend("ZoneView");

function ZoneGroupsView() {
  const [zoneGroupsData, setZoneGroupsData] = useState({
    zoneGroups: [],
    zoneGroupComponents: [],
    pageIndex: 0,
    pageSize: 4,
    totalCount: 0,
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [query, setQuery] = useState("");

  useEffect(() => {
    const zoneId = 56;

    if (query !== "") {
      zoneGroupService
        .searchZoneGroupByZoneId(
          zoneGroupsData.pageIndex,
          zoneGroupsData.pageSize,
          zoneId,
          query
        )
        .then(onSearchSuccess)
        .catch(onSearchError);
    } else {
      zoneGroupService
        .getZoneGroupByZoneId(
          zoneGroupsData.pageIndex,
          zoneGroupsData.pageSize,
          zoneId
        )
        .then(onGetZoneGroupsByZoneIdSuccess)
        .catch(onGetZoneGroupsByZoneIdError);
    }
  }, [zoneGroupsData.pageIndex, query]);

  const onGetZoneGroupsByZoneIdSuccess = (response) => {
    _logger(response);
    let zoneGroupList = response.item.pagedItems;

    setZoneGroupsData((prevState) => {
      const zoneGroupsData = { ...prevState };
      zoneGroupsData.zoneGroups = zoneGroupList;
      zoneGroupsData.zoneGroupComponents = zoneGroupList.map(mapZoneGroups);
      zoneGroupsData.pageIndex = response.item.pageIndex;
      zoneGroupsData.pageSize = response.item.pageSize;
      zoneGroupsData.totalCount = response.item.totalCount;

      return zoneGroupsData;
    });
  };

  const onGetZoneGroupsByZoneIdError = (error) => {
    _logger("onGetZoneGroupsByZoneIdError", error);
    toastr.error("Error: Failed to load Zone Groups", error);
  };

  const mapZoneGroups = (singleZoneGroup) => {
    return (
      <ZoneGroupCard
        zoneGroup={singleZoneGroup}
        key={singleZoneGroup.zoneGroupId}
      />
    );
  };

  const getQuery = (event) => {
    let query = event.target.value; 
    setQuery(query);
  };

  const onSearchSuccess = (response) => {
    _logger(response);

    let zoneGroupList = response.item.pagedItems;

    setZoneGroupsData((prevState) => {
      const zoneGroupsData = { ...prevState };
      zoneGroupsData.zoneGroups = zoneGroupList;
      zoneGroupsData.zoneGroupComponents = zoneGroupList.map(mapZoneGroups);
      zoneGroupsData.pageIndex = response.item.pageIndex;
      zoneGroupsData.pageSize = response.item.pageSize;
      zoneGroupsData.totalCount = response.item.totalCount;

      return zoneGroupsData;
    });
  };

  const onSearchError = (error) => {
    _logger("onSearchError", error);
    toastr.error("Error: Your search did not match any Zone Groups", error);
  };

  const onPageChange = (page) => {
    setZoneGroupsData((prevState) => {
      let pageData = { ...prevState };
      pageData.pageIndex = page - 1;

      return pageData;
    });
  };

  return (
    <React.Fragment>
      <div className="container-fluid p-4"> 
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="border-bottom pb-3 mb-4 d-md-flex align-items-center justify-content-between">
              <div className="mb-3 mb-md-0">
                <h1 className="mb-1 h2 fw-bold">Space Invaders Groups</h1>
                <Breadcrumb>
                  <Breadcrumb.Item href="/">Dashboard</Breadcrumb.Item>
                  <Breadcrumb.Item href="/zones">Zones</Breadcrumb.Item>
                  <Breadcrumb.Item href="#">Space Invaders</Breadcrumb.Item>
                  <Breadcrumb.Item active>
                    Space Invaders Groups
                  </Breadcrumb.Item>
                </Breadcrumb>
              </div>
              <div>
                <Button onClick={handleShow} className="mx-4">
                  Create a New Group
                </Button>
                <Offcanvas
                  show={show}
                  onHide={handleClose}
                  placement="end"
                  name="end"
                  style={{ width: "600px" }}
                > 
                  <Offcanvas.Header className="justify-content-end">
                    <a href="/zone/zonegroupsview">
                      <CloseButton className="btn-close" />
                    </a>
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

        <div className="row justify-content-md-between mb-4 mb-xl-0 ">
          <div className="col-xl-3 col-lg-4 col-md-6 col-12">
            <div className="mb-2 mb-lg-4">
              <Form.Control
                type="search"
                placeholder="Search Space Race Groups"
                value={query}
                onChange={getQuery}
              />
            </div>
          </div>
          <Row>{zoneGroupsData.zoneGroupComponents}</Row>
        </div>
      </div>

      <Tab.Container defaultActiveKey="grid">
        <Row>
          <div className="border-bottom pb-4 mb-4 mx-1 rounded d-flex align-items-center justify-content-between ">
            <Pagination
              showLessItems
              locale={locale}
              showTitle={false}
              current={zoneGroupsData.pageIndex + 1}
              onChange={onPageChange}
              pageSize={zoneGroupsData.pageSize}
              total={zoneGroupsData.totalCount}
              style={{ margin: "auto" }}
            />
          </div>
        </Row>
      </Tab.Container>
    </React.Fragment>
  );
}

export default ZoneGroupsView;

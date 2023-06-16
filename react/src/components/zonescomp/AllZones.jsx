import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Tab } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import toastr from "toastr";
import Swal from "sweetalert2";
import "../zonescomp/zones.css";

import AllZonesSchema from "./AllZonesSchema";
import ZoneMapper from "./ZoneMapper";

import PropTypes from "prop-types";
import lookUpService from "services/lookUpService";
import zonesService from "../../services/zonesServices";

import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";

import debug from "sabio-debug";
const _logger = debug.extend("AllZones");

const Zones = (props) => {
  const [pageData, setPageData] = useState({
    arrayOfZones: [],
    zoneComponents: [],
    pagination: {
      pageIndex: 0,
      pageSize: 8,
      totalPages: 1,
      totalCount: 0,
    },
  });

  const [selectOptionData, setSelectOptionData] = useState({
    arrayOfZoneStatuses: [],
    zoneStatusDropdownComps: [],
    arrayOfZoneTypes: [],
    zoneTypesDropdownComps: [],
  });

  const [searchFormData, setSearchFormData] = useState({
    search: "",
    includeDeleted: false,
  });

  const [dataForFilter, setDataForFilter] = useState({
    zoneTypeId: 0,
    zoneStatusId: 0,
  });

  const pageSizeOptions = [8, 12, 16, 20];
  var zoneStatus = [];

  const onFormFieldChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setSearchFormData((prevState) => {
      const newSearchFormData = { ...prevState };
      newSearchFormData[name] = value;
      return newSearchFormData;
    });
  };

  useEffect(() => {
    lookUpService
      .LookUp(["zoneStatus", "zoneTypes"])
      .then(lookUpSuccess)
      .catch(lookUpError);
  }, []);

  useEffect(() => {
    getZones();
  }, [dataForFilter, pageData.pagination.pageSize]);

  const onReset = (e) => {
    e.preventDefault();
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.pagination.pageIndex = 0;
      newState.pagination.pageSize = 8;
      return newState;
    });
    setDataForFilter(() => {
      return {
        zoneTypeId: "0",
        zoneStatusId: "0",
      };
    });
    setSearchFormData(() => {
      return {
        search: "",
        includeDeleted: false,
      };
    });
  };

  const getCallType = (zoneTypeId, zoneStatusId) => {
    let callType = 0;
    if (!zoneTypeId && zoneStatusId) callType = 1;
    else if (zoneTypeId && !zoneStatusId) callType = 2;
    else if (zoneTypeId && zoneStatusId) callType = 3;
    else callType = 4;
    return callType;
  };

  const getZones = (page) => {
    const pageIndex = page ? page - 1 : 0;
    const zoneTypeId = parseInt(dataForFilter.zoneTypeId);
    const zoneStatusId = parseInt(dataForFilter.zoneStatusId);
    _logger(
      "Inside getZones, zoneTypeId:",
      zoneTypeId,
      "zoneStatusId:",
      zoneStatusId
    );
    switch (getCallType(zoneTypeId, zoneStatusId)) {
      case 1:
        zonesService
          .getZoneByStatusPaged(
            zoneStatusId,
            pageIndex,
            pageData.pagination.pageSize
          )
          .then(getPaginatedSuccess)
          .catch(getPaginatedError);
        break;
      case 2:
        zonesService
          .getZoneByType(zoneTypeId, pageIndex, pageData.pagination.pageSize)
          .then(getPaginatedSuccess)
          .catch(getPaginatedError);
        break;
      case 3:
        zonesService
          .getZoneByStatusAndByType(
            zoneStatusId,
            zoneTypeId,
            pageIndex,
            pageData.pagination.pageSize
          )
          .then(getPaginatedSuccess)
          .catch(getPaginatedError);
        break;
      default:
        zonesService
          .getPaginated(pageIndex, pageData.pagination.pageSize)
          .then(getPaginatedSuccess)
          .catch(getPaginatedError);
        break;
    }
  };

  const lookUpSuccess = (response) => {
    zoneStatus = response.item.zoneStatus;  
    const zoneTypes = response.item.zoneTypes;
    setSelectOptionData((prevState) => {
      const newState = { ...prevState };
      newState.arrayOfZoneStatuses = zoneStatus;
      newState.zoneStatusDropdownComps = zoneStatus.map(mapSelectOption);
      newState.arrayOfZoneTypes = zoneTypes;
      newState.zoneTypesDropdownComps = zoneTypes.map(mapSelectOption);
      return newState;
    });
  };

  const lookUpError = (response) => {
    _logger("lookup", response);
    toastr.error("There was an error getting the data");
  };

  const mapSelectOption = (item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    );
  };

  const getPaginatedSuccess = (response) => {
    _logger("getPaginatedSuccess response", response);
    const arrayOfZones = response.item.pagedItems;
    const paginationData = {
      pageIndex: response.item.pageIndex,
      pageSize: response.item.pageSize,
      totalCount: response.item.totalCount,
      totalPages: response.item.totalPages,
    };
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.arrayOfZones = arrayOfZones;
      newState.zoneComponents = arrayOfZones.map(mapZone);
      newState.pagination = paginationData;
      return newState;
    });
  };

  const getPaginatedError = (error) => {
    _logger("getPaginatedError", error);
    toastr.error("There was an error getting the Zones");
  };

  const onDeleteRequested = useCallback((myZone) => {
    Swal.fire({
      title: `Do you want to delete ${myZone.name}?`,
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Remove",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        zonesService
          .deleteZone(myZone.id)
          .then(onDeleteSuccess(myZone.id))
          .catch(onDeleteError);
      } else if (result.isDenied) {
      }
    });
  }, []);

  const onDeleteSuccess = (idToBeDeleted) => {
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfZones = [...pd.arrayOfZones];
      const idxOf = pd.arrayOfZones.findIndex((zone) => {
        let result = false;
        if (zone.id === idToBeDeleted) {
          result = true;
        }
        return result;
      });
      if (idxOf >= 0) {
        pd.arrayOfZones.splice(idxOf, 1);
        pd.zoneComponents = pd.arrayOfZones.map(mapZone);
      }
      toastr.success("Successfully Deleted");
      return pd;
    });
  };

  const onDeleteError = (response) => {
    _logger(response);
    toastr.error("Delete Failed");
  };

  const onHandleCalls = (values) => {
    _logger("onHandleCalls", values);
    const zoneTypeId = parseInt(values.zoneTypeId);
    const zoneStatusId = parseInt(values.zoneStatusId);
    _logger("zoneTypeId, zoneStatusId:", zoneTypeId, zoneStatusId);
    setDataForFilter(() => {
      return { zoneTypeId: zoneTypeId, zoneStatusId: zoneStatusId };
    });
  };

  const mapZone = (aZone) => {
    return (
      <ZoneMapper
        statusOptionsData={zoneStatus}
        zoneData={aZone}
        key={"ListA-" + aZone.id}
        onDeleteRequest={onDeleteRequested}
        currentUser={props.currentUser}
      ></ZoneMapper>
    );
  };

  const onSearch = (e) => {
    e.preventDefault();
    zonesService
      .searchPaginated(
        pageData.pagination.pageIndex,
        pageData.pagination.pageSize,
        searchFormData.search
      )
      .then(getPaginatedSuccess)
      .catch(searchPaginatedError);
  };

  const searchPaginatedError = (response) => {
    _logger("error", response);
    toastr.error("Results Found");
  };

  const onPageChangeClicked = (page) => {
    getZones(page);
  };

  const numberOfResultsPerPage = (event) => {
    const newPSize = event.target.value;
    setPageData((prevState) => {
      const newState = { ...prevState };
      newState.pagination.pageSize = newPSize;
      return newState;
    });
  };

  return (
    <React.Fragment>
      <Row className="container-fluid justify-content-between zones-rowstyle zones-mrg-0">
        <Col className="zones-colstyle zones-mrg-0" lg={6} md={6}>
          <Formik
            enableReinitialize={true}
            initialValues={dataForFilter}
            validationSchema={AllZonesSchema}
            onSubmit={onHandleCalls}
          >
            {({ submitForm, handleChange }) => (
              <Form>
                <Row className="container-fluid zones-mrg-0">
                  <Col lg={6} md={6}>
                    <Field
                      as="select"
                      name="zoneTypeId"
                      aria-describedby="enterModel"
                      className="form-group form-select text-dark"
                      onChange={(input) => {
                        handleChange(input);
                        submitForm();
                      }}
                    >
                      <option
                        value="0"
                        label="Select a Type"
                        className="text-muted"
                      ></option>
                      {selectOptionData.zoneTypesDropdownComps}
                    </Field>
                  </Col>

                  <Col lg={6} md={6}>
                    <Field
                      as="select"
                      name="zoneStatusId"
                      aria-describedby="enterModel"
                      className="form-group  form-select text-dark"
                      onChange={(input) => {
                        handleChange(input);
                        submitForm();
                      }}
                    >
                      <option
                        value="0"
                        label="Select a Status"
                        className="text-muted"
                      ></option>

                      {selectOptionData.zoneStatusDropdownComps}
                    </Field>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>
        <Col lg={5} md={5}>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              name="search"
              onChange={onFormFieldChange}
              value={searchFormData.search}
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              onClick={onSearch}
            >
              Search
            </button>
            <button
              className="btn btn-outline-warning"
              type="submit"
              onClick={onReset}
            >
              Reset
            </button>
          </form>
        </Col>
        {/* </Row> */}
      </Row>
      <Row className="d-flex justify-content-between zones-rowstyle zones-button-add-pagesize">
        <Col lg={4} md={4}>
          {props.currentUser.roles.includes("SysAdmin") ? (
            <Link
              to="/zones/add"
              className="zones-button-add link-btn btn btn-primary"
            >
              Add new
            </Link>
          ) : (
            ""
          )}
        </Col>

        <Col lg={3} md={3}>
          <Formik
            enableReinitialize={true}
            initialValues={pageData.pagination.pageSize}
            validationSchema={AllZonesSchema}
          >
            <Field
              as="select"
              name="nResuPerPage"
              onChange={numberOfResultsPerPage}
              aria-describedby="enterModel"
              className="form-group zones-resperpage form-select text-dark"
            >
              {pageSizeOptions.map((size, index) => {
                return (
                  <option
                    key={index}
                    value={size}
                    label={size}
                    className="text-dark"
                    placeholder={size}
                  ></option>
                );
              })}
            </Field>
          </Formik>
        </Col>
      </Row>
      <div className="container characters"></div>
      <div className="container-fluid containerForZones">
        <div className="row">{pageData.zoneComponents}</div>
      </div>
      <Tab.Container defaultActiveKey="grid">
        <Row>
          <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
            <Pagination
              className="zones-pagination-buttons-bottom "
              current={pageData.pagination.pageIndex + 1}
              total={pageData.pagination.totalCount}
              pageSize={pageData.pagination.pageSize}
              locale={locale}
              onChange={onPageChangeClicked}
            />
          </div>
        </Row>
      </Tab.Container>
    </React.Fragment>
  );
};

Zones.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    id: PropTypes.number,
    isLoggedIn: PropTypes.bool,
    lastName: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default Zones;

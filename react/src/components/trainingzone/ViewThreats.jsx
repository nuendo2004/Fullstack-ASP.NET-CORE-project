import React, { useEffect, useState } from "react";
import { Table, Form, Row, Col, Button } from "react-bootstrap";
import * as zoneConfigService from "../../services/trainingZones/zoneConfigService";
import { ToastContainer, toast } from "react-toastify";
import debug from "sabio-debug";
import ZoneConfigTable from "../../components/trainingzone/ZoneConfigTable";
import { Link } from "react-router-dom";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";

const _logger = debug.extend("UserRegister");
function ViewThreats() {
  const [pageData, setPageData] = useState({
    organizationsResult: [],
    mappedOrganizationResults: [],
    pageIndex: 0,
    pageSize: 10,
    userId: 20,
    orgId: 13,
    totalCount: 0,
  });

  const [speedCategories] = useState(["speedCategories"]);
  const [spread, setspread] = useState({
    spread: [],
    spreadComponents: [],
  });

  const [speed, setSpeed] = useState({
    speed: [],
    speedComponents: [],
  });
  const [data, setData] = useState({
    speed: "",
    spread: "",
  });

  const onFilterChange = (event) => {
    _logger("onChange", { syntheticEvent: event });
    const target = event.target;
    const newUserValue = target.value;
    const nameOfField = target.name;
    setData((prevState) => {
      const newUserObject = {
        ...prevState,
      };

      newUserObject[nameOfField] = newUserValue;

      return newUserObject;
    });
  };

  const onSpreadSuccess = (response) => {
    _logger(response);

    let arrayOfSpread = response.item.pagedItems;
    setPageData((prevState) => {
      let newSpreads = { ...prevState };
      newSpreads.organizationsResult = arrayOfSpread;
      newSpreads.mappedOrganizationResults = arrayOfSpread.map(mapArray);
      newSpreads.totalCount = response.item.totalCount;

      return newSpreads;
    });
  };

  const onSpreadError = (response) => {
    _logger(response);
  };

  const onSpeedSuccess = (response) => {
    _logger(response);

    let arrayOfSpeed = response.item.pagedItems;
    setPageData((prevState) => {
      let newSpeeds = { ...prevState };
      newSpeeds.organizationsResult = arrayOfSpeed;
      newSpeeds.mappedOrganizationResults = arrayOfSpeed.map(mapArray);

      newSpeeds.totalCount = response.item.totalCount;

      return newSpeeds;
    });
  };
  const onSpeedError = (response) => {
    _logger(response);
  };

  useEffect(() => {
    if (data.spread && !data.speed) {
      zoneConfigService
        .getBySpreadId(
          pageData.pageIndex,
          pageData.pageSize,
          pageData.orgId,
          data.spread
        )
        .then(onSpreadSuccess)
        .catch(onSpreadError);
    } else if (data.speed && !data.spread) {
      zoneConfigService
        .getBySpeedId(
          pageData.pageIndex,
          pageData.pageSize,
          pageData.orgId,
          data.speed
        )
        .then(onSpeedSuccess)
        .catch(onSpeedError);
    } else {
      zoneConfigService
        .getByOrgId(pageData.pageIndex, pageData.pageSize, pageData.orgId)
        .then(onGetOrgSuccess)
        .catch(onGetOrgError);
    }
  }, [pageData.pageIndex, data.speed, data.spread]);

  useEffect(() => {
    zoneConfigService
      .getSpeed(speedCategories)
      .then(onGetSpeedSuccess)
      .catch(onGetSpeedError);
    zoneConfigService
      .getSpread()
      .then(onGetSpreadSuccess)
      .catch(onGetSpreadError);
  }, []);
  const deleteClick = (aOrganization) => {
    const idTobBeDeleted = aOrganization.id;
    zoneConfigService
      .deleteZone(idTobBeDeleted)
      .then(onDeleteSuccess)
      .catch(onDeleteError);
  };
  const onDeleteError = (response) => {
    _logger("error is firing", response);
    toast.error("Process Failed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const onDeleteSuccess = (id) => {
    _logger(id, "deleted");
    setPageData((prevState) => {
      const page = { ...prevState };
      page.organizationsResult = [...page.organizationsResult];
      const idxOf = page.organizationsResult.findIndex((aOrganization) => {
        let result = false;
        if (aOrganization.id === id) {
          result = true;
        }
        toast.success("👌 You Deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return result;
      });

      if (idxOf >= 0) {
        page.mappedOrganizationResults.splice(idxOf, 1);
        page.organizationsResult.splice(idxOf, 1);
        page.mappedOrganizationResults = page.organizationsResult.map(mapArray);
      }
      _logger(page.organizationsResult);
      return page;
    });
  };

  const onGetSpreadSuccess = (response) => {
    _logger(response);
    let spreads = response.items;
    setspread((prevState) => {
      const spreadData = { ...prevState };
      spreadData.spread = spreads;
      spreadData.spreadComponents = spreads.map(mapSpread);

      return spreadData;
    });
    return spreads;
  };

  const onGetSpreadError = (response) => {
    toast.error("Records not found", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return response;
  };

  const onGetSpeedSuccess = (response) => {
    _logger(response);
    let speeds = response.item.speedCategories;
    setSpeed((prevState) => {
      const speedData = { ...prevState };
      speedData.speed = speeds;
      speedData.speedComponents = speeds.map(mapSpeed);
      return speedData;
    });
    return speeds;
  };
  const onGetSpeedError = (response) => {
    toast.error("Records not found", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return response;
  };
  const mapSpeed = (speedData) => (
    <option key={speedData.id} value={speedData.id}>
      {speedData.name}
    </option>
  );

  const mapSpread = (spreadData) => (
    <option key={spreadData.id} value={spreadData.id}>
      {spreadData.name}
    </option>
  );

  const onGetOrgSuccess = (response) => {
    let organizations = response.item.pagedItems;
    setPageData((prevState) => {
      const organizationData = { ...prevState };
      organizationData.organizationsResult = organizations;
      organizationData.mappedOrganizationResults = organizations.map(mapArray);
      organizationData.totalCount = response.item.totalCount;
      return organizationData;
    });
  };
  const onGetOrgError = (response) => {
    return response;
  };
  function mapArray(aOrganization) {
    return (
      <ZoneConfigTable
        onDelete={deleteClick}
        zoneTables={aOrganization}
        key={aOrganization.id}
      ></ZoneConfigTable>
    );
  }
  const onPageChange = (page) => {
    _logger(page);
    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.pageIndex = page - 1;
      return pd;
    });
  };

  const onClearFilter = (e) => {
    e.preventDefault();
    setData((prevState) => {
      let clearState = { ...prevState };
      clearState.speed = "";
      clearState.spread = "";
      return clearState;
    });
  };

  return (
    <React.Fragment>
      <div className="container">
        <h1>View Threats</h1>
        <div className="col">
          <Link
            type="button"
            className="btn btn-primary me-1"
            to="/addzoneconfig"
          >
            Add Zone Configuration
          </Link>
        </div>
        <Form>
          <Row className="mb-3">
            <Form.Group className="form-group m-1" as={Col}>
              <Form.Label htmlFor="spreadLevelId">Spread Level</Form.Label>
              {data.speed ? (
                <select
                  value={data.spread}
                  onChange={onFilterChange}
                  disabled
                  name="spread"
                  id="spread"
                  className=" text-dark form-select mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option value={""}>Open this select menu</option>
                  {spread.spreadComponents}
                </select>
              ) : (
                <select
                  value={data.spread}
                  onChange={onFilterChange}
                  name="spread"
                  id="spread"
                  className=" text-dark form-select mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option value={""}>Open this select menu</option>
                  {spread.spreadComponents}
                </select>
              )}
            </Form.Group>
            <Form.Group className="form-group col-6" as={Col}>
              <Form.Label htmlFor="speedCategoryId">Speed Category</Form.Label>
              {data.spread ? (
                <select
                  onChange={onFilterChange}
                  value={data.speed}
                  id="speed"
                  disabled
                  name="speed"
                  className="text-dark form-select  mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option value={""}>Open this select menu</option>
                  {speed.speedComponents}
                </select>
              ) : (
                <select
                  onChange={onFilterChange}
                  value={data.speed}
                  id="speed"
                  name="speed"
                  className="text-dark form-select  mb-3"
                  aria-label=".form-select-lg example"
                >
                  <option value={""}>Open this select menu</option>
                  {speed.speedComponents}
                </select>
              )}
            </Form.Group>
            <Button
              className="col-1 btn btn-primary m-5"
              onClick={onClearFilter}
            >
              Clear
            </Button>
          </Row>
        </Form>
        <br />
        <div className="row">
          <Table striped className="text-nowrap">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">description</th>
                <th scope="col">Speed</th>
                <th scope="col">Spread</th>
                <th scope="col"></th>
              </tr>
            </thead>
            {pageData.mappedOrganizationResults}
          </Table>
          <Pagination
            className="text-center"
            locale={locale}
            onChange={onPageChange}
            current={pageData.pageIndex + 1}
            total={pageData.totalCount}
          />
        </div>
      </div>

      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </React.Fragment>
  );
}

export default ViewThreats;

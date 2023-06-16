import React, { useEffect, useState, useCallback } from "react";
import TrainingUnitService from "../../services/trainingUnitService";
import TrainingUnitsOrgCard from "./TrainingUnitsOrgCard";
import {
  Row,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import debug from "sabio-debug";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";
const _logger = debug.extend("TrainingUnitsOrgList");

function TrainingUnitsOrgList() {
  const [pageData, setPageData] = useState({
    arrayOfTrainingUntisByOrg: [],
    TrainingUnitComponents: [],
    pageIndex: 0,
    pageSize: 8,
    totalCount: 0,
    initialIndex: 0,
    trainingStatusFilter: 2,
  });

  const mapUnitsByOrg = (aTrainingUnit) => {
    _logger(aTrainingUnit, "mappingtrainingUnit");
    return (
      <TrainingUnitsOrgCard
        trainingUnitData={aTrainingUnit}
        key={"list-A" + aTrainingUnit.id}
        onEditTrainigUnitsOrgClicked={onEditTrainigUnitsOrgClicked}
        onViewDetailsClicked={onViewDetailsClicked}
      />
    );
  };

  useEffect(() => {
    _logger("useEffect");

    const id = 27;

    TrainingUnitService.getTrainingUnitByOrgId(
      id,
      pageData.pageIndex,
      pageData.pageSize,
      pageData.trainingStatusFilter
    )
      .then(onGetTrainingUnitsSuccess)
      .catch(onGetTrainingUnitserror);
  }, [pageData.pageIndex]);

  const onGetTrainingUnitsSuccess = (data) => {
    let arrayOfTrainingUnit = data.item.pagedItems;

    _logger("TrainingUnit Success is working", data);

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfTrainingUntisByOrg = arrayOfTrainingUnit;
      pd.TrainingUnitComponents = arrayOfTrainingUnit.map(mapUnitsByOrg);
      pd.pageIndex = data.item.pageIndex;
      pd.pageSize = data.item.pageSize;
      pd.totalCount = data.item.totalCount;

      return pd;
    });
  };
  const onGetTrainingUnitserror = (error) => {
    _logger(error);
  };

  const onEditTrainigUnitsOrgClicked = useCallback((myOrg, eObj) => {
    _logger(myOrg.id, { myOrg, eObj });
  }, []);

  const onViewDetailsClicked = useCallback((myView, eObj) => {
    _logger(myView.id, { myView, eObj });
  }, []);

  const onPageChange = (page) => {
    _logger("Page", page);

    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.pageIndex = page - 1;

      return pd;
    });
  };
  const selectHandler = (key) => {
    const id = 27;
    _logger(key, "Key is firing");
    setPageData((prevState) => {
      let pd = { ...prevState };
      pd.trainingStatusFilter = key;
      return pd;
    });
    TrainingUnitService.getTrainingUnitByOrgId(
      id,
      pageData.initialIndex,
      pageData.pageSize,
      key
    )
      .then(onGetTrainingUnitsSuccess)
      .catch(onGetTrainingUnitserror);
  };
  return (
    <div>
      <ButtonGroup aria-label="Basic example" className="mb-3">
        <DropdownButton
          align="start"
          title="Training Status "
          id="dropdown-menu-align-start"
          className="me-1 mb-2 mb-lg-0"
          onSelect={selectHandler}
        >
          <Dropdown.Item eventKey="1">Pending</Dropdown.Item>
          <Dropdown.Item eventKey="2">Operational</Dropdown.Item>
          <Dropdown.Item eventKey="3">Disabled</Dropdown.Item>
          <Dropdown.Item eventKey="4">Arcived</Dropdown.Item>
          <Dropdown.Item eventKey="5">Locked</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
      <div className="justify-content-md-end">
        <Button href="/trainingUnits/create" className="mb-3">
          Add A TrainingUnit
        </Button>
      </div>

      <Row>{pageData.TrainingUnitComponents}</Row>
      <Pagination
        style={{ margin: "auto" }}
        locale={locale}
        current={pageData.pageIndex + 1}
        onChange={onPageChange}
        pageSize={pageData.pageSize}
        total={pageData.totalCount}
      />
    </div>
  );
}
export default TrainingUnitsOrgList;

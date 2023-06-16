import React, { useState, useEffect } from "react";
import traineesService from "services/traineesService";
import TraineeCard from "./TraineeCard";
import debug from "sabio-debug";
import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import organizationsService from "services/organizationService";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import Pagination from "rc-pagination";

const _logger = debug.extend("Trainees");

function Trainees() {
  const [traineeData, setTraineeData] = useState({
    arrayOfTrainees: [],
    traineesComponents: [],
    pageIndex: 0,
    pageSize: 8,
    totalCount: 0,
  });

  const [selectedOrg, setSelectedOrg] = useState(0);
  const [orgFilterOptions, setOrgFilterOptions] = useState([]);

  const mapTrainee = (aTrainee) => {
    return <TraineeCard trainee={aTrainee} key={"ListA-" + aTrainee.id} />;
  };

  const mapOrganizations = (orga) => {
    return (
      <option key={`organizationId${orga.id}`} value={orga.id}>
        {orga.name}
      </option>
    );
  };

  useEffect(() => {
    _logger("firing useEffect for get Trainees");
    getTrainees();
    organizationsService
      .getAll()
      .then(getAllOrganizationSuccess)
      .catch(getAllOrganizationError);
  }, []);

  useEffect(() => {
    if (Number(selectedOrg) === 0) {
      traineesService
        .getTrainees(traineeData.pageIndex, traineeData.pageSize)
        .then(onGetAllTraineesSuccess)
        .catch(onGetAllTraineesError);
    } else {
      traineesService
        .getTraineesByOrganization(
          traineeData.pageIndex,
          traineeData.pageSize,
          selectedOrg
        )
        .then(onGetTraineesSuccess)
        .catch(onGetTraineesError);
    }
  }, [traineeData.pageIndex, selectedOrg]);

  const getTrainees = () => {
    traineesService
      .getTrainees(traineeData.pageIndex, traineeData.pageSize)
      .then(onGetTraineesSuccess)
      .catch(onGetTraineesError);
  };

  const onGetTraineesSuccess = (data) => {
    let allTrainees = data.item.pagedItems;
    setTraineeData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfTrainees = allTrainees;
      pd.traineesComponents = allTrainees.map(mapTrainee);
      pd.pageIndex = data.item.pageIndex;
      pd.pageSize = data.item.pageSize;
      pd.totalCount = data.item.totalCount;
      return pd;
    });
  };

  const onGetTraineesError = (err) => {
    _logger(err);
  };

  const onGetAllTraineesSuccess = (data) => {
    let allTrainees = data.item.pagedItems;
    setTraineeData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfTrainees = allTrainees;
      pd.traineesComponents = allTrainees.map(mapTrainee);
      pd.pageIndex = data.item.pageIndex;
      pd.pageSize = data.item.pageSize;
      pd.totalCount = data.item.totalCount;
      return pd;
    });
  };

  const onGetAllTraineesError = (err) => {
    _logger(err);
  };

  const getAllOrganizationSuccess = (response) => {
    let allOrganizations = response.item;
    _logger("orgs", response);

    setOrgFilterOptions(() => {
      return allOrganizations ? allOrganizations.map(mapOrganizations) : [];
    });
  };

  const getAllOrganizationError = (err) => {
    _logger(err);
  };

  const filteringByOrg = (e) => {
    const ct = e.target.value;
    setSelectedOrg(ct);
    _logger("e.currentTarget val ->", ct);

    setTraineeData((prevState) => {
      const newState = { ...prevState };
      newState.pageIndex = 0;
      newState.pageSize = 8;
      newState.totalCount = 0;
      return newState;
    });
  };

  const onPageChange = (page) => {
    _logger("Page", page);
    setTraineeData((prevState) => {
      let pd = { ...prevState };
      pd.pageIndex = page - 1;
      return pd;
    });
  };

  return (
    <React.Fragment>
      <h1>Trainees</h1>

      <div className="row mb-3 ">
        <div className="col-4">
          <label htmlFor="orgFilter"></label>
          <select
            value={selectedOrg}
            onChange={filteringByOrg}
            id="orgFilter"
            name="orgFilter"
            aria-describedby="enterModel"
            className="form-group form-select text-dark col-2"
          >
            <option value="0" className="trainees-select-option">
              Filter by Organization
            </option>
            {orgFilterOptions}
          </select>
        </div>
        <div className="offset-md-6 col-2">
          <Link
            to="/trainees/form"
            className="addtrainee-linkbutton btn btn-warning mt-3 mx-2"
          >
            Add Trainees{" "}
          </Link>
        </div>
      </div>
      <div className="row">{traineeData.traineesComponents}</div>
      <div className="  trainees-pagination">
        <Row>
          <Pagination
            showLessItems
            locale={locale}
            showTitle={false}
            current={traineeData.pageIndex + 1}
            onChange={onPageChange}
            pageSize={traineeData.pageSize}
            total={traineeData.totalCount}
          />
        </Row>
      </div>
    </React.Fragment>
  );
}
export default Trainees;

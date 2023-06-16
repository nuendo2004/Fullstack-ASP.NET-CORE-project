import React, { useState } from "react";
import styles from "./css/mainpage.module.css";
import { useEffect } from "react";
import {
  getTrainingUnitsByOrgIdV3,
  getRecordByTrainingUnitId,
  getAllRecords,
} from "services/zoneTrackerService";
import Pagination from "rc-pagination";
import DetailCard from "./comps/DetailCard";
import ZoneTraineeCard from "./comps/ZoneTraineeCard";
import { Dropdown } from "react-bootstrap";
import debug from "sabio-debug";
import toastr from "toastr";
import PropTypes from "prop-types";
import "rc-pagination/assets/index.css";

const FindMyTrainee = ({ currentUser }) => {
  const defaultPage = {
    pageIndex: 0,
    pageSize: 10,
    totalCount: 0,
    totalPage: 1,
  };
  const _logger = debug.extend("ZoneTracker");
  const [currentTrainee, setCurrentTrainee] = useState({
    isVisible: false,
    payload: {},
  });
  const [currentUnit, setCurrentUnit] = useState("");
  const [filtered, setFiltered] = useState(false);
  const [filteredUnit, setFilteredUnit] = useState({});
  const [trainees, setTrainees] = useState([]);
  const [trainingUnits, setTrainingUnits] = useState([]);
  const [mappedTrainingUnit, setMappedTrainingUnit] = useState([]);
  const [traineeArray, setTraineeArray] = useState([]);
  const [showPopulatedClassOnly, setShowPopulatedClassOnly] = useState(false);
  const [page, setPage] = useState(defaultPage);
  const [hasRecordOnly, setHasRecordOnly] = useState(false);
  const { currentOrgId } = currentUser;

  const onResSuccess = (res) => {
    const { pageIndex, pageSize, totalCount, totalPage, pagedItems } = res.item;
    setPage({ pageIndex, pageSize, totalCount, totalPage });
    setTrainees(pagedItems);
    _logger("Training unit dropdown", pagedItems);
  };
  const onResFailed = (e) => {
    toastr.error(e.response.headers);
  };

  useEffect(() => {
    if (filtered) return;
    getAllRecords(page.pageIndex, page.pageSize, currentOrgId, hasRecordOnly)
      .then(onResSuccess)
      .catch(onResFailed);
  }, [page.pageIndex, filtered, currentOrgId, hasRecordOnly]);

  const onGetTrainingUnitSuccess = (res) => {
    _logger("Training unit response", res);
    setTrainingUnits(res.data.items);
  };
  const onGetTrainingUnitFailed = (e) => {
    _logger(e);
    toastr.error(e.response.header);
  };
  useEffect(() => {
    setFiltered(false);
    if (showPopulatedClassOnly) {
      _logger("Fetching training unit with records");
      getTrainingUnitsByOrgIdV3(currentOrgId, true)
        .then(onGetTrainingUnitSuccess)
        .catch(onGetTrainingUnitFailed);
    } else
      getTrainingUnitsByOrgIdV3(currentOrgId, false)
        .then(onGetTrainingUnitSuccess)
        .catch(onGetTrainingUnitFailed);
    setCurrentUnit("Select Unit");
  }, [currentOrgId, showPopulatedClassOnly]);

  const handleFilterByTraningGroup = (unit) => {
    setFilteredUnit(unit);
  };

  useEffect(() => {
    _logger("Training unit dropdown", trainingUnits);
    const dropdown = trainingUnits.map((traininghUnit) => (
      <Dropdown.Item
        key={traininghUnit.id}
        name={traininghUnit.name}
        id={traininghUnit.id}
        onClick={() => handleFilterByTraningGroup(traininghUnit)}
      >
        {traininghUnit.name}
      </Dropdown.Item>
    ));
    setMappedTrainingUnit(dropdown);
  }, [trainingUnits]);

  const mapTraineeCard = (trainee) => {
    return (
      <ZoneTraineeCard
        key={trainee.traineeId}
        trainee={trainee}
        setCurrentTrainee={setCurrentTrainee}
      />
    );
  };

  useEffect(() => {
    const traineesArr = trainees.map(mapTraineeCard);
    setTraineeArray(traineesArr);
  }, [trainees]);

  const onFilterByTrainingGroupSuccess = ({ item }, { name, id }) => {
    const { pageIndex, pageSize, totalCount, totalPage, pagedItems } = item;
    _logger("array with training unit id " + id, pagedItems);
    setCurrentUnit(name);
    setFiltered(true);
    setTrainees(pagedItems);
    setPage({ pageIndex, pageSize, totalCount, totalPage });
  };
  const onFilterByTrainingGroupFailed = (res, { name, id }) => {
    if (res.response.status === 404) {
      _logger("array with training unit id " + id, res.response.header);
      setCurrentUnit(name);
      setFiltered(true);
      setTrainees([]);
    }
    toastr.error("No record found");
    setPage(defaultPage);
  };

  useEffect(() => {
    _logger("set filter", filteredUnit);
    if (!filteredUnit || filteredUnit.id === "") {
      _logger("recalculate trainees");
      setFiltered(false);
      return;
    }
    if (!filteredUnit.id) return;
    getRecordByTrainingUnitId(
      page.pageIndex,
      page.pageSize,
      parseInt(filteredUnit.id),
      hasRecordOnly
    )
      .then((res) => onFilterByTrainingGroupSuccess(res, filteredUnit))
      .catch((err) => onFilterByTrainingGroupFailed(err, filteredUnit));
  }, [filteredUnit, filtered, hasRecordOnly]);

  const onPageChange = (p) => {
    setPage({ ...page, pageIndex: p - 1 });
  };

  const handleTrainingUnitCheckbox = () => {
    setShowPopulatedClassOnly(!showPopulatedClassOnly);
  };
  const handleRecordCheckbox = () => {
    setHasRecordOnly(!hasRecordOnly);
    setPage((state) => {
      return { ...state, pageIndex: 0 };
    });
  };

  const mainContent = (
    <section>
      <nav className="d-sm-flex flex-sm-row flex-column align-items-center sm-gap-5">
        <Dropdown>
          <Dropdown.Toggle
            className="w-100 w-md-auto"
            variant="success"
            id="dropdown-basic"
          >
            {filtered ? currentUnit : "Select Unit"}
          </Dropdown.Toggle>

          <Dropdown.Menu
            onChange={handleFilterByTraningGroup}
            style={{ maxHeight: "280px", overflow: "auto" }}
          >
            <Dropdown.Item
              id={""}
              onClick={() => handleFilterByTraningGroup(null)}
            >
              Show All
            </Dropdown.Item>
            {mappedTrainingUnit}
          </Dropdown.Menu>
        </Dropdown>
        <div className="d-flex align-items-center ">
          <label className="mx-2" htmlFor={"tu-checkbox"}>
            Hide empty training units
          </label>
          <input
            id="tu-checkbox"
            type="checkbox"
            onChange={handleTrainingUnitCheckbox}
            checked={showPopulatedClassOnly}
            className="mr-4"
          />
        </div>
        <div className="d-flex align-items-center ">
          <label className="mx-2" htmlFor={"tu-checkbox"}>
            Hide inactive trainees
          </label>
          <input
            id="tu-checkbox"
            type="checkbox"
            onChange={handleRecordCheckbox}
            checked={hasRecordOnly}
            className="mr-4"
          />
        </div>
      </nav>

      <div>
        {traineeArray.length > 0 ? (
          traineeArray
        ) : (
          <h3 className="text-center">Found 0 Trainee</h3>
        )}
      </div>

      <div className="d-flex justify-content-center my-7">
        <Pagination
          current={page.pageIndex + 1}
          pageSize={page.pageSize}
          total={page.totalCount}
          onChange={onPageChange}
        />
      </div>
    </section>
  );

  return (
    <div className={styles.ztkr_mainframe}>
      {currentTrainee.isVisible && currentTrainee.payload ? (
        <DetailCard
          trainee={currentTrainee.payload}
          setCurrentTrainee={setCurrentTrainee}
        />
      ) : (
        mainContent
      )}
    </div>
  );
};

FindMyTrainee.propTypes = {
  currentUser: PropTypes.shape({
    currentOrgId: PropTypes.number.isRequired,
  }).isRequired,
};

export default FindMyTrainee;

import React, { useState, useEffect } from "react";
import propTypes from "prop-types";
import styles from "../css/detailedcard.module.css";
import { GrClose } from "react-icons/gr";
import debug from "sabio-debug";
import {
  getRecordByTraineeId,
  getRecordByZoneId,
  getZoneChartData,
} from "services/zoneTrackerService";
import { Dropdown, DropdownButton } from "react-bootstrap";
import DetailList from "./DetailList";
import ReactApexChart from "react-apexcharts";
import toastr from "toastr";

const DetailCard = ({ trainee, setCurrentTrainee }) => {
  const initialPagination = {
    pageIndex: 0,
    pageSize: 20,
    hasNextPage: false,
  };
  const _logger = debug.extend("ZoneTracker");
  const { firstName, lastName, avatarUrl } = trainee.user;
  const [detailList, setDetailList] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [currentZone, setCurrentZone] = useState({});
  const [pagination, setPagination] = useState(initialPagination);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [chart, setChart] = useState({ labels: ["No activity"], series: [0] });
  const [showChart, setShowChart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onGetChartSuccess = ({ items }) => {
    const labels = items.map((item) => item.name);
    const series = items.map((item) => item.totalCount);
    setChart({
      labels,
      series,
    });
  };
  const onGetChartFailed = (e) => {
    _logger("Error on getting chart", e.response);
    toastr.error("No record found");
  };
  useEffect(() => {
    getZoneChartData(trainee.traineeId)
      .then(onGetChartSuccess)
      .catch(onGetChartFailed);
  }, [trainee.traineeId]);

  const onFetchSuccess = ({ item }) => {
    setIsLoading(false);
    const { pageIndex, pageSize, hasNextPage, pagedItems } = item;
    _logger(pagedItems);
    if (isFirstPage) setDetailList([...pagedItems]);
    else
      setDetailList((state) => {
        return [...state, ...pagedItems];
      });
    setPagination({
      pageIndex,
      pageSize,
      hasNextPage,
    });
  };
  const onFetchFailed = (res) => {
    setIsLoading(false);
    _logger(res);
    toastr.error("No record found");
  };
  const onFilterSuccess = ({ item }) => {
    setIsLoading(false);
    const { pageIndex, pageSize, hasNextPage, pagedItems } = item;
    setIsFiltering(true);
    _logger("Successfully fetched filter by zoneId ", item);
    if (isFirstPage) setDetailList([...pagedItems]);
    else
      setDetailList((state) => {
        return [...state, ...pagedItems];
      });
    setPagination({
      pageIndex: pageIndex,
      pageSize: pageSize,
      hasNextPage: hasNextPage,
    });
  };
  const onFilterFailed = (err) => {
    setIsLoading(false);
    toastr.error("No record found");
    if (err.response.status === 404) {
      setDetailList([]);
      setPagination({
        pageIndex: 0,
        pageSize: 20,
        hasNextPage: false,
      });
    }
  };

  useEffect(() => {
    setIsFirstPage(false);
    _logger("current trainee", trainee);
    setIsLoading(true);
    if (isFiltering) {
      getRecordByZoneId(
        isFirstPage ? 0 : pagination.pageIndex,
        pagination.pageSize,
        trainee.traineeId,
        currentZone.id
      )
        .then((res) => onFilterSuccess(res))
        .catch((res) => onFilterFailed(res));
    } else
      getRecordByTraineeId(
        pagination.pageIndex,
        pagination.pageSize,
        trainee.traineeId
      )
        .then(onFetchSuccess)
        .catch(onFetchFailed);
  }, [pagination.pageIndex, currentZone.id]);

  const onReturn = () => {
    setCurrentTrainee({ isVisible: false, trainee: {} });
  };

  const handleZoneChange = (e, zone) => {
    if (zone.id === currentZone.id) return;
    _logger("on change wreid reload", e);
    e.preventDefault();
    setIsFiltering(true);
    setCurrentZone(zone);
    _logger("set current zone", zone);
    if (pagination.pageIndex !== 0) setPagination(initialPagination);
    setDetailList([]);
  };

  const extractZones = () => {
    const res = trainee.records.reduce((acc, cur) => {
      if (!acc[cur.zone.id]) acc[cur.zone.id] = cur.zone;
      return acc;
    }, {});
    return Object.values(res);
  };

  const zoneDropDown = extractZones().map((zone) => (
    <Dropdown.Item
      id={zone.id}
      name={zone.name}
      key={zone.id}
      onClick={(e) => handleZoneChange(e, zone)}
    >
      {zone.name}
    </Dropdown.Item>
  ));

  const setToDefault = () => {
    setIsFirstPage(true);
    setCurrentZone({});
    setIsFiltering(false);
    setPagination(initialPagination);
  };

  const setChartVisibility = () => {
    setShowChart((state) => {
      return !state;
    });
  };

  return (
    <section className={styles.ztkr_background}>
      <div key={trainee.traineeId} className={styles.ztkr_detailcardframe}>
        <div className="d-flex justify-content-between">
          <button
            className={`btn btn-primary fs-4 px-4 ${styles.ztkr_returnbutton}`}
            onClick={onReturn}
          >
            Return
          </button>
          <GrClose
            size={20}
            onClick={onReturn}
            className={styles.ztkr_returncross}
          />
        </div>

        <div className="my-4">
          <div className={styles.ztkr_avatarframe}>
            <img src={avatarUrl} className={styles.ztkr_avatar} alt="" />
          </div>
          <h1 className="text-center my-6">{`${firstName} ${lastName}`}</h1>
        </div>

        <div className={styles.ztkr_listwidth}>
          <div className="mb-2 d-flex justify-content-between">
            <div className="d-flex align-items-center">
              <DropdownButton
                id="dropdown-basic-button"
                title={!currentZone.name ? "Filter by zone" : currentZone.name}
              >
                <Dropdown.Item key={"default"} onClick={setToDefault}>
                  ShowAll
                </Dropdown.Item>
                {zoneDropDown}
              </DropdownButton>
              <label className="mx-2 fs-4 text-black" htmlFor="toggle">
                Show chart
              </label>
              <input
                type="checkbox"
                checked={showChart}
                id="toggle"
                onChange={setChartVisibility}
              />
            </div>
          </div>

          <div className={styles.ztkr_list}>
            {showChart ? (
              <div className={styles.ztkr_center}>
                <ReactApexChart
                  series={chart.series}
                  options={{
                    labels: chart.labels,
                  }}
                  width={600}
                  type="donut"
                />
              </div>
            ) : (
              <DetailList
                detailList={detailList}
                pagination={pagination}
                setPagination={setPagination}
                isLoading={isLoading}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

DetailCard.propTypes = {
  trainee: propTypes.shape({
    traineeId: propTypes.number.isRequired,
    user: propTypes.shape({
      id: propTypes.number.isRequired,
      email: propTypes.string.isRequired,
      firstName: propTypes.string.isRequired,
      lastName: propTypes.string.isRequired,
      mi: propTypes.string,
      avatarUrl: propTypes.string.isRequired,
    }).isRequired,
    records: propTypes.arrayOf(
      propTypes.shape({
        id: propTypes.number,
        timeAccessed: propTypes.string,
        zone: propTypes.shape({
          id: propTypes.number,
          name: propTypes.string,
          description: propTypes.string,
          imageUrl: propTypes.string,
          zoneType: propTypes.string,
          zoneStatus: propTypes.string,
        }),
      })
    ),
  }),
  setCurrentTrainee: propTypes.func.isRequired,
};

export default DetailCard;

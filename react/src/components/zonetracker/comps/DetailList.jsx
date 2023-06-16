import React, { useRef, useCallback } from "react";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import styles from "../css/detailedcard.module.css";
import Loading from "utils/Loading";
import { convertUTCToLocal } from "utils/dateFormater";
import logo from "../../../assets/images/brand/logo/immersedlogo.png";

const DetailList = ({ detailList, pagination, setPagination, isLoading }) => {
  const _logger = debug.extend("ZoneTracker");

  const observer = useRef();
  const lastElementInList = useCallback(
    (elm) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((elements) => {
        if (elements[0].isIntersecting && pagination.hasNextPage) {
          _logger("scroll fired");
          setPagination((state) => {
            return { ...state, pageIndex: state.pageIndex + 1 };
          });
        }
      });
      if (elm) observer.current.observe(elm);
    },
    [pagination.hasNextPage]
  );

  const renderList = () => {
    _logger("render record", detailList);
    return detailList.map((rc, index) => {
      let ref = index + 1 === detailList.length ? lastElementInList : null;
      return (
        <div key={rc.id} ref={ref} className={styles.ztkr_scrollitem}>
          <div className="d-flex align-items-center">
            <img
              className="me-3 d-none d-md-block"
              src={rc.zone.imageUrl || logo}
              alt="icon"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="flex-fill">
              <div className={styles.ztkr_detaillist}>
                <div>
                  Accessed from:
                  <span className="mx-2">{rc.device} device</span>
                </div>
                <div className="fs-4">
                  Time entered:{" "}
                  <span>{convertUTCToLocal(rc.timeAccessed)}</span>
                </div>
              </div>
              <div className={styles.ztkr_detaillist}>
                <p className="fs-3 bolder">{rc.zone.name}</p>
                <p className={styles.ztkr_tasktype}>{rc.zone.zoneType}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className={styles.ztkr_list}>
      {detailList.length > 0 ? (
        <div className={`${styles.ztkr_scrolllist}`}>
          {detailList && renderList()}
          {pagination.hasNextPage && (
            <div className={styles.ztkr_scrollitem}>
              <h2>Loading</h2>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.ztkr_center}>
          {isLoading ? (
            <Loading />
          ) : (
            <p className="fs-2">No access record found</p>
          )}
        </div>
      )}
    </div>
  );
};

DetailList.propTypes = {
  detailList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      timeAccessed: PropTypes.string,
      zone: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        imageUrl: PropTypes.string,
        zoneType: PropTypes.string,
        zoneStatus: PropTypes.string,
      }),
    })
  ).isRequired,
  pagination: PropTypes.shape({
    pageIndex: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    hasNextPage: PropTypes.bool.isRequired,
  }),
  setPagination: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default DetailList;

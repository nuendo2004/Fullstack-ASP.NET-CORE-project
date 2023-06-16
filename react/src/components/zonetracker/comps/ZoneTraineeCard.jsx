import React from "react";
import propTypes from "prop-types";
import styles from "../css/mainpage.module.css";
import logger from "sabio-debug";

const ZoneTraineeCard = ({ trainee, setCurrentTrainee }) => {
  const _logger = logger.extend("ZoneTracker");
  const handleClick = () => {
    _logger("set the trainee card to detail page, id: " + trainee.user.id);
    setCurrentTrainee({ isVisible: true, payload: trainee });
  };
  const { firstName, lastName, avatarUrl } = trainee.user;
  const lastZone = trainee.records.length > 0 && trainee.records[0].zone;

  return (
    <div className={styles.ztkr_traineecardframe}>
      <figure className={styles.ztkr_traineecard} onClick={handleClick}>
        <div className={styles.ztkr_flexcenter}>
          <div className={styles.ztkr_avatarframe}>
            <img
              src={avatarUrl}
              alt={`of firstname`}
              className={styles.ztkr_avatar}
            />
          </div>

          <h3 className={styles.ztkr_name}>{`${firstName} ${lastName}`}</h3>
        </div>

        <div className="d-none d-sm-flex align-items-center">
          {lastZone ? (
            <p className="text-success fs-3 font-weight-bold">
              {lastZone.name}
            </p>
          ) : (
            <p>No Zone Access Record</p>
          )}
        </div>

        <div className={styles.ztkr_flexcenter}>
          <div className="text-secondary ">
            <p>Last login</p>
            <p>
              {trainee.records.length === 0
                ? "Never"
                : trainee.records[0].timeAccessed.split("T")[0]}
            </p>
          </div>
        </div>
      </figure>
      <div></div>
    </div>
  );
};

ZoneTraineeCard.propTypes = {
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

export default ZoneTraineeCard;

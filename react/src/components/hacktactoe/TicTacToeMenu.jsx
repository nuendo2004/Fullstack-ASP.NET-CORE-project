import React, { useEffect, useState } from "react";
import ttoThumbnail from "../../assets/images/background/hacktactoe.png";
import propTypes from "prop-types";
import taskEventsService from "services/taskEventsService";
import { getTraineeAccountByUserIdAndZoneId } from "services/traineeAccountsService";
import Leaderboard from "./components/layout/Leaderboard";
import toastr from "toastr";
import sabioDebug from "sabio-debug";
const _logger = sabioDebug.extend("TicTacToeMenu");

function TicTacToeMenu({ handleOptionSelected, options, currentUser }) {
  const [record, setRecord] = useState({
    userName: "",
    wins: 0,
    losses: 0,
  });

  useEffect(() => {
    taskEventsService
      .getWinLossDrawRecord(currentUser.id)
      .then(onGetRecordSuccess)
      .catch(onGetRecordError);

    getTraineeAccountByUserIdAndZoneId(11)
      .then(onGetTraineeAccountByUserIdAndZoneIdSuccess)
      .catch(onGetTraineeAccountByUserIdAndZoneIdError);
  }, []);

  const onGetRecordSuccess = (response) => {
    _logger("success", response);
    const objectRecord = { wins: 0, losses: 0 };

    response.items.map((x) => {
      if (x.winLoss === -1) {
        objectRecord.losses = x.total;
      } else if (x.winLoss === 1) {
        objectRecord.wins = x.total;
      }
      return x;
    });

    setRecord((prevState) => {
      const newObject = { ...prevState };
      newObject.wins = objectRecord.wins;
      newObject.losses = objectRecord.losses;
      return newObject;
    });
  };

  const onGetRecordError = (error) => {
    toastr.error("Error Loading Win/Loss Record");
    _logger("error", error);
  };

  const onGetTraineeAccountByUserIdAndZoneIdSuccess = (response) => {
    _logger("onGetTraineeAccountByUserIdAndZoneIdSuccess success", response);

    setRecord((prevState) => {
      const newObject = { ...prevState };
      newObject.userName = response.item.traineeAccountUserName;
      return newObject;
    });
  };

  const onGetTraineeAccountByUserIdAndZoneIdError = (error) => {
    toastr.error("Error Loading Username");
    _logger("error", error);
  };

  const boardLeaders = [
    {
      record: `${record.wins}-${record.losses}`,
      userName: record.userName,
    },
    {
      record: "150-3",
      userName: "ttoMeister",
    },
    {
      record: "1-400",
      userName: "TmcTimmerson",
    },
    {
      record: "20-20",
      userName: "FrAnkSon",
    },
    {
      record: "1-5",
      userName: "jSon",
    },
  ];

  return (
    <>
      <h1 className="tto-menu-title">Hack Tac Toe</h1>
      <div className="tto-menu">
        <img className="tto-image" src={ttoThumbnail} alt="thumbnail" />
        <div>
          <button
            className="btn tto-btn hto-btn-multi"
            name="multi"
            value={options.multi}
            onClick={handleOptionSelected}
          >
            Play Online
          </button>
          <button
            className="btn tto-btn hto-btn-bot"
            name="bot"
            value={options.bot}
            onClick={handleOptionSelected}
          >
            Play vs Robot
          </button>
          <button
            className="btn tto-btn hto-btn-local"
            name="local"
            value={options.local}
            onClick={handleOptionSelected}
          >
            Play Local Game
          </button>
          <button
            className="btn tto-btn hto-btn-friend"
            name="local"
            value={options.local}
            onClick={handleOptionSelected}
          >
            Play with a Friend
          </button>
        </div>
      </div>
      <Leaderboard leaders={boardLeaders} />
    </>
  );
}

TicTacToeMenu.propTypes = {
  handleOptionSelected: propTypes.func.isRequired,
  options: propTypes.shape({
    bot: propTypes.bool.isRequired,
    multi: propTypes.bool.isRequired,
    local: propTypes.bool.isRequired,
  }).isRequired,
  currentUser: propTypes.shape({
    id: propTypes.number.isRequired,
    email: propTypes.string.isRequired,
    isLoggedIn: propTypes.bool.isRequired,
    firstName: propTypes.string.isRequired,
    lastName: propTypes.string.isRequired,
  }).isRequired,
};
export default TicTacToeMenu;

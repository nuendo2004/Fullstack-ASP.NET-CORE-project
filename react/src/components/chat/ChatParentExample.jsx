import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Chat from "./Chat";
import userService from "services/userService";
import zoneGroupService from "services/zoneGroupService";
import * as traineeAccountsService from "services/traineeAccountsService";
import Styles from "./chat.module.css";

import toastr from "toastr";

import debug from "sabio-debug";
import zonesService from "services/zonesServices";
const _logger = debug.extend("ChatParent");

const zoneOptions = {
  userChatZone: 1,
  traineeChatZone: 1,
};

const currentUserTraineeAccountId = 3;

function ChatParentExample(props) {
  const [chatState, setChatState] = useState({
    visible: false,
  });
  const [userChatData, setUserChatData] = useState("");
  const [zoneGroupDetails, setZoneGroupDetails] = useState("");
  const [traineeAccount, setTraineeAccount] = useState("");
  const [zoneData, setZoneData] = useState("");
  const [formData, setFormData] = useState({
    userId: "",
    groupId: "",
    zoneId: "",
  });

  useEffect(() => {
    traineeAccountsService
      .getTraineeAccountsById(currentUserTraineeAccountId)
      .then(getTraineeAccountSuccess)
      .catch(getTraineeAccountError);
  }, []);

  const startUserChat = (e) => {
    e.preventDefault();
    userService
      .getUserById(formData.userId)
      .then(getParticipantSuccess)
      .catch(getParticipantError);
  };

  const getParticipantSuccess = (response) => {
    _logger("getParticipantSuccess", response);
    setUserChatData(response.item);
    setChatState((prevState) => {
      const newState = { ...prevState };
      if (!prevState.visible) {
        newState.visible = !prevState.visible;
      }
      newState.userChat = true;
      return newState;
    });
  };

  const startGroupChat = (e) => {
    e.preventDefault();
    _logger("startGroupChat clicked", formData.groupId);
    zoneGroupService
      .getZoneGroupById(formData.groupId)
      .then(getZoneGroupSuccess)
      .catch(getZoneGroupError);
  };

  const getZoneGroupSuccess = (response) => {
    _logger("getZoneGroupData success", response);
    setZoneGroupDetails(response.item);
    setChatState((prevState) => {
      const newState = { ...prevState };
      if (!prevState.visible) {
        newState.visible = !prevState.visible;
      }
      newState.groupChat = true;
      return newState;
    });
  };

  const startZoneChat = (e) => {
    e.preventDefault();
    zonesService
      .getZoneById(formData.zoneId)
      .then(getZoneSuccess)
      .catch(getZoneError);
  };
  const getZoneSuccess = (response) => {
    _logger("getZone success", response);
    setZoneData(response.item);
    setChatState((prevState) => {
      const newState = { ...prevState };
      if (!prevState.visible) {
        newState.visible = !prevState.visible;
      }
      newState.zoneChat = true;
      return newState;
    });
  };

  const startTrainingChat = (e) => {
    e.preventDefault();
    setChatState((prevState) => {
      const newState = { ...prevState };
      if (!prevState.visible) {
        newState.visible = !prevState.visible;
      }
      newState.recipientEntity = traineeAccount;
      return newState;
    });
  };

  const onFormChange = (e) => {
    e.preventDefault();
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setFormData((prevFormData) => {
      const newFormData = { ...prevFormData };
      newFormData[name] = value;
      return newFormData;
    });
  };

  const getTraineeAccountSuccess = (response) => {
    _logger("getTraineeAccount success", response);
    setTraineeAccount(response.item);
  };

  const getParticipantError = (error) => {
    _logger("getParticipant failed:", error);
    toastr.error("Participant not found");
  };
  const getTraineeAccountError = (error) => {
    _logger("getTrainingAccount failed", error);
    toastr.error("Trainee account not found");
  };
  const getZoneGroupError = (error) => {
    _logger("getZoneGroupData failed", error);
    toastr.error("Group data not found");
  };

  const getZoneError = (error) => {
    _logger("getZone failed", error);
    toastr.error("Zone not found");
  };

  return (
    <div className="container">
      <div className="g-0 row">
        <div className="col-xl-6 col-lg-12 col-md-12 col-12 px-0">
          <div className="bg-white border-end border-top h-auto">
            <div className="chat-window border-bottom">
              <div className="chat-sticky-header sticky-top bg-white">
                <div className="px-4 pt-3 pb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <h1>Chat Demo</h1>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <h5>To simulate chat engagement, choose an option:</h5>
                  </div>
                </div>
              </div>
            </div>
            <input
              type="number"
              className="form-control"
              name="userId"
              placeholder="Type a User Id"
              value={formData.userId}
              onChange={onFormChange}
            ></input>
            <div className="mb-2 mx-1 row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={startUserChat}
              >
                Start User Chat
              </button>
            </div>
            <input
              type="number"
              className="form-control"
              name="groupId"
              placeholder="Type a Group Id"
              value={formData.groupId}
              onChange={onFormChange}
            ></input>
            <div className="mb-2 mx-1 row">
              <button
                type="button"
                className="btn btn-warning"
                onClick={startGroupChat}
              >
                Start Group Chat
              </button>
            </div>
            <input
              type="number"
              className="form-control"
              name="zoneId"
              placeholder="Type a Zone Id"
              value={formData.zoneId}
              onChange={onFormChange}
            ></input>
            <div className="mb-2 mx-1 row">
              <button
                type="button"
                className="btn btn-dark"
                onClick={startZoneChat}
              >
                Zone Chat
              </button>
            </div>
            <div className="mb-2 mx-1 row">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={startTrainingChat}
              >
                Training Account Chat
              </button>
            </div>
          </div>
        </div>
        <div className="col-xl-6 col-lg-12 col-md-12 col-12 px-0 mt-4">
          {(chatState.visible && chatState.userChat && (
            <div className={Styles.chat_container}>
              <Chat
                currentUser={props.currentUser}
                currentZone={zoneOptions.userChatZone}
                recipientUser={userChatData}
                isRequestingChatHistory={true}
              />
            </div>
          )) ||
            (chatState.visible && chatState.groupChat && (
              <div className={Styles.chat_container}>
                <Chat
                  traineeAccount={traineeAccount}
                  currentZone={zoneOptions.traineeChatZone}
                  groupChatData={zoneGroupDetails}
                  isRequestingChatHistory={true}
                />
              </div>
            )) ||
            (chatState.visible && chatState.zoneChat && (
              <div className={Styles.chat_container}>
                <Chat
                  currentUser={props.currentUser}
                  currentZone={zoneData.id}
                  zoneEntity={zoneData}
                  isRequestingChatHistory={true}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default ChatParentExample;

ChatParentExample.propTypes = {
  currentUser: PropTypes.shape({}),
};

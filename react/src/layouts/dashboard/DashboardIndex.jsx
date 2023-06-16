import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NavbarVertical from "./NavbarVertical";
import HeaderDefault from "./HeaderDefault";
import sabioDebug from "sabio-debug";

const _logger = sabioDebug.extend("dashboardindex");

const DashboardIndex = (props) => {
  _logger("dashboardIndex props =>", props);
  const { children, className, isOverflowHidden } = props;
  const [isMenuOpened, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!isMenuOpened);
  };
  useEffect(() => {
    document.body.style.backgroundColor = "#f5f4f8";
  });
  return (
    <div
      id="db-wrapper"
      className={`${isOverflowHidden ? "chat-layout" : ""} ${
        isMenuOpened ? "" : "toggled"
      }`}
    >
      <div className="navbar-vertical navbar">
        <NavbarVertical
          isMenuOpened={isMenuOpened}
          currentUser = {props.currentUser}
          onClick={(value) => setShowMenu(value)}
        />
      </div>
      <div id="page-content">
        <div className="header">
          <HeaderDefault
            currentUser={props.currentUser}
            data={{
              isMenuOpened: isMenuOpened,
              SidebarToggleMenu: ToggleMenu,
            }}
            handleChangeOrg={props.handleChangeOrg}
          />
        </div>
        <div className={`container-fluid ${className ? className : "p-4"}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

DashboardIndex.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
  isOverflowHidden: PropTypes.bool,
};

DashboardIndex.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }),
  handleChangeOrg: PropTypes.func.isRequired,
};

export default DashboardIndex;

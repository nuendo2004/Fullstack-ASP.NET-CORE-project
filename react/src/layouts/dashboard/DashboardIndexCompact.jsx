import React, { useState } from "react";
import PropTypes from "prop-types";
import NavbarCompact from "./navbars/NavbarCompact";
import HeaderDefault from "./HeaderDefault";

const DashboardIndexCompact = (props) => {
  const [isMenuOpened, setShowMenu] = useState(true);
  const ToggleMenu = () => {
    return setShowMenu(!isMenuOpened);
  };

  return (
    <div id="db-wrapper" className={`${isMenuOpened ? "" : "toggled"}`}>
      <div className="navbar-vertical-compact navbar">
        <NavbarCompact
          isMenuOpened={isMenuOpened}
          onClick={(value) => setShowMenu(value)}
        />
      </div>
      <div id="page-content-for-mini">
        <div className="header">
          <HeaderDefault
            data={{
              isMenuOpened: isMenuOpened,
              SidebarToggleMenu: ToggleMenu,
            }}
          />
        </div>
        <div className="container-fluid p-4">{props.children}</div>
      </div>
    </div>
  );
};

DashboardIndexCompact.propTypes = {
  children: PropTypes.string,
};

export default DashboardIndexCompact;

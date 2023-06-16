import { Link } from "react-router-dom";
import React, { Fragment } from "react";
import logger from "sabio-debug";

import { NavDropdown } from "react-bootstrap";
import PropTypes from "prop-types";

const _logger = logger.extend("NavDropdownMain");
const NavDropdownMain = ({ item, onClick }) => {
  // const { item, onClick } = props;
  _logger("Props", item);

  return (
    <NavDropdown title={item.menuitem}>
      {item.children.map((submenu, submenuindex) => {
        if (submenu.divider || submenu.header) {
          return submenu.divider ? (
            <NavDropdown.Divider bsPrefix="mx-3" key={submenuindex} />
          ) : (
            <h4 className="dropdown-header" key={submenuindex}>
              {/* Second level menu heading - its not a menu item */}
              {submenu.header_text}
            </h4>
          );
        } else {
          if (submenu.children === undefined) {
            return (
              <NavDropdown.Item
                key={submenuindex}
                as={Link}
                to={submenu.link}
                onClick={(expandedMenu) => onClick(!expandedMenu)}
              >
                {/* Second level menu item without having sub menu items */}
                {submenu.menuitem}
              </NavDropdown.Item>
            );
          } else {
            return (
              <NavDropdown
                title={submenu.menuitem}
                key={submenuindex}
                bsPrefix="dropdown-item d-block"
                className={`dropdown-submenu dropend py-0 `}
              >
                {submenu.children.map((submenuitem, submenuitemindex) => {
                  if (submenuitem.divider || submenuitem.header) {
                    return submenuitem.divider ? (
                      <NavDropdown.Divider
                        bsPrefix="mx-3"
                        key={submenuitemindex}
                      />
                    ) : (
                      <Fragment key={submenuitemindex}>
                        {/* Third level menu heading with description  */}
                        <h5 className="dropdown-header text-dark">
                          {submenuitem.header_text}
                        </h5>
                        <p className="dropdown-text mb-0 text-wrap">
                          {submenuitem.description}
                        </p>
                      </Fragment>
                    );
                  } else {
                    return (
                      <Fragment key={submenuitemindex}>
                        {submenuitem.type === "button" ? (
                          <div className="px-3 d-grid">
                            {/* Third Level with button format menu item */}
                            <Link
                              to={submenuitem.link}
                              className="btn-sm btn-primary text-center"
                            >
                              {submenuitem.menuitem}
                            </Link>
                          </div>
                        ) : (
                          <NavDropdown.Item
                            as={Link}
                            to={submenuitem.link}
                            onClick={(expandedMenu) => onClick(!expandedMenu)}
                          >
                            {/* Third Level menu item */}
                            {submenuitem.menuitem}
                          </NavDropdown.Item>
                        )}
                      </Fragment>
                    );
                  }
                })}
              </NavDropdown>
            );
          }
        }
      })}
    </NavDropdown>
  );
};

NavDropdownMain.propTypes = {
  onClick: PropTypes.func,
  item: PropTypes.shape({
    id: PropTypes.string,
    link: PropTypes.string,
    menuitem: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        link: PropTypes.string,
        menuitem: PropTypes.string,
        children: PropTypes.element,
      })
    ),
  }),
};

export default NavDropdownMain;

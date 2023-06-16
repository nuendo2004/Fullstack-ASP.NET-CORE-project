import React, { Fragment, useEffect } from "react";
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import FooterWithLinks from "layouts/marketing/footers/FooterWithLinks";
import PropTypes from "prop-types";

const LayoutFooterLinks = (props) => {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
  });

  return (
    <Fragment>
      <NavbarDefault login />
      {props.children}
      <FooterWithLinks />
    </Fragment>
  );
};

LayoutFooterLinks.propTypes = {
  children: PropTypes.string,
};

export default LayoutFooterLinks;

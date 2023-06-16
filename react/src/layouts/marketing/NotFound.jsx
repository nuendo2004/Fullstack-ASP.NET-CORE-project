import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import NavbarBrandOnly from "layouts/marketing/navbars/NavbarBrandOnly";
import FooterWithSocialIcons from "layouts/marketing/footers/FooterWithSocialIcons";
import PropTypes from "prop-types";

const NotFound = (props) => {
  useEffect(() => {
    document.body.style.backgroundColor = "white";
  });

  return (
    <div id="db-wrapper" className="bg-white">
      <Container className="d-flex flex-column">
        <NavbarBrandOnly />
        {props.children}
        <FooterWithSocialIcons />
      </Container>
    </div>
  );
};

NotFound.propTypes = {
  children: PropTypes.string,
};

export default NotFound;

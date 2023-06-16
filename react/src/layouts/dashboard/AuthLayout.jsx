import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";

const AuthLayout = (props) => {
  return (
    <div id="db-wrapper">
      <Container className="d-flex flex-column">{props.children}</Container>
    </div>
  );
};

AuthLayout.propTypes = {
  children: PropTypes.string,
};

export default AuthLayout;

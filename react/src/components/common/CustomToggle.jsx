import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <Link
    to=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </Link>
));

CustomToggle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CustomToggle;

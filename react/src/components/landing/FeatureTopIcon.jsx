import React from "react";
import PropTypes from "prop-types";

const FeatureTopIcon = ({ item }) => {
  return (
    <div className="mb-4">
      <div className="display-4 text-primary text-light">
        <i className={`fe fe-${item.icon}`}></i>
      </div>
      <div className="mt-4">
        <h3>{item.title}</h3>
        <p className="fs-4">{item.description}</p>
      </div>
    </div>
  );
};

FeatureTopIcon.propTypes = {
  item: PropTypes.shape({
    icon: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
};

export default FeatureTopIcon;

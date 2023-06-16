import React from "react";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";

const FeatureTopIconWithLink = ({ item, className }) => {
  return (
    <Fragment>
      <div className={`border-bottom-md-0 mb-3 mb-lg-0 ${className}`}>
        <div className="p-5">
          <div className="mb-4">{item.icon}</div>
          <h3 className="fw-semi-bold">
            <Link to={item.link} className="text-inherit">
              {item.title}
            </Link>
          </h3>
          <p>{item.description}</p>
          <Link to={item.link} className="link-primary fw-semi-bold">
            {item.linkname}
            <Icon
              path={mdiArrowRight}
              className="text-primary ms-1"
              size={0.6}
            />
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

FeatureTopIconWithLink.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    linkname: PropTypes.string.isRequired,
  }),
  className: PropTypes.string,
};

export default FeatureTopIconWithLink;

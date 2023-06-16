import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function GKBreadcrumb({ breadcrumb }) {
  return (
    <React.Fragment>
      <Breadcrumb>
        {breadcrumb?.map((item, id) => {
          return (
            <Breadcrumb.Item
              key={`BCI_${item.id}`}
              active={id === breadcrumb.length - 1 ? true : false}
            >
              {id === breadcrumb.length - 1 ? (
                item.page
              ) : (
                <Link to={item.link}>{item.page}</Link>
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </React.Fragment>
  );
}

GKBreadcrumb.propTypes = {
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      link: PropTypes.string.isRequired,
      page: PropTypes.string.isRequired,
    })
  ),
};

export default GKBreadcrumb;

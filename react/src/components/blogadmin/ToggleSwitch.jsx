import React from "react";
import PropTypes from "prop-types";
import "./toggleswitch.css";

const ToggleSwitch = (props) => {
  const removeBlog = (id) => {
    var filteredBlog = [...this.state.blog];
    var index = filteredBlog.indexOf(id.target.value);
    if (index !== -1) {
      filteredBlog.splice(index, 1);
      this.setState({ blog: filteredBlog });
    }
  };

  const { isApproved, toggleHandler } = props;
  const guide = "Click to";

  return (
    <div className="container-toggle">
      {guide}{" "}
      <div className="toggle-switch">
        <input
          type="checkbox"
          className="checkbox-toggle"
          name={props.id}
          defaultChecked={isApproved}
          onChange={toggleHandler}
          filter={removeBlog}
          id={props.id}
        />        
        <label className="tag-toggle" htmlFor={props.id}>
          <span className="inner-toggle" />
          <span className="switch-toggle" />
        </label>
      </div>
    </div>
  );
};

ToggleSwitch.propTypes = {
  toggleHandler: PropTypes.func.isRequired,
  isApproved: PropTypes.bool.isRequired,
  filter: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default ToggleSwitch;


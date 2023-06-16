import { React, useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import logger from "sabio-debug";
import userService from "services/userService";
import toastr from "toastr";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Files from "./Files";
import PropTypes from "prop-types";

const _logger = logger.extend("typeAhead");

function UsersTypeAheadFilter(props) {
  const [userData, setUserData] = useState({
    users: [],
    options: [],
    currentUser: "",
    user: {},
  });

  useEffect(() => {
    userService.getAll().then(onGetUsersSuccess).catch(onGetUsersError);
  }, []);

  const onGetUsersSuccess = (response) => {
    toastr.success("Users Incoming!");
    let users = response.items;

    setUserData((prevState) => {
      let mappedUsers = { ...prevState };
      mappedUsers.users = users;
      return mappedUsers;
    });
  };

  const onGetUsersError = (error) => {
    toastr.error("Unable to retreive users");
    _logger(error);
  };

  const onChange = (value) => {
    let users = value;
    setUserData((prevState) => {
      let newUsers = { ...prevState };
        newUsers.user = users;
      return newUsers;
    });
  };

  const filterByUser = () => {
    _logger("trying to filter.")
  }

  return (
    <div className="container-flex">
      <Typeahead
        id="custom-selections-example"
        multiple
        onChange={onChange}
        options={userData.users}
        labelKey={(option) => `${option.firstName} ${option.lastName}`}
        placeholder="Search for user..."
        onKeyDown={filterByUser}
      />
      <Files currentUser={props.currentUser} users={userData.user} />
    </div>
  );
}
UsersTypeAheadFilter.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default UsersTypeAheadFilter;

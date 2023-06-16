import React, { Fragment, Suspense } from "react";
import PropTypes from "prop-types";
import NavbarDefault from "layouts/marketing/navbars/NavbarDefault";
import debug from "sabio-debug";
const _logger = debug.extend("Default Layout");

const loading = () => <div className="">loading....</div>;

const DefaultLayout = (props) => {
  _logger(" Layout: ", props);

  return (
    <Suspense fallback={loading()}>
      <Fragment>
        <NavbarDefault loggedInUser={props.currentUser} />
        {props.children}
      </Fragment>
    </Suspense>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.shape({}).isRequired,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }),
};

export default DefaultLayout;

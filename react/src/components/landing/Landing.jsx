import React from "react";
import { Fragment } from "react";
import Features4Columns from "./Features4Columns";
import HeroTyped from "./HeroTyped";
import NewsletterSubscriptionForm from "components/newsletters/NewsletterSubcriptionForm";
import sabioDebug from "sabio-debug";
import PropTypes from "prop-types";

const _logger = sabioDebug.extend("landing");

const Landing = (props) => {
  _logger("landing props =>", props);

  return (
    <Fragment>
      <div>
        <HeroTyped />
        <Features4Columns />
        <NewsletterSubscriptionForm />
      </div>
    </Fragment>
  );
};
Landing.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
  }),
};
export default Landing;

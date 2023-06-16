import UserLayout from "components/usersettings/UserLayout";
import React, { Fragment, useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import SubscriptionCard from "./trial/SubscriptionCard";
import demoAccountsService from "services/demoAccountsService";
import Swal from "sweetalert2";

const _logger = debug.extend("DemoAccountList");

const SubscriptionsList = (props) => {
  const currentUser = props.currentUser;
  const userEmail = props.currentUser.email;
  _logger("Current User ----> ", currentUser);
  _logger("Current Email ----> ", userEmail);
  const [subscriptionCard, setSubscriptionCard] = useState({
    subCarArray: [],
    show: false,
  });

  useEffect(() => {
    demoAccountsService
      .getDemoByUserId(currentUser.id)
      .then(onGetDemoSuccess)
      .catch(onGetDemoError);
  }, [subscriptionCard.show]);

  const onGetDemoSuccess = (response) => {
    const subscription = response.items;

    setSubscriptionCard((prevState) => {
      const subCardData = { ...prevState };
      subCardData.subCarArray = subscription.map(mapSubCard);
      _logger("Card Data: ", subCardData);

      return subCardData;
    });
    _logger("Mapped Card Data: ", subscription);
  };

  const onGetDemoError = (error) => {
    _logger(error);
    return error;
  };

  const mapSubCard = (subscription, index) => {
    return <SubscriptionCard subscription={subscription} key={index} />
  };

  const createDemoAccount = (e) => {
    e.preventDefault();

    if (subscriptionCard?.subCarArray.length === 0) {
      Swal.fire({
        title: "Begin 30-Day Trial?",
        text: "To begin your trial, Click Start Trial, or Cancel to return to menu.",
        icon: "question",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Start Trial",
        showCancelButton: true,
        preConfirm: () => {
          return demoAccountsService
            .createAccount(userEmail)
            .then(onAddDemoSuccess)
            .catch(onAddDemoError);
        },
      });
    } else {
      Swal.fire({
        title: "Error!",
        text: `One 30-Day Trial allowed per customer!`,
        icon: "error",
      });
    }
  };

  const onAddDemoSuccess = () => {
    Swal.fire({
      title: "Success!",
      text: `Congratulations ${currentUser.firstName}, you have successfully started your free trial! Please log in again.`,
      icon: "success",
      confirmButtonText: "Next",
      preConfirm: () => {
        setSubscriptionCard((prevState) => {
          const update = { ...prevState };
          update.show = true;
          return update;
        });
      },
    });
  };

  const onAddDemoError = () => {
    Swal.fire({
      title: "Error!",
      text: `Error starting free trial, please try again later.`,
      icon: "error",
    });
  };

  const navigate = useNavigate();

  return (
    <Fragment>
      <UserLayout>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <Card className="border-0">
            <Card.Header className="d-lg-flex justify-content-between align-items-center">
              <div className="mb-3 mb-lg-0">
                <h3 className="mb-0">My Subscriptions</h3>
                <p className="mb-0">
                  Here is list of package/product that you have subscribed.
                </p>
              </div>
              <div>
                {subscriptionCard?.subCarArray.length === 0 && (
                  <Button
                    onClick={createDemoAccount}
                    className="btn btn-success btn-sm me-1"
                  >
                    Try Free
                  </Button>
                )}
                {subscriptionCard?.subCarArray.length === 0 && (
                  <Button
                    onClick={() => navigate("/subscription")}
                    className="btn btn-primary btn-sm"
                  >
                    Upgrade Now
                  </Button>
                )}
              </div>
            </Card.Header>
          </Card>
          <div>{subscriptionCard.subCarArray.map(mapSubCard)}</div>
        </div>
      </UserLayout>
    </Fragment>
  );
};

SubscriptionsList.propTypes = {
  children: PropTypes.string,
  currentUser: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    currentOrgId: PropTypes.number.isRequired,
    organizations: PropTypes.arrayOf(PropTypes.number).isRequired,
    email: PropTypes.string.isRequired,
  }),
};

export default SubscriptionsList;

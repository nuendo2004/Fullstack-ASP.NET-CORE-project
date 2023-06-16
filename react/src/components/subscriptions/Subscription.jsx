import React, { Fragment, useEffect, useState } from "react";
import sessionService from "../../services/sessionService";
import debug from "sabio-debug";
import toastr from "toastr";
import SubscriptionCard from "../subscriptions/SubscriptionCard";

const _logger = debug.extend("Subscribe");

function Subscription() {
  const [subs, setSubs] = useState({
    subscriptions: [],
    subComponent: [],
  });

  useEffect(() => {
    sessionService
      .getSubs()
      .then(onGetSubscribeData)
      .catch(onGetSubscribeDataError);
  }, []);

  const mapSub = (aSub) => {
    return <SubscriptionCard subscribe={aSub} key={"ListA-" + aSub.priceId} />;
  };

  const onGetSubscribeData = async (response) => {
    let subscriptions = response.items;

    setSubs((prevState) => {
      const sub = { ...prevState };
      sub.subscriptions = subscriptions;
      sub.subComponent = subscriptions.map(mapSub);
      return sub;
    });
  };

  const onGetSubscribeDataError = (error) => {
    if (error) {
      _logger(error.message);
      toastr.error("Something went wrong!", "Checkout Failed!");
    }
  };

  return (
    <Fragment>
      <div className="py-lg-8 py-8 bg-primary">
        <div className="container">
          <div className="align-items-center row">
            <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 offset-xl-2">
              <div className="text-center mb-6 px-md-8">
                <h1 className="text-white display-2 fw-bold">
                  Immersed Cyber Security
                </h1>
                <p className="text-white lead mb-4">
                  Subscription plans fit for what your organization needs!
                  Unlock more zones and features with the higher tier
                  subscriptions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="container-fluid">
          <div className="row ml-n5">
            <div className="col-2"></div>
            <div className="col">
              <div className="mt-n8 row">{subs.subComponent}</div>
            </div>
            <div className="col-2"></div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Subscription;

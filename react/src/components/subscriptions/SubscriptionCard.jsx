import React from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import sessionService from "../../services/sessionService";
import { loadStripe } from "@stripe/stripe-js";
import toastr from "toastr";
import "./subscriptioncard.css";
import { Badge } from "react-bootstrap";
import logo from "assets/images/brand/logo/immersedlogo.png";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

function SubscriptionCard(props) {
  const _logger = debug.extend("card");
  const aSub = props.subscribe;

  const onSubscribeClicked = (e) => {
    e.preventDefault();
    _logger(e.target.id);
    sessionService
      .createSubscription(e.target.id)
      .then(onSubscribeSuccess)
      .catch(onSubscribeError);
  };

  const onSubscribeSuccess = async (response) => {
    const stripe = await stripePromise;
    return stripe.redirectToCheckout({
      sessionId: response.item,
    });
  };

  const onSubscribeError = (error) => {
    if (error) {
      _logger(error.message);
      toastr.error("Something went wrong!", "Checkout Failed!");
    }
  };

  return (
    <div className="col-lg-4 col-md-12 col-sm-12">
      <div className="border-0 mb-3 card stripeCard">
        <div className="badgeThree">
          {aSub.id > 2 && <Badge bg="gray-600">Recommended</Badge>}
        </div>
        <div className="p-0 card-body">
          <div className="p-5 text-center">
            <img src={logo} alt="" className="mb-3" />
            <div className="mb-4">
              <h2 className="fw-bold">{aSub.name}</h2>
              <p className="mb-0"></p>
            </div>
            <div className="d-flex justify-content-center mb-3">
              <span name="price" className="h3 mb-0 fw-bold stripePrice">
                ${aSub.price}
              </span>
              <span className="align-self-center mb-1 ms-2 toggle-price-content"></span>
            </div>
            <div className="d-grid"></div>
          </div>
          <hr className="m-0" />
          <div className="p-5">
            <h4 className="fw-bold mb-4 text-center">{aSub.description}</h4>
          </div>
        </div>
        <button
          type="submit"
          name="subButton"
          className="btn btn-primary subButton"
          id={aSub.priceId}
          onClick={onSubscribeClicked}
        >
          Subscribe
        </button>
      </div>
    </div>
  );
}

SubscriptionCard.propTypes = {
  subscribe: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    productId: PropTypes.string,
    priceId: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
  }),
};

export default SubscriptionCard;

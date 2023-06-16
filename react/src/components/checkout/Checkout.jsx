import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import stripeService from "../../services/stripeService";
import debug from "sabio-debug";
import toastr from "toastr";

const _logger = debug.extend("Checkout");

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY);

function Checkout() {
  const handleSubmit = (e) => {
    e.preventDefault();

    stripeService
      .createSession()
      .then(onGetSessionSuccess)
      .catch(onGetSessionError);
  };

  const onGetSessionSuccess = async (response) => {
    const stripe = await stripePromise;
    return stripe.redirectToCheckout({
      sessionId: response.item,
    });
  };

  const onGetSessionError = (error) => {
    if (error) {
      _logger(error.message);
      toastr.error("Something went wrong!", "Checkout Failed!");
    }
  };

  return (
    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
      CheckOut
    </button>
  );
}

export default Checkout;

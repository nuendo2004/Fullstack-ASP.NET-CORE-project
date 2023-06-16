import React, { useEffect, Fragment } from "react";
import { useLocation } from "react-router-dom";
import invoiceService from "../../services/invoiceService";
import debug from "sabio-debug";
import toastr from "toastr";
import swal from "sweetalert2";

const _logger = debug.extend("invoice");

function SuccessPage() {
  const location = useLocation();
  useEffect(() => {
    _logger("from session?", { ...location?.state });
    invoiceService
      .getInvoices(location?.state?.customerId)
      .then(onGetSuccess)
      .catch(onGetError);
  }, [location?.state]);

  const onGetSuccess = (response) => {
    _logger("did this work", response.item[0].hostedInvoiceUrl);

    swal
      .fire({
        title: "Subscription Purchased!",
        text: "Click the receipt button to view receipt or to download it as a pdf. You will also be redirected back to the Home page.",
        icon: "success",
        confirmButtonText: "Receipt",
      })
      .then(function () {
        window.open(response.item[0].hostedInvoiceUrl, "_blank");
        window.location.href = "/";
      });
  };

  const onGetError = (error) => {
    if (error) {
      _logger(error.message);
      toastr.error("Something went wrong!", "Checkout Failed!");
    }
  };

  return (
    <Fragment>
      <div className="py-lg-15 py-10  mt-n12 bg-colors-gradient"></div>
      <div className="py-lg-15 py-10  mt-n12 bg-colors-gradient"></div>
      <div className="py-lg-15 py-10  mt-n12 bg-colors-gradient"></div>
      <div className="py-lg-15 py-10  mt-n12 bg-colors-gradient"></div>
      <div className="py-lg-15 py-10  mt-n12 bg-colors-gradient"></div>
      <div className="py-lg-15 py-10  mt-n12 bg-colors-gradient"></div>
      <div className="py-lg-15 py-10  mt-n12 bg-colors-gradient"></div>
    </Fragment>
  );
}

export default SuccessPage;

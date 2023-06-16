import React from "react";
import PseudoAdsForm from "./PseudoAdsForm";
import debug from "sabio-debug";

const _logger = debug.extend("AdFormPage");

const PseudoAds = (values) => {
  _logger("PseudoAds", values);

  return (
    <div className="container-page">
      <div>
        <PseudoAdsForm />
      </div>
    </div>
  );
};

export default PseudoAds;
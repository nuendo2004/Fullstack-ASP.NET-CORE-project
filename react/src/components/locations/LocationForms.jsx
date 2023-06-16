import React from "react";
import AddressFormComponent from "./AddressFormComponent";
import debug from "sabio-debug";
import locationService from "../../services/locationService";
import toastr from "toastr";

const _logger = debug.extend("LocationForms");

function LocationForms() {
  const updateLocationForm = (payload) => {
    _logger("updateLocation", payload.id);
    locationService
      .updateLocation(payload, payload.id)
      .then(onUpdateLocationSuccess)
      .catch(onUpdateLocationError);
  };

  const onUpdateLocationSuccess = (response) => {
    _logger(response);
    toastr.success("Your Update Was Successful");
  };

  const onUpdateLocationError = (error) => {
    _logger(error);
    toastr.error("Your Update Failed");
  };

  return (
    <div className="container">
      <AddressFormComponent
        onUpdate={updateLocationForm}
      ></AddressFormComponent>
    </div>
  );
}

export default LocationForms;

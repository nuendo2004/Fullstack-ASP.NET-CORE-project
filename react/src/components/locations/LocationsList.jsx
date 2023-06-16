import React, { useState, useEffect, useCallback } from "react";
import LocationCardComponent from "./LocationCardComponent";
import locationService from "../../services/locationService";
import toastr from "toastr";
import debug from "sabio-debug";

const _logger = debug.extend("LocationList");
function LocationsList() {
  const [userAddressData, setUserAddressData] = useState({
    userAddresses: [],
    userAddressComponent: [],
  });

  useEffect(() => {
    locationService
      .getUserAddresses()
      .then(onRenderAddressSuccess)
      .catch(onRenderAddressError);
  }, []);

  const onRenderAddressSuccess = (response) => {
    let arrayOfAddress = response.data.items;
    setUserAddressData((prevState) => {
      const addressData = { ...prevState };
      addressData.userAddresses = arrayOfAddress;
      addressData.userAddressComponent = arrayOfAddress.map(mapAddressList);
      return addressData;
    });
  };

  const onRenderAddressError = () => {
    toastr.error("Something Went Wrong. Please Refresh");
  };

  const mapAddressList = (anAddress) => {
    return (
      <LocationCardComponent
        address={anAddress}
        key={anAddress.id}
        onDeleteBtnClicked={onDeleteRequest}
      ></LocationCardComponent>
    );
  };

  const onDeleteRequest = useCallback((myAddress) => {
    locationService
      .deleteAddress(myAddress.id)
      .then(onDeleteSuccess(myAddress.id))
      .catch(onDeleteAddressError);
  });

  const onDeleteSuccess = (idToBeDeleted) => {
    setUserAddressData((prevState) => {
      const addressData = { ...prevState };
      addressData.userAddresses = [...addressData.userAddresses];

      const idxOf = addressData.userAddresses.findIndex((address) => {
        let result = false;
        if (address.id === idToBeDeleted) {
          result = true;
        }

        return result;
      });

      if (idxOf >= 0) {
        addressData.userAddresses.splice(idxOf, 1);
        addressData.userAddressComponent =
          addressData.userAddresses.map(mapAddressList);
      }
      return addressData;
    });
  };

  const onDeleteAddressError = (error) => {
    toastr.error("Delete was Unsuccessful");
    _logger("this is error", error);
  };

  return (
    <div className="row justify-content-center">
      {userAddressData.userAddressComponent}
    </div>
  );
}

export default LocationsList;

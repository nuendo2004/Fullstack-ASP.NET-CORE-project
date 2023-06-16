import React from "react";
import { useNavigate } from "react-router-dom";
import propTypes from "prop-types";
import debug from "sabio-debug";
import "./locationstyle.css";

const _logger = debug.extend("LocationCardComponent");

function LocationCardComponent(props) {
  let address = props.address;

  const navigateAddress = useNavigate();

  const onLocalDeleteBtnClicked = () => {
    props.onDeleteBtnClicked(props.address);
  };

  const onEditButtonClicked = () => {
    navigateToAddressForm(address);
  };

  const navigateToAddressForm = (anAddress) => {
    _logger("address for transport", anAddress);
    const stateForTransport = { type: "EDIT_ADDRESS", payload: anAddress };

    navigateAddress("/locationform", { state: stateForTransport });
  };

  return (
    <div className="col-3 mx-10">
      <div className="card addresscard">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9zOpPbqZs76rOYj1dh02Vn3R76Jh0-R63cw&usqp=CAU"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h4 className="card-title fw-bold">
            Location Type: {address.lookUpLocationTypeInfo[0].name}
          </h4>
          <p className="card-text fs-4">
            {address.lineOne} {address.lineTwo}
            <br />
            {address.city}, {address.lookUpStateInfo[0].name}, {address.zip}
          </p>
          <div>
            <button
              type="button"
              className="btn btn-warning col-4 formatbtn"
              onClick={onEditButtonClicked}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger col-4"
              onClick={onLocalDeleteBtnClicked}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
LocationCardComponent.propTypes = {
  address: propTypes.shape({
    lineOne: propTypes.string.isRequired,
    lineTwo: propTypes.string.isRequired,
    city: propTypes.string.isRequired,
    zip: propTypes.string.isRequired,
    latitude: propTypes.number.isRequired,
    longitude: propTypes.number.isRequired,
    lookUpLocationTypeInfo: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
    }),
    lookUpStateInfo: propTypes.shape({
      id: propTypes.number.isRequired,
      name: propTypes.string.isRequired,
    }),
  }),
  onDeleteBtnClicked: propTypes.func.isRequired,
};
export default LocationCardComponent;

import React, { useState, useEffect } from "react";
import { Autocomplete, LoadScript } from "@react-google-maps/api";
import locationService from "../../services/locationService";
import lookUpService from "../../services/lookUpService";
import toastr from "toastr";
import { Formik, Form, ErrorMessage, Field } from "formik";
import locationFormSchema from "schemas/locationFormScheme";
import propTypes from "prop-types";
import debug from "sabio-debug";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const libraries = ["places"];
const componentRestrictions = { country: ["us"] };
const _logger = debug.extend("AddressFormComponent");

function AddressFormComponent(props) {
  const [arrayOfLocationTypes, setLocationType] = useState([]);

  const [arrayOfStates, setArraryOfStates] = useState([]);

  const [autoComplete, setAutoComplete] = useState({});

  const [formData, setFormData] = useState({
    lineOne: "",
    lineTwo: "",
    city: "",
    zip: "",
    locationTypeId: "",
    stateId: "",
    latitude: "",
    longitude: "",
  });

  const { state } = useLocation();

  const navigateToLocationList = useNavigate();

  const onMyLocButtonClicked = () => {
    navigateToAddressForm();
  };

  const navigateToAddressForm = () => {
    navigateToLocationList("/locationslist");
  };

  useEffect(() => {
    let payload = ["LocationTypes"];
    locationService
      .getStates()
      .then(onRenderStatesSuccess)
      .catch(onRenderStatesError);
    lookUpService
      .LookUp(payload)
      .then(onRenderLocationTypeSuccess)
      .catch(onRenderLocationTypeError);

    if (state && state.payload) {
      setFormData((prevState) => {
        let addressFormInfo = { ...prevState };
        return {
          addressFormInfo,
          id: state.payload.id,
          lineOne: state.payload.lineOne,
          lineTwo: state.payload.lineTwo,
          city: state.payload.city,
          zip: state.payload.zip,
          locationTypeId: state.payload.lookUpLocationTypeInfo[0].id,
          stateId: state.payload.lookUpStateInfo[0].id,
          latitude: state.payload.latitude,
          longitude: state.payload.longitude,
        };
      });
    }
  }, []);

  const onRenderStatesSuccess = (response) => {
    let arrayOfStates = response.data.items;

    setArraryOfStates(arrayOfStates);
  };

  const onRenderStatesError = (error) => {
    return error;
  };

  const mapTheseStates = (aState) => {
    return (
      <option key={aState.code} value={aState.id}>
        {aState.code}
      </option>
    );
  };

  const onLoad = (response) => {
    setAutoComplete(response);
  };

  const onPlaceChanged = () => {
    if (autoComplete !== null) {
      var functionResults = fillInAddress();

      setFormData((prevState) => {
        let newAddressObject = {
          ...prevState,
          ...functionResults,
        };

        for (const componentState of arrayOfStates) {
          const codeComponent = componentState.code.trim();

          switch (codeComponent) {
            case functionResults.state: {
              newAddressObject.stateId = componentState.id;
              break;
            }
            default: {
              break;
            }
          }
        }

        return newAddressObject;
      });
    }
  };

  const fillInAddress = () => {
    const place = autoComplete.getPlace();
    let lineOne = "";
    let city = "";
    let zip = "";
    let latitude = place.geometry.location.lat();
    let longitude = place.geometry.location.lng();
    let state = "";
    let lineTwo = "";

    for (const component of place.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case "street_number": {
          lineOne = `${component.long_name} ${lineOne}`;
          break;
        }
        case "route": {
          lineOne += component.short_name;
          break;
        }
        case "postal_code": {
          zip = `${component.long_name}`;
          break;
        }
        case "locality": {
          city = `${component.long_name}`;
          break;
        }
        case "administrative_area_level_1": {
          state = `${component.short_name}`;
          break;
        }
        default: {
          break;
        }
      }
    }
    return { lineOne, city, zip, latitude, longitude, state, lineTwo };
  };

  const onRenderLocationTypeSuccess = (response) => {
    let arrayOfLocationTypes = response.item.locationTypes;

    setLocationType(arrayOfLocationTypes);
  };

  const onRenderLocationTypeError = (error) => {
    return error;
  };

  const mapTheseLocationTypes = (aLocation) => {
    return (
      <option key={aLocation.id} value={aLocation.id}>
        {aLocation.name}
      </option>
    );
  };

  const onSubmitClick = (values) => {
    _logger("logging values", values);

    if (values.id > 0) {
      props.onUpdate(values);
    } else {
      locationService
        .addLocation(values)
        .then(onAddAddressSuccess)
        .catch(onAddAddressError);
    }
  };

  const onAddAddressSuccess = (response) => {
    _logger("on Add Success", response);
    toastr.success("Address Successfully Created!");
    var newLocationId = response.data.item;

    setFormData((prevState) => {
      const stateForUpdate = { ...prevState };
      stateForUpdate.id = newLocationId;

      _logger("stateforupdate", stateForUpdate);

      return stateForUpdate;
    });
  };

  const onAddAddressError = (error) => {
    toastr.error("Error! Review your Address.");
    return error;
  };

  return (
    <div>
      <Formik
        enableReinitialize={true}
        validationSchema={locationFormSchema}
        initialValues={formData}
        onSubmit={onSubmitClick}
      >
        <Form className="row g-3">
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label h1 fw-bold">
              Address Form
            </label>
            <h5 className="fw-bold">Street</h5>
            <LoadScript
              googleMapsApiKey={GOOGLE_MAPS_API_KEY}
              libraries={libraries}
            >
              <Autocomplete
                onLoad={onLoad}
                onPlaceChanged={onPlaceChanged}
                restrictions={componentRestrictions}
              >
                <Field
                  type="text"
                  className="form-control"
                  id="lineOne"
                  name="lineOne"
                  placeholder="1234 Main St"
                />
              </Autocomplete>
            </LoadScript>
            <ErrorMessage
              name="lineOne"
              component="div"
              className="text-danger fw-bold"
            />
            <h5 className="fw-bold mt-3">Unit</h5>
            <Field
              type="text"
              className="form-control"
              id="lineTwo"
              name="lineTwo"
              placeholder="Unit or Suite"
            />
            <h5 className="fw-bold mt-3">City</h5>
            <Field
              type="text"
              className="form-control"
              id="city"
              name="city"
              placeholder="ex Los Angeles"
            />
            <ErrorMessage
              name="city"
              component="div"
              className="text-danger fw-bold"
            />
            <h5 className="fw-bold mt-3">State</h5>
            <Field
              as="select"
              className="form-select text-dark"
              aria-label="States"
              name="stateId"
            >
              <option>Select State</option>
              {arrayOfStates.map(mapTheseStates)}
            </Field>
            <ErrorMessage
              name="stateId"
              component="div"
              className="text-danger fw-bold"
            />
            <h5 className="fw-bold mt-3">Zip Code</h5>
            <Field
              type="text"
              className="form-control"
              id="zip"
              name="zip"
              placeholder="ex 55555"
            />
            <ErrorMessage
              name="zip"
              component="div"
              className="text-danger fw-bold"
            />
            <h5 className="fw-bold mt-3">Location Type</h5>
            <Field
              as="select"
              className="form-select text-dark"
              aria-label="locationTypeId"
              name="locationTypeId"
            >
              <option>Select Location Type</option>
              {arrayOfLocationTypes.map(mapTheseLocationTypes)}
            </Field>
            <ErrorMessage
              name="locationTypeId"
              component="div"
              className="text-danger fw-bold"
            />
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </Form>
      </Formik>
      <div className="d-grid gap-2 mt-3">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onMyLocButtonClicked}
        >
          List My Locations
        </button>
      </div>
    </div>
  );
}

AddressFormComponent.propTypes = {
  onUpdate: propTypes.func.isRequired,
};

export default AddressFormComponent;

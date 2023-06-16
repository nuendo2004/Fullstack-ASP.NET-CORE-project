import React, { useState, useEffect } from "react";
import debug from "sabio-debug";
import { Formik, Field, ErrorMessage, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import { AddZoneFormSchema } from "../../schema/AddZoneFormSchema";
import * as zoneConfigService from "../../services/trainingZones/zoneConfigService";
import { Link } from "react-router-dom";
import { Button, Offcanvas } from "react-bootstrap";

const _logger = debug.extend("AddZoneConfig");

function AddZoneConfig() {
  const [data, setFormData] = useState({
    name: "",
    description: "",
    organizationId: 13,
    spreadLevelId: 1,
    speedCategoryId: 1,
    isDeleted: false,
    createdBy: 8,
  });
  const { state } = useLocation();
  const [speedCategories] = useState(["speedCategories"]);
  const [spread, setspread] = useState({
    spread: [],
    spreadComponents: [],
    spreadDescriptions: [],
  });
  const [speed, setSpeed] = useState({
    speed: [],
    speedComponents: [],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    zoneConfigService
      .getSpeed(speedCategories)
      .then(onGetSpeedSuccess)
      .catch(onGetSpeedError);
    zoneConfigService
      .getSpread()
      .then(onGetSpreadSuccess)
      .catch(onGetSpreadError);

    if (state) {
      _logger(state);
      setFormData(() => {
        const newForm = {
          name: state.payload?.name,
          description: state.payload?.description,
          organizationId: state.payload?.organization.id,
          spreadLevelId: state.payload?.spreadLevel.id,
          speedCategoryId: state.payload?.speedCategory.id,
          isDeleted: false,
          createdBy: state.payload?.createdBy,
          id: state.payload.id,
        };

        return newForm;
      });
    }
  }, []);

  const onGetSpreadSuccess = (response) => {
    _logger(response);
    let spreads = response.items;
    setspread((prevState) => {
      const spreadData = { ...prevState };
      spreadData.spread = spreads;
      spreadData.spreadComponents = spreads.map(mapSpread);
      spreadData.spreadDescriptions = spreads.map(mapSpreadDescription);

      return spreadData;
    });
    return spreads;
  };

  const onGetSpreadError = (response) => {
    toast.error("Records not found", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return response;
  };

  const onGetSpeedSuccess = (response) => {
    _logger(response);
    let speeds = response.item.speedCategories;
    setSpeed((prevState) => {
      const speedData = { ...prevState };
      speedData.speed = speeds;
      speedData.speedComponents = speeds.map(mapSpeed);
      return speedData;
    });
    return speeds;
  };

  const mapSpeed = (speedData) => (
    <option key={speedData.id} value={speedData.id}>
      {speedData.name}
    </option>
  );

  const mapSpread = (spreadData) => (
    <React.Fragment key={spreadData.id}>
      <option value={spreadData.id}>
        {spreadData.name}
      </option>
    </React.Fragment>
  );

  const mapSpreadDescription = (spreadDetails) => (
    <React.Fragment key={spreadDetails.id}>
      <Offcanvas.Body>
        {spreadDetails?.name} : {spreadDetails.description}
      </Offcanvas.Body>
    </React.Fragment>
  );

  const onGetSpeedError = (response) => {
    toast.error("Records not found", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return response;
  };

  const onSubmit = (values) => {
    _logger("From Formik", values);
    _logger("From Initial State", data);
    if (values.id) {
      zoneConfigService
        .updateZone(values)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      zoneConfigService.addZone(values).then(onAddSuccess).catch(onAddError);
    }
  };

  const onAddError = (response) => {
    _logger("error", response);

    toast.error(" Adding configuration faild", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const onAddSuccess = (response) => {
    _logger("success", response);

    if (response.isSuccessful === true) {
      let newZoneId = response.item;
      setFormData((prevState) => {
        let newIdData = { ...prevState };
        newIdData.id = newZoneId;
        _logger(newIdData);
        return newIdData;
      });
      setToggle(!toggle);
    }
    toast.success("👌 You Added successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const onUpdateSuccess = (response) => {
    _logger("success", response);
    toast.success("👌 You Updated successfully", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    setToggle(!toggle);
  };

  const onUpdateError = (response) => {
    _logger("error", response);
    toast.error(" Update has failed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const onClear = () => {
    setFormData(() => {
      const newForm = {
        name: "",
        description: "",
        organizationId: data.organizationId,
        spreadLevelId: "",
        speedCategoryId: "",
        isDeleted: false,
        createdBy: data.createdBy,
      };

      return newForm;
    });
  };
  const onToggleCanv = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <div className="container "></div>
      <h1 className="mt-2 col-5">Zone Configuration Rule</h1>
      <div className="container w-50">
        <Formik
          enableReinitialize={true}
          initialValues={data}
          validationSchema={AddZoneFormSchema}
          onSubmit={onSubmit}
        >
          <Form>
            <div className="form-group">
              <label htmlFor="model">Name</label>
              <Field
                name="name"
                type="text"
                className="form-control"
                id="inputTitle"
                aria-describedby="enterModel"
                placeholder="Enter title"
              />
              <ErrorMessage
                name="name"
                component="div"
                className=".has-error"
              />
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="bio">Description</label>
              <Field
                as="textarea"
                name="description"
                type="description"
                className="form-control"
                id="description"
                placeholder="Enter description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className=".has-error"
              />
            </div>
            <br />
            <div className="form-group">
              <Link htmlFor="spreadLevelId" onClick={onToggleCanv}>
                Spread Level
              </Link>
              <Field
                as="select"
                name="spreadLevelId"
                className="form-select form-select-lg mb-3 text-dark"
                aria-label=".form-select-lg example"
              >
                <option value="">Open this select menu</option>
                {spread.spreadComponents}
              </Field>
              <Offcanvas show={isOpen} onHide={onToggleCanv}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>All Spread Levels</Offcanvas.Title>
                </Offcanvas.Header>
                {spread.spreadDescriptions}
              </Offcanvas>
            </div>
            <div className="form-group">
              <label htmlFor="speedCategoryId">Speed Category</label>
              <Field
                as="select"
                name="speedCategoryId"
                className="form-select form-select-lg mb-3 text-dark"
                aria-label=".form-select-lg example"
              >
                <option value="">Open this select menu</option>
                {speed.speedComponents}
              </Field>
            </div>
            <br />
            <Button type="submit" className="me-1 btn btn-primary">
              Submit
            </Button>
            <Button type="button" onClick={onClear} className="me-1">
              Clear
            </Button>
            <Link
              to="/viewthreats"
              type="button"
              className="me-1 btn btn-primary"
            >
              Go To List
            </Link>
          </Form>
        </Formik>
        <ToastContainer
          position="top-left"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <br />
      </div>
    </React.Fragment>
  );
}

export default AddZoneConfig;

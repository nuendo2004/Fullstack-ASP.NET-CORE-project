import React, { Fragment, useState, useEffect } from "react";
import { Row, Card, Image } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";
import { Formik, Form, Field, ErrorMessage } from "formik";
import consequenceService from "services/consequenceService";
import debug from "sabio-debug";
import toastr from "toastr";
import zonesService from "services/zonesServices";
import lookUpService from "services/lookUpService";
import consequencesSchema from "../../schemas/consequencesSchema";
import actorsEditService from "services/actorsService";

const _logger = debug.extend("Addedit");
let tableName = ["consequenceTypes"];

function ConsequenceAddEdit() {
  const [payload, setPayload] = useState({
    name: "",
    description: "",
    consequenceTypeId: 0,
    actorId: 0,
    zoneId: 0,
    zoneComponents: [],
    consComponents: [],
    actorComponents: [],
  });

  const { state } = useLocation();
  const navigate = useNavigate();
  _logger("State----->", state);

  useEffect(() => {
    zonesService
      .getPaginated(0, 100)
      .then(onGetZoneSuccess)
      .catch(onGetZoneError);
    lookUpService.LookUp(tableName).then(onLookUpSuccess).catch();
    actorsEditService.getAllActors().then(onGetActorSuccess).catch(onGetActorError)
    if (state) {
      setPayload((prevState) => {
        const consequence = { ...prevState };
        const updateConsequence = state.payload;
        consequence.conName = updateConsequence.name;
        consequence.conDescription = updateConsequence.description;
        consequence.consequenceTypeId = updateConsequence.consequenceType.id;
        consequence.actorId = updateConsequence.actorId.id;
        consequence.zoneId = updateConsequence.zoneId.id;
        consequence.id = updateConsequence.id;
        return consequence;
      });
    }
  }, [state]);

  const onGetActorSuccess = (response) => {
    const actor = response.items;
    setPayload((prevState) => {
      let pd = { ...prevState };
      pd.actorComponents = actor.map(mapActors)
      return pd;
    })
  }

  const onGetActorError = (response) => {
    _logger("reaponse on actor error", response)
  }

  const mapActors = (array) => {
    return (<option key={array.id} value={array.id}>{array.name}</option>)
  }

  const handleSubmit = (values, { resetForm }) => {
    _logger("Handle Submit Paylod------>", values);
    if (payload.id) {
      const formUpdateData = {
        id: values.id,
        name: values.conName,
        description: values.conDescription,
        consequenceTypeId: values.consequenceTypeId,
        actorId: values.actorId,
        zoneId: values.zoneId,
      };
      _logger("FormUpdatedata----->", formUpdateData);
      consequenceService
        .updateConsequence(values.id, formUpdateData)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      const formData = {
        name: values.conName,
        description: values.conDescription,
        consequenceTypeId: parseInt(values.consequenceTypeId),
        actorId: parseInt(values.actorId),
        zoneId: parseInt(values.zoneId),
      };
      consequenceService
        .addConsequence(formData)
        .then(onAddSuccess)
        .catch(onAddError);
    }
    resetForm();
  };

  const onUpdateSuccess = (response) => {
    _logger("Success response------>", response);
    toastr.success("Update Successful!");
    navigate("/consequences");
  };
  const onUpdateError = (response) => {
    _logger("Error response------>", response);
    toastr.error("Update Failed.");
  };

  const onAddSuccess = (response) => {
    _logger("Success response------>", response);
    toastr.success("Post Successful!");
    navigate("/consequences");
  };

  const onAddError = (response) => {
    _logger("Error response------>", response);
    toastr.error("Post Failed.");
  };

  const onLookUpSuccess = (response) => {
    const lookUp = response.item.consequenceTypes;
    setPayload((prevState) => {
      let ct = { ...prevState };
      ct.consComponents = lookUp.map(mapLookUp);
      return ct;
    });
  };

  const mapLookUp = (table) => {
    return (
      <option key={table.id} value={table.id}>
        {table.name}
      </option>
    );
  };

  const onGetZoneSuccess = (response) => {
    const zoneData = response.item.pagedItems;
    setPayload((prevState) => {
      let pd = { ...prevState };
      pd.zoneComponents = zoneData.map(mapZone);
      _logger("Pd ------->", pd);
      return pd;
    });
  };

  const onGetZoneError = (response) => {
    _logger("GetZoneError ------->", response);
  };

  const mapZone = (aZone) => {
    return (
      <option key={aZone.id} value={aZone.id}>
        {aZone.name}
      </option>
    );
  };

  return (
    <Fragment>
      <Row className="align-items-center justify-content-center">
        <Card className="align-items-center justify-content-center">
          <div>
            <Link to="/">
              <Image
                src={Logo}
                className="mb-4 w-15 h-15"
                style={{ marginTop: 20 }}
                alt=""
              />
              <h3 className="d-inline pull-right">
                <strong className="text-black">Immersed</strong>
              </h3>
            </Link>
          </div>
          <h1>Consequence Form</h1>
          <div className="container-fluid">
            <Formik
              enableReinitialize={true}
              initialValues={payload}
              onSubmit={handleSubmit}
              validationSchema={consequencesSchema}
            >
              <Form className="w-50 mx-auto" style={{ marginTop: 20 }}>
                <div className="form-group">
                  <label htmlFor="conName">Name</label>
                  <Field
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name of Consequence"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <br />

                <div className="form-group">
                  <label htmlFor="conDescription">Description</label>
                  <Field
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="Decription of Consequence"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <br />

                <div className="form-group">
                  <label htmlFor="consequenceTypeId" className="mx-auto">
                    Consequence Type
                  </label>
                  <Field
                    as="select"
                    name="consequenceTypeId"
                    className="form-select"
                  >
                    <option
                      value="0"
                      label="Select Consequence Type"
                      className="text-muted"
                    ></option>
                    {payload.consComponents}
                  </Field>
                  <ErrorMessage
                    name="consequenceTypeId"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <br />

                <div className="form-group">
                  <label htmlFor="actorId" className="mx-auto">
                    Actor
                  </label>
                  <Field as="select" name="actorId" className="form-select">
                    <option value="0" label="Actor" className="text-muted">
                      Select Actor
                    </option>
                    {payload.actorComponents}
                  </Field>
                  <ErrorMessage
                    name="actorId"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <br />

                <div className="form-group">
                  <label htmlFor="zoneId" className="mx-auto">
                    Zone
                  </label>
                  <Field as="select" name="zoneId" className="form-select">
                    <option value="0" label="Zone" className="text-muted">
                      Select Zone
                    </option>
                    {payload.zoneComponents}
                  </Field>
                  <ErrorMessage
                    name="zoneId"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="form-group">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginTop: 10, marginBottom: 10 }}
                  >
                    {payload.id ? "Update" : "Add"}
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </Card>
      </Row>
    </Fragment>
  );
}

export default ConsequenceAddEdit;

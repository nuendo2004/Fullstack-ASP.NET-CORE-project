import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import lookUpService from "services/lookUpService";
import actorSchema from "../../schemas/ActorsSchema";
import actorService from "../../services/actorsService";
import PropTypes from "prop-types";
import toastr from "toastr";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Col, Row, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import debug from "sabio-debug";
import { useNavigate } from "react-router-dom";
import "./actors.css";

const _logger = debug.extend("ActorsAddFormEdit");
let actorTypeTable = ["actorTypes"];
let statusTypeTable = ["statusTypes"];

function ActorsAddFormEdit(props) {
  const user = props.currentUser;

  const { state } = useLocation();

  const [actorTypes, setActorTypes] = useState({
    actorType: [],
  });

  const [statusTypes, setStatusTypes] = useState({
    statusType: [],
  });

  const [addEditFormData, setAddEditFormData] = useState({
    name: "",
    description: "",
    actorTypeId: 0,
    statusTypeId: 0,
    createdBy: user.id,
    modifiedBy: user.id,
  });

  useEffect(() => {
    if (state?.type === "Actor_Update") {
      setAddEditFormData((prevState) => {
        const newActor = { ...prevState };
        const updateActor = state.payload;
        newActor.name = updateActor.name;
        newActor.description = updateActor.description;
        newActor.actorTypeId = updateActor.actorTypeId.id;
        newActor.statusTypeId = updateActor.statusTypeId.id;
        newActor.createdBy = user.id;
        newActor.modifiedBy = user.id;
        newActor.id = updateActor.id;
        return newActor;
      });
    }
  }, [state]);

  const navigate = useNavigate();
  const goToPage = () => {
    navigate("/actors");
  };

  const handleSubmit = (values, { resetForm }) => {
    const formData = {
      name: values.name,
      description: values.description,
      actorTypeId: parseInt(values.actorTypeId),
      statusTypeId: parseInt(values.statusTypeId),
      createdBy: user.id,
      modifiedBy: user.id,
    };
    if (addEditFormData.id) {
      actorService
        .updateActor(values, addEditFormData.id)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      actorService.addActor(formData).then(onAddSuccess).catch(onAddError);
      resetForm();
    }
    setTimeout(() => {
      goToPage();
    }, 1000);
  };

  const onUpdateSuccess = (res) => {
    _logger(res);
    toastr.success("Actor Updated");
  };

  const onUpdateError = (res) => {
    _logger(res);
    toastr.error("Uh oh, That didn't work out");
  };

  const onAddSuccess = (res) => {
    _logger(res);
    toastr.success("You created an Actor");
  };
  const onAddError = (res) => {
    _logger(res);
    toastr.error("Uh OH! Something Went wrong");
  };

  useEffect(() => {
    lookUpService.LookUp(statusTypeTable).then(onStatusTypeSuccess).catch();
    lookUpService.LookUp(actorTypeTable).then(onActorTypeSuccess).catch();
  }, []);

  const onActorTypeSuccess = (response) => {
    let actorTypes = response.item.actorTypes;
    setActorTypes((prevState) => {
      let mappedActorTypes = { ...prevState };
      mappedActorTypes.actorType = actorTypes.map(mapTypes);
      return mappedActorTypes;
    });
  };

  const onStatusTypeSuccess = (response) => {
    let statusTypes = response.item.statusTypes;
    setStatusTypes((prevState) => {
      let mappedStatusTypes = { ...prevState };
      mappedStatusTypes.statusType = statusTypes.map(mapTypes);
      return mappedStatusTypes;
    });
  };

  const mapTypes = (type) => {
    return (
      <option key={type.id} value={type.id}>
        {type.name}
      </option>
    );
  };

  return (
    <React.Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={12} md={12} className="py-8 py-xl-0">
          <Card className="actor-form">
            <Card.Body className="p-6 actor-form">
              <div className="mb-4">
                <Link to="/">
                  <Image src="" className="mb-4" alt="" />
                </Link>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={addEditFormData}
                validationSchema={actorSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="container-fluid p-4">
                    <div className="row">
                      <div className="mb-4 col-xl-6 col-lg-12 col-md-12">
                        <div className="card p-5">
                          <div className="form-group">
                            <h1 className="mb-1 fw-bold">Add Actor</h1>
                            <div className="mb-3">
                              <label className="form-label " htmlFor="name">
                                Name
                              </label>
                              <Field
                                type="input"
                                name="name"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className="has-error"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <Field
                              component="textarea"
                              rows="2"
                              name="description"
                              className="form-control"
                            />
                            <ErrorMessage
                              name="description"
                              component="div"
                              className="has-error"
                            />
                          </div>
                          <br />
                          <div className="form-group mb-4">
                            <div>
                              <label htmlFor="actorTypeId">
                                Select ActorType{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <Field
                              as="select"
                              name="actorTypeId"
                              aria-describedby="enterModel"
                              className="form-group form-select text-dark"
                            >
                              <option
                                value="0"
                                label="Actor Types"
                                className="text-muted"
                              ></option>
                              {actorTypes.actorType}
                            </Field>
                            <ErrorMessage
                              name="actorTypeId"
                              component="div"
                              className="has-error text-danger"
                            />
                          </div>
                          <div className="form-group">
                            <div>
                              <label htmlFor="StatusTypeId">
                                Select StatusType{" "}
                                <span className="text-danger">*</span>
                              </label>
                            </div>
                            <Field
                              as="select"
                              name="statusTypeId"
                              aria-describedby="enterModel"
                              className="form-group form-select text-dark"
                            >
                              <option
                                value="0"
                                label="Actor Status"
                                className="text-muted"
                              ></option>
                              {statusTypes.statusType}
                            </Field>
                            <ErrorMessage
                              name="statusTypeId"
                              component="div"
                              className="has-error text-danger"
                            />
                          </div>
                          <br />
                        </div>
                      </div>
                      <div className="mb-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-sm"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              </Formik>
              <br />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

ActorsAddFormEdit.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    lastName: PropTypes.string.isRequired,
    roles: PropTypes.instanceOf(Array).isRequired,
  }).isRequired,
};

export default ActorsAddFormEdit;

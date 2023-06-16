import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Card } from "react-bootstrap";
import zoneGroupService from "../../services/zoneGroupService";
import AddZoneGroupSchema from "../../schemas/addZoneGroupSchema";
import toastr from "toastr";

import debug from "sabio-debug";

const _logger = debug.extend("AddZoneGroup");

function AddZoneGroup() {
  const [zoneGroupFormData, setZoneGroupFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    zoneId: 0,
    entityTypeId: 0,
    groupAdminId: 0,
  });

  const onSubmit = (values) => {
    let payload = values;
    payload.zoneId = parseInt(payload.zoneId);
    payload.entityTypeId = parseInt(payload.entityTypeId);
    payload.groupAdminId = parseInt(payload.groupAdminId);
    if (zoneGroupFormData.id) {
      zoneGroupService
        .updateZoneGroup(payload, zoneGroupFormData.id)
        .then(onUpdateSuccess)
        .catch(onUpdateError);
    } else {
      zoneGroupService
        .addZoneGroup(payload)
        .then(onAddSuccess)
        .catch(onAddError);
    }
  };

  const onAddSuccess = (response) => {
    setZoneGroupFormData((prevState) => {
      const addNewZoneGroup = { ...prevState };
      addNewZoneGroup.id = response.item;
      return addNewZoneGroup;
    });
    _logger("add success", response);
    toastr.success("Zone Group Successfully Added!");
  };

  const onAddError = (error) => {
    _logger("add error", error);
    toastr.error("Error: Failed to Add Zone Group");
  };

  const onUpdateSuccess = (response) => {
    _logger("update success", response);
    toastr.success("Zone Group Successfully Updated!");
  };

  const onUpdateError = (error) => {
    _logger("update error", error);
    toastr.error("Error: Failed to Update Zone Group");
  };

  return (
    <React.Fragment>
      <div className="align-items-center justify-content-center g-0 min-vh-100 row">
        <div className="py-8 py-xl-0 col-lg-5 col-md-5">
          <Card className="mb-3 ">
            <Card.Header className="border-bottom px-4 py-3">
              <h1 className="mb-0" style={{ textAlign: "center" }}>
                Create a Zone Group
              </h1>
            </Card.Header>
            <Card.Body className="mb-3">
              <h3 style={{ textAlign: "center" }}>Basic Information</h3>
              <div className="container">
                <Formik
                  enableReinitialize={false}
                  initialValues={zoneGroupFormData}
                  validationSchema={AddZoneGroupSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="form-group">
                      <label htmlFor="Name" className="pt-3">
                        Name <span className="text-danger">*</span>
                      </label>
                      <Field
                        name="name"
                        type="text"
                        className="form-control"
                        id="Name"
                        aria-describedby="enterModel"
                        placeholder="Zone Group Name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="Description" className="pt-3">
                        Description{" "}
                        <span className="text-muted">(Optional)</span>
                      </label>
                      <Field
                        as="textarea"
                        name="description"
                        type="Description"
                        className="form-control"
                        id="Description"
                        placeholder="What's this Zone Group about?"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="ImageUrl" className="pt-3">
                        Photo <span className="text-muted">(Optional)</span>
                      </label>
                      <Field
                        name="imageUrl"
                        type="text"
                        className="form-control"
                        id="ImageUrl"
                        aria-describedby="enterModel"
                        placeholder="Upload a photo with an Image URL"
                      />
                      <ErrorMessage
                        name="imageUrl"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group">
                      <div>
                        <label htmlFor="ZoneId" className="pt-3">
                          Zone <span className="text-danger">*</span>
                        </label>
                      </div>
                      <Field
                        as="select"
                        name="zoneId"
                        aria-describedby="enterModel"
                        className="form-group form-select text-dark"
                      >
                        <option value="" className="text-muted">
                          Select a Zone
                        </option>
                        <option value={2} className="text-dark">
                          ZoneId #2
                        </option>
                        <option value={3} className="text-dark">
                          ZoneId #3
                        </option>
                        <option value={4} className="text-dark">
                          ZoneId #4
                        </option>
                      </Field>
                      <ErrorMessage
                        name="zoneId"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group">
                      <div>
                        <label htmlFor="EntityTypeId" className="pt-3">
                          Entity Type <span className="text-danger">*</span>
                        </label>
                      </div>
                      <Field
                        as="select"
                        name="entityTypeId"
                        aria-describedby="enterModel"
                        className="form-group form-select text-dark"
                      >
                        <option value="" className="text-muted">
                          Select an Entity Type
                        </option>
                        <option value={1} className="text-dark">
                          Users
                        </option>
                        <option value={2} className="text-dark">
                          Actors
                        </option>
                        <option value={3} className="text-dark">
                          Trainees
                        </option>
                        <option value={4} className="text-dark">
                          OrgStaff
                        </option>
                        <option value={5} className="text-dark">
                          TaskEvent
                        </option>
                        <option value={6} className="text-dark">
                          Zones
                        </option>
                        <option value={7} className="text-dark">
                          Blogs
                        </option>
                        <option value={8} className="text-dark">
                          Newsletters
                        </option>
                      </Field>
                      <ErrorMessage
                        name="entityTypeId"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group">
                      <div>
                        <label htmlFor="GroupAdminId" className="pt-3">
                          Group Admin <span className="text-danger">*</span>
                        </label>
                      </div>
                      <Field
                        as="select"
                        name="groupAdminId"
                        aria-describedby="enterModel"
                        className="form-group form-select text-dark"
                      >
                        <option value="" className="text-muted">
                          Select a Group Admin
                        </option>
                        <option value={8} className="text-dark">
                          UserId #8
                        </option>
                      </Field>
                      <ErrorMessage
                        name="groupAdminId"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="pt-5 mb-0 d-grid gap-2 col-lg-12 col-md-12">
                      <Button type="submit" className="btn btn-primary">
                        Submit
                      </Button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export default AddZoneGroup;

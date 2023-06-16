import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import zoneGroupService from "../../services/zoneGroupService";
import AddZoneGroupSchema from "../../schemas/addZoneGroupSchema";
import DropZone from "components/filemanager/DropZone";
import toastr from "toastr";

import debug from "sabio-debug";
const _logger = debug.extend("AddZoneGroup");

function AddZoneGroupIntegrated() {
  const [zoneGroupFormData, setZoneGroupFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    zoneId: 56,
    entityTypeId: 1,
    groupAdminId: 91,
  });

  const onSubmit = (values) => {
    _logger(values, "onSubmit(values)");
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

  const onChangePicture = (setFieldValue, fileList) => {
    _logger(fileList, "onChangePicture -fileList");
    if (setFieldValue && fileList?.length > 0) {
      setFieldValue("imageUrl", fileList[0].url);
      _logger(fileList[0].url, "target dropZoneUrl");
    }
  };

  return (
    <React.Fragment>
      <div className="container">
        <Formik
          enableReinitialize={false}
          initialValues={zoneGroupFormData}
          validationSchema={AddZoneGroupSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="card">
                <div className="card-header border-primary">
                  <h1
                    className="mb-1 pt-4 fw-bolder"
                    style={{ textAlign: "center" }}
                  >
                    Space Invaders
                  </h1>
                  <h2 className="mb-3 pt-1" style={{ textAlign: "center" }}>
                    Create a New Group
                  </h2>
                </div>
                <div className="card-header border-primary">
                  <div className="form-group">
                    <label htmlFor="Name" className="pt-4 pb-3">
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
                    <label htmlFor="Description" className="pt-3 pb-3">
                      Description <span className="text-muted">(Optional)</span>
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
                  <div className="form-group pb-3">
                    <label htmlFor="ImageUrl" className="pt-3">
                      Photo <span className="text-muted">(Optional)</span>
                    </label>
                    <DropZone
                      onFileSuccess={(response) =>
                        onChangePicture(setFieldValue, response)
                      }
                    />
                  </div>{" "}
                </div>
                <div className="card-footer">
                  <div className="pt-4 mb-4 d-grid gap-2 col-lg-12 col-md-12">
                    <Button type="submit" className="btn btn-primary">
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  );
}

export default AddZoneGroupIntegrated;

import React, { Fragment, useState } from "react";
import { Card, Button, Form, Row } from "react-bootstrap";
import { Formik, Form as FormikForm } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate } from "react-router-dom";
import "./surveybuilder.css";
import surveyService from "services/surveyService";
import lookUpService from "services/lookUpService";
import { useEffect } from "react";
import toastr from "toastr";

function SurveyFormBuilder() {
  const navigate = useNavigate();
  const [lookUpData, setLookUpData] = useState({
    surveyStatus: [],
    surveyTypes: [],
  });

  const mapOptions = (item) => {
    return (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    );
  };

  useEffect(() => {
    lookUpService
      .LookUp(["SurveyStatus", "SurveyTypes"])
      .then(getLookUpSuccess)
      .catch(getLookUpError);
  }, []);

  const getLookUpSuccess = (data) => {
    setLookUpData((prevState) => {
      const ld = { ...prevState };
      ld.surveyStatus = data.item.surveyStatus;
      ld.surveyTypes = data.item.surveyTypes;
      ld.statusComponents = ld.surveyStatus.map(mapOptions);
      ld.typeComponents = ld.surveyTypes.map(mapOptions);
      return ld;
    });
  };

  const getLookUpError = (err) => {
    toastr.error("Failed to retrieve Survey Status and Types.", err);
  };

  const onSubmitClicked = (values) => {
    const payload = {
      name: values.name,
      description: values.description.replace(/<[^>]*>?/gi, ""),
      statusId: values.status,
      surveyTypeId: values.type,
    };

    surveyService
      .addSurvey(payload)
      .then(addSurveySuccess)
      .catch(addSurveyError);
  };

  const addSurveySuccess = (response) => {
    toastr.success("Survey Created", response);
    navigate(`/surveys/builder/${response.item}`);
  };

  const addSurveyError = (err) => {
    toastr.error("Failed to Add Survey.", err);
  };

  return (
    <Fragment>
      <div className="py-lg-6 survey-bg-image">
        <div className="container ms-20">
          <h1 className="text-white mb-1 fs-1 text">
            Build Your Own Survey...
          </h1>
          <p className="mb-0 text-white lead fs-3 text">
            Design surveys, collect responses, and analyze the data like a pro.
          </p>
        </div>
      </div>
      <Row className="g-0 min-vh-100 surveybuilder-bg-image">
        <Formik initialValues={{}} onSubmit={onSubmitClicked}>
          {({ handleSubmit, setFieldValue, handleChange, values }) => (
            <Card className="mb-3">
              <Card.Body>
                <FormikForm onSubmit={handleSubmit}>
                  <Form.Group controlId="formBasicName" className="mb-3">
                    <Form.Label>Survey Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      placeholder="Survey Title"
                    />
                  </Form.Group>

                  <Form.Group controlId="formBasicDescription" className="mb-3">
                    <Form.Label>Survey Description</Form.Label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={values.description}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setFieldValue("description", data);
                      }}
                    />
                    <Form.Text className="text-muted">
                      A brief description of your survey. Maximum of 2000
                      character.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicStatus" className="mb-3">
                    <Form.Label>Survey Status</Form.Label>
                    <Form.Select
                      value={values.status}
                      onChange={(e) => {
                        setFieldValue("status", e.target.value);
                      }}
                    >
                      <option value="">Select Survey Status</option>
                      {lookUpData.statusComponents}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group controlId="formBasicType" className="mb-3">
                    <Form.Label>Survey Type</Form.Label>
                    <Form.Select
                      value={values.type}
                      onChange={(e) => {
                        setFieldValue("type", e.target.value);
                      }}
                    >
                      <option value="">Select Survey Type</option>
                      {lookUpData.typeComponents}
                    </Form.Select>
                  </Form.Group>

                  <Button variant="primary" type="button" className="me-5">
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </FormikForm>
              </Card.Body>
            </Card>
          )}
        </Formik>
      </Row>
    </Fragment>
  );
}

export default SurveyFormBuilder;

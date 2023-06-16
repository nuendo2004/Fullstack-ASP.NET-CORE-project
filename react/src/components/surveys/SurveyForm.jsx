import React, { Fragment, useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { Formik, Form as FormikForm } from "formik";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import PageHeading from "components/common/PageHeading";
import bgImage from "../../assets/images/background/immersedvertical.jpg";
import { useNavigate, useLocation } from "react-router-dom";
import surveyService from "services/surveyService";
import lookUpService from "services/lookUpService";
import { useEffect } from "react";
import toastr from "toastr";

function SurveyForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { item, isEdit } = location.state;

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
      id: item.id,
      name: values.name,
      description: values.description.replace(/<[^>]*>?/gi, ""),
      statusId: values.status,
      surveyTypeId: values.type,
    };

    surveyService
      .updateSurvey(payload)
      .then(updateSurveySuccess)
      .catch(updateSurveyError);
  };

  const updateSurveySuccess = (response) => {
    toastr.success("Survey Updated", response);
  };

  const updateSurveyError = (err) => {
    toastr.error("Failed to Update Survey.", err);
  };

  const OnCancelClicked = () => {
    navigate(`/surveys`);
  };

  return (
    <Fragment>
      <PageHeading pagetitle="Surveys" image={bgImage} />

      <Formik
        initialValues={{
          name: item.name,
          description: item.description,
          status: item.surveyStatus.id,
          type: item.surveyType.id,
        }}
        onSubmit={onSubmitClicked}
      >
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
                    disabled={!isEdit}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicDescription" className="mb-3">
                  <Form.Label>Survey Description</Form.Label>
                  <CKEditor
                    editor={ClassicEditor}
                    data={values.description}
                    disabled={!isEdit}
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
                    disabled={!isEdit}
                  >
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
                    disabled={!isEdit}
                  >
                    {lookUpData.typeComponents}
                  </Form.Select>
                </Form.Group>

                <Button
                  variant="primary"
                  type="button"
                  onClick={OnCancelClicked}
                  className="me-5"
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit" disabled={!isEdit}>
                  Submit
                </Button>
              </FormikForm>
            </Card.Body>
          </Card>
        )}
      </Formik>
    </Fragment>
  );
}

export default SurveyForm;

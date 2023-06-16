import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./sharedstories.css";
import storiesService from "services/storiesService";
import swal from "sweetalert2";
import { useLocation, useParams, useNavigate, Link } from "react-router-dom";
import debug from "sabio-debug";
import addSharedStoriesSchema from "../../schemas/addSharedStoriesSchema";
import DropZone from "components/filemanager/DropZone";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import StoryPreview from "./StoryPreview";
import { Col, Row, Card } from "react-bootstrap";
import { Fragment } from "react";
import Icon from "@mdi/react";
import { mdiFacebook, mdiTwitter, mdiGithub } from "@mdi/js";

const _logger = debug.extend("AddStory");

const StoryForm = () => {
  const [newStory, setNewStory] = useState({
    title: "",
    email: "",
    story: "",
    isApproved: false,
    files: [],
    fileUrl: "",
    agreementCheckbox: "",
  });

  const [storyPreview] = useState({
    storyPreviewMap: [],
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const { state } = useLocation();

  _logger("DataCheck", id, state);

  useEffect(() => {
    _logger("state and useEffect", state);
    if (state) {
      setNewStory(() => {
        let storyData = { ...state.payload };
        return storyData;
      });
    }
  }, []);

  const onSubmitClicked = (values) => {
    if (newStory.id) {
      storiesService
        .storyUpdate(values.id, values)
        .then(onEditStorySuccess)
        .catch(onEditStoryFail);
    } else {
      storiesService
        .storyAdd(values)
        .then(onAddStorySuccess)
        .catch(onAddStoryFail);
    }
  };

  const onAddStorySuccess = (response) => {
    _logger("Add Story", response);
    swal.fire("Your story has been added", "Adding Success");

    setNewStory((prevState) => {
      const pd = { ...prevState };
      pd.id = response.id;
      pd.title = response.title;
      pd.email = response.email;
      pd.fileUrl = response.fileUrl;
      pd.agreementCheckbox = response.agreementCheckbox;
      _logger("pd in setNewStory after add story submit", pd);
      return pd;
    });
    navigate(`/sharedstories`);
  };

  const onAddStoryFail = (error) => {
    _logger(error);
    swal.fire("Your story was not added", "Adding Failure");
  };

  const onEditStorySuccess = (response) => {
    _logger("Edit Story", response);
    swal.fire("Story Updated!", "Edit Success");
  };

  const onEditStoryFail = (error) => {
    swal.fire("Update failed", error);
  };

  const onFileUpload = (files, setFieldValue) => {
    _logger(files);
    setFieldValue("fileUrl", files[0].url);
  };

  return (
    <Fragment>
      <Row className="g-0 min-vh-100 storycreatepg">
        <Col lg={6} md={12} sm={12} className="py-8 py-xl-0 story-form-col">
          <Card>
            <h1 className="display-4 fw-bold storyForm-title">
              Share Your Story..
            </h1>
            <p className="lead text-dark form-description">
              Inspire others by sharing how Immersed has impacted you.
            </p>
            <Card.Body className="p-6 story-card-body">
              <Formik
                enableReinitialize={true}
                initialValues={newStory}
                onSubmit={onSubmitClicked}
                validationSchema={addSharedStoriesSchema}
              >
                {({ setFieldValue, values, errors, touched }) => (
                  <Form>
                    <div className="container story-form">
                      <div className="row">
                        <div className="mb-3 story-title">
                          <label htmlFor="title" className="form-label">
                            Title:<span className="text-danger">*</span>
                          </label>
                          <Field
                            type="title"
                            className="form-control share-title"
                            name="title"
                          />
                          <ErrorMessage
                            name="title"
                            component="div"
                            className="has-error stry-title-val"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="mb-3">
                          <label htmlFor="email" className="form-label">
                            Email:<span className="text-danger">*</span>
                          </label>
                          <Field
                            type="email"
                            className="form-control share-email"
                            name="email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="has-error stry-email-val"
                          />
                        </div>
                      </div>

                      <div className="form-group p-5 fw-bold story-textbox">
                        <label className="addStory-label" htmlFor="story">
                          Add Your Story:
                        </label>
                        <CKEditor
                          name="story"
                          editor={ClassicEditor}
                          data={newStory.story}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            _logger({ event, editor, data });
                            setFieldValue("story", data);
                          }}
                          onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                              writer.setStyle(
                                "height",
                                "200px",
                                editor.editing.view.document.getRoot()
                              );
                            });
                          }}
                        />
                      </div>
                      {errors.story && touched.story ? (
                        <div className="story-error-msg">{errors.story}</div>
                      ) : null}
                      <div>
                        <button
                          className="btn btn-light sh-story-file-btn"
                          type="button"
                        >
                          Upload Documents, Photos, and Videos
                          <DropZone
                            onFileSuccess={(files) =>
                              onFileUpload(files, setFieldValue)
                            }
                          />
                          {values.fileUrl && (
                            <img
                              src={values.fileUrl}
                              alt="uploaded"
                              className="uploaded-image story-img-thumbnail mx-auto d-block"
                            />
                          )}
                          {values.fileUrl?.includes(".mp4") && (
                            <img
                              src="https://cdn.pixabay.com/photo/2015/05/15/09/13/demonstration-767983_1280.jpg"
                              alt="video-preview-img"
                              className="uploaded-storyVideoImg story-videoImg-thumbnail mx-auto d-block"
                            />
                          )}
                        </button>
                      </div>

                      <div className="form-check share-checkbox">
                        <div className="mb-3">
                          <Field
                            type="checkbox"
                            className="form-check-label share-checkbox"
                            name="agreementCheckbox"
                          />{" "}
                          <ErrorMessage
                            name="agreementCheckbox"
                            component="div"
                            className="has-error stry-chkbx-msg"
                          />
                          <label
                            htmlFor="agreementCheckbox"
                            className="form-check-label"
                          >
                            I agree to the
                            <Link to="/pages/terms-and-conditions">
                              {" "}
                              Terms of Service{" "}
                            </Link>{" "}
                            and{" "}
                            <Link to="/pages/terms-and-conditions">
                              Privacy Policy.
                            </Link>
                          </label>
                        </div>
                      </div>
                      <div className="row">
                        <button
                          className="btn btn-primary sh-story-btn"
                          type="submit"
                        >
                          {newStory.id ? "Edit" : "Submit"}
                        </button>
                      </div>
                      <div className="mt-10 story-media-icons">
                        {/*Facebook*/}
                        <Link to="#" className="text-muted me-3">
                          <Icon path={mdiFacebook} size={1} />
                        </Link>
                        {/*Twitter*/}
                        <Link to="#" className="text-muted me-3">
                          <Icon path={mdiTwitter} size={1} />
                        </Link>
                        {/*GitHub*/}
                        <Link to="#" className="text-muted ">
                          <Icon path={mdiGithub} size={1} />
                        </Link>
                      </div>

                      <div className="card preview-story-cd ">
                        <StoryPreview
                          data={{
                            ...values,
                            storyPreview: storyPreview.storyPreviewMap[values],
                          }}
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};
export default StoryForm;

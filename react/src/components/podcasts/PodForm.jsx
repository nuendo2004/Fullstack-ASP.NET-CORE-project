import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as podcastService from "../../services/podcastService";
import PropTypes from "prop-types";
import { Formik, Form as FormikForm, Field } from "formik";
import podcastFormSchema from "../../schemas/podcastFormSchema";
import "./podcasts.css";
import toastr from "toastr";
import debug from "sabio-debug";
import { Card, Form } from "react-bootstrap";

const _logger = debug.extend("EditPodcast");

function PodForm(props) {
  const location = useLocation();
  const { entity } = useParams();
  const navigate = useNavigate();
  _logger("location ->", location, entity);

  const [isEdit, setIsEdit] = useState(false);

  const [podcastInfo, setNewPodcast] = useState({
    image: "",
    audio: "",
    author: "",
    title: "",
    content: "",
    link: "",
    category: "",
    id: "",
    currentUser: "",
  });

  _logger("Aux", setIsEdit, setNewPodcast);

  useEffect(() => {
    _logger("useEffect for data");
    if (location.state) {
      _logger("We should be updating the form");
      const podcastData = location.state.aPodcast;

      setIsEdit(true);

      setNewPodcast((prevState) => {
        const newState = { ...prevState };

        newState.image = podcastData.image;
        newState.author = podcastData.author;
        newState.title = podcastData.title;
        newState.content = podcastData.content;
        newState.link = podcastData.link;
        newState.category = podcastData.category;
        newState.id = podcastData.id;
        newState.audio = podcastData.audio;
        newState.currentUser = podcastData.currentUser;

        return newState;
      });
    }
  }, []);

  const onSaveChanges = (values) => {
    _logger("record updated", values);
    const payload = { ...values };
    payload.currentUser = { ...props.currentUser };
    if (location.state) {
      podcastService
        .updatePodcast("podcasts", payload.id, payload)
        .then(onSuccessChange)
        .catch(onErrorChange);
    } else {
      podcastService
        .addPodcast("podcasts", payload)
        .then(onSuccessAdd)
        .catch(onErrorAdd);
    }
  };

  const onSuccessAdd = (response) => {
    _logger(response);
    toastr["success"]("Add podcast successful");
    navigate("/podcasts");
  };

  const onErrorAdd = (err) => {
    _logger(err);
    toastr["error"]("Add podcast failed");
  };

  const onSuccessChange = (response) => {
    _logger(response);
    toastr["success"]("Successfully edited podcast");
    navigate("/podcasts");
  };

  const onErrorChange = (err) => {
    _logger(err);
    toastr["error"]("Uh oh, something went wrong");
  };

  return (
    <Card className="podcast-form-container">
      <Card.Header className="podcast-form-header">
        {isEdit ? <h1>Edit Podcast</h1> : <h1>Add Podcast</h1>}
      </Card.Header>
      <Card.Body>
        <Formik
          enableReinitialize={true}
          validationSchema={podcastFormSchema}
          initialValues={podcastInfo}
          onSubmit={onSaveChanges}
        >
          <FormikForm>
            <div className="podcast-form-author">
              <Form.Group className="pod-auth-group">
                <Form.Label
                  htmlFor="validationDefault02"
                  className="podcast-author"
                >
                  Author
                </Form.Label>
                <Field
                  type="text"
                  className="form-control"
                  id="author"
                  placeholder="Name of Author"
                  name="author"
                />
              </Form.Group>
            </div>
            <div className="podcast-form-title">
              <Form.Group className="pod-title-group">
                <Form.Label htmlFor="validationDefaultUsername">
                  Title
                </Form.Label>
                <Field
                  type="text"
                  className="form-control"
                  id="Title"
                  placeholder="Podcast Title"
                  name="title"
                />
              </Form.Group>
            </div>
            <div className="podcast-form-content">
              <Form.Group className="pod-content-group">
                <Form.Label htmlFor="validationDefault03">Content</Form.Label>
                <Field
                  type="text"
                  className="form-control"
                  id="Content"
                  placeholder="Content"
                  name="content"
                />
              </Form.Group>
            </div>
            <div className="podcast-form-link">
              <Form.Group className="pod-link-group">
                <Form.Label htmlFor="validationDefault03">Link</Form.Label>
                <Field
                  type="text"
                  className="form-control"
                  id="Link"
                  placeholder="www.podcastlink.com"
                  name="link"
                />
              </Form.Group>
            </div>
            <div className="podcast-form-category">
              <Form.Group className="pod-category-group">
                <Form.Label htmlFor="validationDefault03">Category</Form.Label>
                <Field
                  type="text"
                  className="form-control"
                  id="Category"
                  placeholder="Category"
                  name="category"
                />
              </Form.Group>
            </div>
            <div className="podcast-form-img">
              <Form.Group className="pod-img-group">
                <Form.Label htmlFor="validationDefault02">Image</Form.Label>
                <Field
                  type="text"
                  className="form-control"
                  id="image"
                  placeholder="Image"
                  name="image"
                />
              </Form.Group>
            </div>
            <div className="podcast-form-audio">
              <Form.Group className="pod-aud-group">
                <Form.Label htmlFor="validationDefault02">Audio</Form.Label>
                <Field
                  type="text"
                  className="form-control"
                  id="audio"
                  placeholder="Audio"
                  name="audio"
                />
              </Form.Group>
            </div>
            <button
              className="btn btn-primary save-changes-form-btn"
              type="submit"
            >
              Save Changes
            </button>
          </FormikForm>
        </Formik>
      </Card.Body>
    </Card>
  );
}

PodForm.propTypes = {
  podcastInfo: PropTypes.shape({
    image: PropTypes.string,
    audio: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    link: PropTypes.string,
    category: PropTypes.string.isRequired,
  }),

  currentUser: PropTypes.shape({
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default PodForm;

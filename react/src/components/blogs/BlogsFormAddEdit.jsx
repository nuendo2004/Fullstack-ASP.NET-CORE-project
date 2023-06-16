import React, { Fragment, useState, useEffect } from "react";
import swal from "sweetalert2";
import blogSchema from "../../schemas/blogSchema";
import blogService from "../../services/blogService";
import { Formik, Form, Field, ErrorMessage } from "formik";
import debug from "sabio-debug";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import BlogPreview from "./BlogPreview";
import { useNavigate } from "react-router-dom";
import DropZone from "../filemanager/DropZone";
import { Col, Row, Card, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "assets/images/brand/logo/immersed-spiral-logo.png";
import lookUpService from "services/lookUpService";
import { useParams, useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../blogs/blogForm.css";

const _logger = debug.extend("BlogsFormAddEdit");
let tableName = ["blogTypes"];

function BlogsFormAddEdit() {
  const blogParams = useParams();
  const blogId = blogParams.id;
  const { state } = useLocation()
  const navigate = useNavigate();
  const [addEditBlogData, setAddEditBlogData] = useState({
    title: "",
    subject: "",
    content: "",
    blogTypeId: "",
    imageUrl: "",
    datePublished: "",
    isPublished: false,
  });
  const [blogType, setBlogType] = useState({
    blogIdTypes: [],
    blogTypesMap: {},
  });

  useEffect(() => {
    lookUpService.LookUp(tableName).then(onBlogTypesSuccess).catch();
  }, []);

  useEffect(() => {
    if(state?.aBlog) {
      setAddEditBlogData((prevState) => {
        const blogInfo = {...prevState}
        blogInfo.title = state?.aBlog.title;
        blogInfo.subject = state?.aBlog.subject;
        blogInfo.content = state?.aBlog.content;
        blogInfo.imageUrl = state?.aBlog.imageUrl;
        blogInfo.datePublished = state?.aBlog.datePublished;
        blogInfo.isPublished = state?.aBlog.isPublished;

        return blogInfo
      })
    }
  }, [state])

  useEffect(() => {
    if (!blogType.blogIdTypes.length) return;

    blogService.getById(blogId).then(({ item }) => {
      item.blogTypeId = Object.entries(blogType.blogTypesMap).find(
        ([ blogType ]) => blogType === item.blogType
      )[0];
      item.datePublished = new Date(item.datePublished);
      setAddEditBlogData(item);
    });
  }, [blogType]);

  const mapBlogIdType = (type) => {
    return (
      <option key={type.id} value={type.id}>
        {type.name}
      </option>
    );
  };

  const onBlogTypesSuccess = (response) => {
    let blogTypes = response.item.blogTypes;
    _logger("Types", blogTypes);
    setBlogType((prevState) => {
      let mappedBlogType = { ...prevState };
      mappedBlogType.blogIdTypes = blogTypes.map(mapBlogIdType);
      mappedBlogType.blogTypesMap = blogTypes.reduce((accumulator, type) => {
        accumulator[type.id] = type.name;
        return accumulator;
      }, {});
      return mappedBlogType;
    });
  };
  const onChangePicture = (setFieldValue, items) => {
    _logger(items, "Dropzone component");
    setFieldValue("imageUrl", items[0].url);
    _logger(items[0].url);
  };
  const handleSubmit = (values) => {
    if (blogParams.id) {
      if (!values.id) {
        values.id = blogId;
      }
      blogService
        .editBlog(values, blogId)
        .then(onEditSuccess)
        .catch(onEditError);
    } else {
      blogService.addBlog(values).then(onAddSuccess).catch(onAddError);
    }
  };
  const onAddSuccess = (response) => {
    _logger(response);
    swal
      .fire({
        icon: "success",
        title: "Adding Success",
        text: "Your blog has posted",
      })
      .then(navigate("/blogs"));
  };
  const onAddError = (err) => {
    _logger(err);
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your blog has issue with publishing",
    });
  };
  const onEditSuccess = (response) => {
    _logger(response);
    swal
      .fire({
        icon: "success",
        title: "Editing Success",
        text: "Your blog has updated",
      })
      .then(navigate("/blogs"));
  };
  const onEditError = (err) => {
    _logger(err);
    swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Your blog has issue with updating",
    });
  };
  return (
    <Fragment>
      <Row className="align-items-center justify-content-center g-0 min-vh-100">
        <Col lg={12} md={5} className="py-8 py-xl-0">
          <Card>
            <Card.Body className="p-6">
              <div className="mb-4">
                <Link to="/">
                  <Image src={Logo} className="mb-4 w-15 h-15" alt="" />
                  <h3 className="d-inline pull-right">
                    <strong className="text-black">Immersed</strong>
                  </h3>
                </Link>
              </div>
              <Formik
                enableReinitialize={true}
                initialValues={addEditBlogData}
                validationSchema={blogSchema}
                onSubmit={handleSubmit}
              >
                {({ setFieldValue, values }) => (
                  <Form>
                    <div className="container-fluid p-0">
                      <div className="row">
                        <div className="mb-2 col-xl-6 col-lg-12 col-md-12">
                          <div className="card">
                            <div className="form-group">
                              <Card.Header>
                                {blogParams.id && (
                                  <h2 className="mb-1 fw-bold">Edit Post</h2>
                                )}
                                {!blogParams.id && (
                                  <h2 className="mb-1 fw-bold">Create Post</h2>
                                )}
                              </Card.Header>
                              <div className="p-5 fw-bold">
                                <label
                                  className="form-label"
                                  htmlFor="exampleForm.ControlInput1"
                                >
                                  Title
                                </label>
                                <Field
                                  type="text"
                                  name="title"
                                  className="form-control "
                                />
                                <ErrorMessage
                                  name="title"
                                  component="div"
                                  className="has-error"
                                />
                              </div>
                            </div>
                            <div className="form-group p-5 fw-bold">
                              <label htmlFor="subject">Subject</label>
                              <Field
                                type="text"
                                name="subject"
                                className="form-control"
                              />
                              <ErrorMessage
                                name="subject"
                                component="div"
                                className="has-error"
                              />
                            </div>
                            <div className="form-group p-5 fw-bold">
                              <div>
                                <label htmlFor="BlogTypeId">
                                  Select a Blog Type{" "}
                                  <span className="text-danger">*</span>
                                </label>
                              </div>
                              <Field
                                as="select"
                                name="blogTypeId"
                                aria-describedby="enterModel"
                                className="form-group form-select text-dark"
                              >
                                <option
                                  value="0"
                                  label="Status"
                                  className="text-muted"
                                >
                                  Please select a Blog Type
                                </option>
                                {blogType.blogIdTypes}
                              </Field>
                              <ErrorMessage
                                name="blogTypeId"
                                component="div"
                                className=".has-error text-danger"
                              />
                            </div>

                            <div className="form-group p-5 fw-bold">
                              <label className="form-check-label">
                                <Field
                                  type="checkbox"
                                  className="form-check-input"
                                  name="isPublished"
                                />
                                Is Published
                              </label>
                              <ErrorMessage
                                name="isPublished"
                                component="div"
                                className="has-error"
                              />
                            </div>

                            {values.isPublished ? (
                              <div className="form-group p-5 fw-bold">
                                <label htmlFor="subject">Date Published</label>
                                <DatePicker
                                  name="date"
                                  className="form-control"
                                  onChange={(date) => {
                                    setFieldValue("datePublished", date);
                                  }}
                                  selected={values.datePublished}
                                />
                                <ErrorMessage
                                  name="datepublished"
                                  component="div"
                                  className="has-error"
                                />
                              </div>
                            ) : null}

                            <div className="form-group p-5 fw-bold">
                              <label htmlFor="content">Content</label>
                              <CKEditor
                                editor={ClassicEditor}
                                data={addEditBlogData.content}
                                onChange={(event, editor) => {
                                  const data = editor.getData();
                                  _logger({ event, editor, data });
                                  setFieldValue("content", data);
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
                            <DropZone
                              onFileSuccess={(response) =>
                                onChangePicture(setFieldValue, response)
                              }
                            />
                            {values.imageUrl && (
                              <img
                                src={values.imageUrl}
                                alt="uploaded"
                                className="uploaded-image img-thumbnail mx-auto d-block"
                              />
                            )}
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </div>
                        </div>
                        <div
                          role="tabpanel"
                          className="mb-2 col-xl-6 col-lg-12 col-md-12"
                        >
                          <div className="card">
                            <BlogPreview
                              data={{
                                ...values,
                                blogType:
                                  blogType.blogTypesMap[values.blogTypeId],
                              }}
                            />
                          </div>
                        </div>
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
}
export default BlogsFormAddEdit;

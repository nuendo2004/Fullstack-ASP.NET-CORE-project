import React, { useRef, useState, useEffect, Fragment} from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Col, Row, Card, Button } from "react-bootstrap";
import pseudoAdsService from "../../services/pseudoAdsService";
import AdImageUpload from "./AdImageUpload";
import pseudoValSchema from "../../schemas/pseudoSchema";
import "./pseudo.css";
import toastr from "toastr";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PseudoAdsForm = () => {
  const containerRef = useRef("initialValues");
  const { state } = useLocation();
  const { adId } = useParams();
  const navigate = useNavigate();

  const defaultValues = {
    entityId: 1,
    entityTypeId: 2,
    title: "",
    adMainImageUrl: "",
    details: "",
    actionId: "",
  };

  const [ initialValues, setInitialValues] = useState(defaultValues);

  useEffect(() => {
    if(state?.type === "AD_EDIT")
    {
      setInitialValues(() => {
        return {
          ...state.payload,
            entityTypeId:
              state.payload.entityType.id
      }});
    };
  }, [adId, state]);

  const adSubmitHandler = (adData) => {
    if(adId)
    {
      pseudoAdsService
        .updateAd(adData, adId)
        .then(onEditAdSuccess)
        .catch(onEditAdError);
    }
    else
    {
      pseudoAdsService
        .create(adData)
        .then(onCreateAdSuccess)
        .catch(onCreateAdError);
    };
  };

  const onCreateAdSuccess = (response) => {
    toastr.success("Ad Successfully Created");
    const adId = response.item;

    pseudoAdsService
      .getById(adId)
      .then(onGetAdByIdSuccess)
      .catch(onGetAdByIdError);
  };

  const onGetAdByIdSuccess = (response) => {
    const adId = response.item.id;

    setTimeout(() => {
      toastr.info("<<< Redirect >>> Edit Ad <<<")
      navigate(`/pseudoads/${adId}`, { state:{type: "AD_EDIT", payload: {...response.item}} });
    }, 1200);
  };

  const onEditAdSuccess = () => {
    toastr.success("Ad Successfully Updated");
    
    setTimeout(() => {
      resetForm();
      toastr.info("<<< Redirect >>> Create Ad <<<")
      navigate("/pseudoads/new")
    }, 1200);
  };

  const resetForm = () => {
    setInitialValues(() => {return {...defaultValues}});
  };

  const onCreateAdError = (error) => {
    toastr.error("Ad Create Failed", error);
  };

  const onEditAdError = (error) => {
    toastr.error("Ad Update Failed", error);
  };

  const onGetAdByIdError = (error) => {
    toastr.error("Failed to get Ad by Id", error);
  };

  const handleViewAds = (e) => {
    e.preventDefault();

    navigate("/pseudoads/view");
  };

  return (
    <Fragment>
      <Row className="pseudo-ad-header p-4 mx-4">
        <h1>{adId ? "Edit Ad" : "Create Ad"}</h1>
        <Button 
          onClick={handleViewAds} 
          className="btn-md w-10 align-self-end text-white pseudo-ad-viewBtn"
        >
          View Ads
        </Button>
      </Row>
      <div
        ref={containerRef}
        className="container-fluid p-4 text-center pseudo-container-ref"
      >
        <Formik
          initialValues={initialValues}
          innerRef={containerRef}
          validationSchema={pseudoValSchema}
          enableReinitialize={true}
          onSubmit={adSubmitHandler}
        >
          {({ values, setFieldValue }) => (
            <div
              ref={containerRef}
              className="container-fluid p-4 pseudo-container-ref"
            >
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 pseudo-container-input">
                <Card className="container pseudo-container-input-side">
                  <Col className="pseudo-ad-input-col">
                    <Form className="pseudo-ad-form mx-auto">
                      <Row className="form-ads-image mx-auto">
                        <label className="label-pseudo" htmlFor="adMainImageUrl">
                          Upload Image
                        </label>
                        <AdImageUpload
                          id="adMainImageUrl"
                          name="adMainImageUrl"
                          onFileSuccess={(response) => {
                            const img = response[0]?.url;
                            setFieldValue("adMainImageUrl", img);
                          }}
                        />
                      </Row>

                      <Row className="form-ads-title mx-auto">
                        <label className="label-pseudo" htmlFor="title">
                          Headline
                        </label>
                        <Field
                          className="ads-input-box"
                          id="title"
                          name="title"
                          placeholder="Enter a Headline for your Advertisement"
                          type="text"
                          value={values.title}
                        />
                        <ErrorMessage
                          className="ads-input-error-msg"
                          name="title"
                          component="p"
                        />
                      </Row>

                      <Row className="form-ads-details mx-auto">
                        <label className="label-pseudo mx-auto" htmlFor="details">
                          Ad Content
                        </label>
                        <Row className="ads-editor d-block mx-auto">
                          <CKEditor
                            id="details"
                            name="details"
                            editor={ClassicEditor}
                            data={values.details}
                            onChange={(e, editor) => {
                              const data = editor.getData();
                              setFieldValue("details", data);
                            }}
                          />
                        </Row>
                        <ErrorMessage
                          className="ads-input-error-msg"
                          name="details"
                          component="p"
                        />
                      </Row>

                      <Row className="form-ads-actionId mx-auto">
                        <label className="label-pseudo" htmlFor="actionId">
                          Action ID
                        </label>
                        <Field
                          className="ads-input-box"
                          id="actionId"
                          name="actionId"
                          placeholder="Enter the ActionID associated with your Advertisement"
                          type="text"
                          value={values.actionId}
                        />
                        <ErrorMessage
                          className="ads-input-error-msg"
                          name="actionId"
                          component="p"
                        />
                      </Row>
                      <Button 
                        className="btn btn-primary ads-btn mx-auto" 
                        type="submit"
                      >
                        Submit
                      </Button>
                    </Form>
                  </Col>
                </Card>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 pseudo-container-output">
                <Card className="container pseudo-container-output-side">
                  <Col className="pseudo-ad-output-col">
                    <Row className="pseudo-ad-output-image">
                      <Card.Img
                        className={`pseudo-ad-img-top ${!values.adMainImageUrl ? "d-none" : null}`}
                        src={values.adMainImageUrl}
                        aria-hidden={false}
                        alt="Ad Image"
                      />
                    </Row>
                    <Row className="pseudo-ad-output-title-row">
                      <Card.Header className="pseudo-ad-output-title">
                        <h1>{values.title}</h1>
                      </Card.Header> 
                    </Row>
                    <Row className="pseudo-ad-output-details">
                      <Card.Body>{values.details.replace(/<[^>]*>?/gi, "").replace(/(&nbsp;|<br>|<br\/>)/g, "").replace("amp;", "")}</Card.Body>
                    </Row>
                  </Col>
                </Card>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </Fragment>
  );
};

export default PseudoAdsForm;
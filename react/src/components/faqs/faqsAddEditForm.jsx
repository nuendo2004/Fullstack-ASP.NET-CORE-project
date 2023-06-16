import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button, Card, Container } from "react-bootstrap";
import * as toastr from "toastr";
import faqsService from "../../services/faqsService";
import { addFaqsSchema } from "../../schemas/addFaqsSchema";
import debug from "sabio-debug";
import { useLocation } from "react-router-dom";
import lookUpService from "services/lookUpService";
import HeaderBreadcrumb from "./HeaderBreadcrumb";

function FaqsAddForm() {
  const _logger = debug.extend("AddFaqsForm");
  const location = useLocation();
  let tableName = ["FAQCategories"];

  const [newFaqData, setFaqData] = useState({
    question: "",
    answer: "",
    faqCategoriesId: "",
    sortOrder: "",
    userId: "",
    Id: 0,
  });

  const [formInfo, setFormInfo] = useState({
    categoryIdTypes: [],
  });

  useEffect(() => {
    faqsService.getAllCategorys().then().catch();

    lookUpService
      .LookUp(tableName)
      .then(onCategoryTypeSuccess)
      .catch(onCategoryTypeError);
  }, []);

  const onCategoryTypeSuccess = (response) => {
    let categoryTypes = response.item.categoryTypes;
    _logger("Types", categoryTypes);

    setFormInfo((prevState) => {
      let mappedCategoryType = { ...prevState };
      mappedCategoryType.categoryIdTypes = categoryTypes?.map(mapCategoryType);
      return mappedCategoryType;
    });
  };

  const onCategoryTypeError = (err) => {
    _logger("error", err);
    toastr.error("Failed to select a Category");
  };

  useEffect(() => {
    _logger("location ->", location);

    setFaqData((prevState) => {
      _logger("updater onChange");
      _logger(location.state, "I'm here");
      return {
        ...prevState,
        ...location.state,
      };
    });
  }, [location]);

  const sortOrder = [
    { id: 1, name: "1" },
    { id: 2, name: "2" },
    { id: 3, name: "3" },
    { id: 4, name: "4" },
  ];

  const mapCategoryType = (categorys) => {
    return (
      <option key={`categorys_${categorys.id}`} value={categorys.id}>
        {categorys.name}
      </option>
    );
  };

  const onFaqsSubmit = (newFaqData) => {
    _logger(newFaqData);
    if (newFaqData && newFaqData.id) {
      faqsService
        .faqUpdate(newFaqData.id, newFaqData)
        .then(onEditFaqIdSuccess)
        .catch();
    } else {
      faqsService.faqAdd(newFaqData).then(onAddSuccess).catch(onAddError);
    }
  };
  const onAddSuccess = (response) => {
    _logger(response);
    toastr.success("Faqs have posted", "Add Completed");
    let faqId = response.data.item;

    faqsService
      .editFriendId(newFaqData, faqId)
      .then(onEditFaqIdSuccess)
      .catch();
  };

  const onAddError = (errResponse) => {
    _logger(errResponse);
    toastr.error("Faqs failed to post", "Re-enter information");
  };

  const onEditFaqIdSuccess = (response) => {
    _logger(response);
    _logger("Faqs By Id");
    toastr.success(" Edit Faq Successful");

    return () => {
      _logger("onEditSuccess", response);
      setFaqData((prevState) => {
        const newFaqUpdate = { ...prevState.newFaqUpdate };

        return {
          ...newFaqUpdate,
          Question: response.data.item.question,
          Answer: response.data.item.answer,
          FAQCategoriesId: response.data.item.faqCategoriesId,
          SortOrder: response.data.item.sortOrder,
          UserId: response.data.item.userId,
        };
      });
    };
  };

  return (
    <React.Fragment>
      <Card className="mb-1 ">
        <div className="faqs-banner-style2 bg-colors-gradient">
          <Container>
            <div>
              <HeaderBreadcrumb />
            </div>
          </Container>
        </div>
        <Card.Body className="mb-3 ">
          <h1>Add Frequently Asked Questions</h1>
          <div className="container">
            <Formik
              enableReinitialize={true}
              initialValues={newFaqData}
              validationSchema={addFaqsSchema}
              onSubmit={onFaqsSubmit}
            >
              <Form>
                <div className="form-group">
                  <label htmlFor="Question">
                    Question<span className="text-danger">*</span>
                  </label>
                  <Field
                    name="question"
                    type="text"
                    className="form-control"
                    id="question"
                    aria-describedby="enterModel"
                    placeholder="Question"
                  />
                  <ErrorMessage
                    name="question"
                    component="div"
                    className=".has-error text-danger"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="answer">
                    Anwser<span className="text-danger">*</span>
                  </label>
                  <Field
                    name="answer"
                    type="answer"
                    className="form-control"
                    id="answer"
                    placeholder="Enter Answer"
                  />
                  <ErrorMessage
                    name="answer"
                    component="div"
                    className=".has-error text-danger"
                  />
                </div>
                <div className="form-group">
                  <div>
                    <label htmlFor="categoryId">
                      FAQCategoriesId <span className="text-danger">*</span>
                    </label>
                  </div>
                  <Field
                    component="select"
                    name="categoryId"
                    aria-describedby="enterModel"
                    className="form-group form-select text-dark"
                  >
                    <option value={0} className="text-dark">
                      FAQCategoriesId
                    </option>
                    {formInfo.categoryIdTypes}
                  </Field>
                  <ErrorMessage
                    name="categoryId"
                    component="div"
                    className=".has-error text-danger"
                  />
                </div>

                <div className="form-group">
                  <div>
                    <label htmlFor="sortOrder">
                      Sort Order <span className="text-danger">*</span>
                    </label>
                  </div>
                  <Field
                    id="sortOrder"
                    as="select"
                    name="sortOrder"
                    aria-describedby="enterModel"
                    className="form-group form-select text-dark"
                  >
                    <option value={0} className="text-dark">
                      Sort Order
                    </option>
                    {sortOrder.map(mapCategoryType)}
                  </Field>
                  <ErrorMessage
                    name="sortOrder"
                    component="div"
                    className=".has-error text-danger"
                  />
                </div>
                <div className="form-group">
                  <div>
                    <label htmlFor="sortOrder">
                      User Id <span className="text-danger">*</span>
                    </label>
                  </div>
                  <Field
                    id="userId"
                    as="select"
                    name="userId"
                    aria-describedby="enterModel"
                    className="form-group form-select text-dark"
                  >
                    <option value={0} className="text-dark">
                      User Id
                    </option>
                    {}
                  </Field>
                  <ErrorMessage
                    name="userId"
                    component="div"
                    className=".has-error text-danger"
                  />
                </div>

                <Button type="submit" className="btn btn-primary">
                  Submit
                </Button>
              </Form>
            </Formik>
          </div>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
}

export default FaqsAddForm;

import React, { useEffect, useState } from "react";
import { ListGroup, Col, Row, Button, Container, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import toastr from "toastr";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import newsletterSubscriptionService from "services/newsletterSubscriptionService";
import NewsletterSubscriptionListItem from "./NewsletterSubscriptionListItem";

function NewsletterSubscriptionList() {
  const [pageData, setPageData] = useState({
    emails: [],
    emailComponents: [],
    toggleSubscribed: true,
    pageIndex: 0,
    pageSize: 6,
    totalCount: 0,
    query: "",
  });

  useEffect(() => {
    if (pageData.query) {
      newsletterSubscriptionService
        .searchEmailsPaged(
          pageData.pageIndex,
          pageData.pageSize,
          pageData.toggleSubscribed,
          pageData.query
        )
        .then(onGetEmailsSuccess)
        .catch(onSearchError);
    } else {
      newsletterSubscriptionService
        .getEmailsPaged(
          pageData.pageIndex,
          pageData.pageSize,
          pageData.toggleSubscribed
        )
        .then(onGetEmailsSuccess)
        .catch(onGetEmailsError);
    }
  }, [
    pageData.toggleSubscribed,
    pageData.pageIndex,
    pageData.query,
    pageData.pageSize,
  ]);

  const onGetEmailsSuccess = (response) => {
    setPageData((prevState) => {
      const update = { ...prevState };
      update.emails = response.item.pagedItems;
      update.emailComponents = update.emails.map(mapEmail);
      update.totalCount = response.item.totalCount;
      return update;
    });
  };
  const onSearchError = () => {
    toastr.error("There are no results for this search");
  };
  const onGetEmailsError = () => {
    toastr.error("Something Went Wrong. Please Refresh");
  };

  const onUnsubscribeClicked = (event) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Unsubscribe email!",
    }).then((result) => {
      if (result.isConfirmed) {
        const email = event.target.id;
        const payload = {
          email: email,
          isSubscribed: false,
        };
        const handle = onUpdateSubscriptionSuccess(email);
        newsletterSubscriptionService
          .updateSubscription(payload)
          .then(handle)
          .catch(onUpdateSubscriptionError);
      }
    });
  };

  const onUpdateSubscriptionSuccess = (email) => {
    setPageData((prevState) => {
      const update = { ...prevState };
      const selectedUserIndex = prevState.emails
        .map((obj) => obj.email)
        .indexOf(email);
      update.emails.splice(selectedUserIndex, 1);
      update.emailComponents = update.emails.map(mapEmail);
      return update;
    });
  };
  const onUpdateSubscriptionError = () => {
    toastr.error("Something Went Wrong. Please Refresh");
  };

  const mapEmail = (person, index) => {
    return (
      <NewsletterSubscriptionListItem
        key={index}
        person={person}
        unsubscribeClickedlocal={onUnsubscribeClicked}
      />
    );
  };

  const toggleLists = () => {
    setPageData((prevState) => {
      const toggle = { ...prevState };
      toggle.toggleSubscribed = !toggle.toggleSubscribed;
      toggle.pageIndex = 0;
      return toggle;
    });
  };

  const onPageChange = (page) => {
    setPageData((prevState) => {
      const updatePage = { ...prevState };
      updatePage.pageIndex = page - 1;
      return updatePage;
    });
  };

  const onSearchFieldChanged = (e) => {
    const value = e.target.value;
    setPageData((prevState) => {
      const update = { ...prevState };
      update.query = value;
      update.pageIndex = 0;
      return update;
    }, []);
  };

  const onSelectFieldChanged = (e) => {
    const value = e.target.value;
    setPageData((prevState) => {
      const update = { ...prevState };
      update.pageSize = value;
      update.pageIndex = 0;
      return update;
    }, []);
  };

  return (
    <React.Fragment>
      <Container>
        <Row lg={{ span: 8, offset: 2 }} md={12} sm={12}>
          <Col className="mb-12">
            <h1 className="display-4 fw-bold mb-3 col-12">
              <span className="text-primary">Newsletter Subscribers </span>
            </h1>
          </Col>
        </Row>
        <Row
          lg={{ span: 8, offset: 2 }}
          md={12}
          sm={12}
          className="d-flex mb-3"
        >
          <Col>
            <h2>
              {pageData.toggleSubscribed
                ? "Subscribed Emails"
                : "Unsubscribed Emails"}
            </h2>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button type="button" onClick={toggleLists}>
              {pageData.toggleSubscribed
                ? "Show Unsubscribed"
                : "Show Subscribed"}
            </Button>
          </Col>
        </Row>
        <Row lg={{ span: 8, offset: 2 }} md={12} sm={12}>
          <Col className="mt-2">
            <Pagination
              onChange={onPageChange}
              current={pageData.pageIndex + 1}
              pageSize={pageData.pageSize}
              total={pageData.totalCount}
              locale={locale}
            />
          </Col>
          <Col className="col-2">
            <Form.Select onChange={onSelectFieldChanged}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </Form.Select>
          </Col>
          <Col>
            <input
              type="text"
              name="query"
              onChange={onSearchFieldChanged}
              className="form-control"
              value={pageData.query}
              placeholder="Search By Email"
            />
          </Col>
        </Row>
        <Row lg={{ span: 8, offset: 2 }} md={12} sm={12} className="mt-3">
          <Col>
            <ListGroup>{pageData.emailComponents}</ListGroup>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}

export default NewsletterSubscriptionList;

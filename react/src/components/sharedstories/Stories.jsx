import React, { useState, useEffect, useCallback } from "react";
import storyService from "services/storiesService";
import StoriesCard from "./StoriesCard";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import debug from "sabio-debug";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Col, Row, Container, Tab } from "react-bootstrap";
import "./storycard.css";
import swal from "sweetalert";
import PropTypes from "prop-types";

const _logger = debug.extend("ShareStory");
const Story = (props) => {
  const [storyData, setStoryData] = useState({
    storyArray: [],
    storyComponents: [],
  });

  const [storyStatus, setStoryStatus] = useState(false);
  const [isApproved, setIsApproved] = useState({ isApproved: false });
  const [query, SetQueryData] = useState({ query: "" });
  const user = props.currentUser;
  const [paginate, setPaginate] = useState({
    pageIndex: 0,
    pageSize: 3,
    currentPage: 1,
    totalPages: 0,
    totalCount: 0,
  });
  const [isStoryApproved, setIsStoryApproved] = useState({ isApproved: true });

  const mapStory = (aStory) => {
    return (
      <StoriesCard
        storyApproval={storyApproval}
        story={aStory}
        key={aStory.id}
        user={user}
      />
    );
  };
  const storyApproval = useCallback((aStory) => {
    if (aStory.isApproved === true) {
      let dataset = { id: aStory.id, isApproved: false };
      storyService
        .storyApproval(aStory.id, dataset)
        .then(onStorySuccess)
        .catch(onStoryError);
    } else {
      let dataset = { id: aStory.id, isApproved: true };
      storyService
        .storyApproval(aStory.id, dataset)
        .then(onStorySuccess)
        .catch(onStoryError);
    }
  }, []);
  const onStorySuccess = (response) => {
    _logger(response);
    setIsStoryApproved((prevState) => {
      const Approval = { ...prevState };
      Approval.isApproved = response.data;

      return Approval;
    });

    swal(response.data.id, " Success");
  };
  const onStoryError = (response) => {
    swal(response.data.id, "Failed");
  };

  useEffect(() => {
    if (user.roles.includes("SysAdmin")) {
      setIsApproved((prevState) => {
        const newApproval = { ...prevState };
        newApproval.isApproved = true;

        return newApproval;
      });
    } else {
      setIsApproved((prevState) => {
        const newApproval = { ...prevState };
        newApproval.isApproved = false;

        return newApproval;
      });
    }
    if (query.query.length > 0) {
      storyService
        .getStoryBySearch(paginate.pageIndex, paginate.pageSize, query.query)
        .then(onSuccess)
        .catch(onError);
    } else if (storyStatus === false) {
      storyService
        .getAllStories(paginate.pageIndex, paginate.pageSize)
        .then(onSuccess)
        .catch(onError);
    } else {
      storyService
        .getUnapprovedStories(paginate.pageIndex, paginate.pageSize)
        .then(onApprovalSuccess)
        .catch(onError);
    }
  }, [paginate.pageIndex, query.query, storyStatus, isStoryApproved]);

  const onSuccess = (response) => {
    _logger(query);
    let myStories = response.item.pagedItems;
    _logger("stories", myStories);
    setStoryData((prevState) => {
      const st = { ...prevState };
      st.storyArray = myStories;
      st.storyComponents = myStories.map(mapStory);
      return st;
    });
    const incomingItems = response.item;

    setPaginate((prevState) => {
      const newPaginate = { ...prevState };
      newPaginate.pageIndex = incomingItems.pageIndex;
      newPaginate.pageSize = incomingItems.pageSize;
      newPaginate.totalCount = incomingItems.totalCount;
      newPaginate.totalPages = incomingItems.totalPages;
      return newPaginate;
    });
  };

  const onChange = (page) => {
    setPaginate((prevState) => {
      const newPaginate = { ...prevState };
      newPaginate.pageIndex = page - 1;
      return newPaginate;
    });
  };
  const onSubmit = (values) => {
    paginate.pageIndex = 0;
    SetQueryData((prevState) => {
      let qd = { ...prevState };
      qd = values;
      return qd;
    });
  };
  const onError = (response) => {
    _logger("error", response);
    swal("error", "no results found");
  };

  const onApproval = (e) => {
    e.preventDefault();
    if (storyStatus === true) {
      setStoryStatus(false);
      _logger("false");
    } else {
      setStoryStatus(true);
      _logger("true");
    }
  };
  const onApprovalSuccess = (response) => {
    let myStories = response.item.pagedItems;
    _logger("stories", myStories);
    setStoryData((prevState) => {
      const st = { ...prevState };
      st.storyArray = myStories;
      st.storyComponents = myStories.map(mapStory);
      return st;
    });
    const incomingItems = response.item;

    setPaginate((prevState) => {
      const newPaginate = { ...prevState };
      newPaginate.pageIndex = incomingItems.pageIndex;
      newPaginate.pageSize = incomingItems.pageSize;
      newPaginate.totalCount = incomingItems.totalCount;
      newPaginate.totalPages = incomingItems.totalPages;
      return newPaginate;
    });
  };

  return (
    <React.Fragment>
      <div className=" sharedstory-bg-image">
        <Container>
          <Row className="shared-story-align-items-center">
            <Col xl={12} lg={12} md={12} sm={12}>
              <div className="py-4 py-lg-8">
                <h1 className="mb-1 text-white stories-display-4">
                  <strong>Share Your Story With Immersed</strong>
                </h1>
                <p className="stories-mb-0">
                  What Can Immersed do for you and your organization!
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className=""></div>
      <div className=" py-6">
        <Container>
          <Row className="mb-6">
            <Col md={12}>
              <Tab.Container defaultActiveKey="mostpopular">
                <Tab.Content>
                  <Tab.Pane
                    eventKey="trending"
                    className="pb-4 p-4 ps-0 pe-0"
                  ></Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Col>
          </Row>

          <Row>
            <Col lg={12} md={12} sm={12}></Col>
          </Row>
          <Row>
            {isApproved.isApproved && (
              <div className="stories-approval-heading">
                <heading>
                  {storyStatus
                    ? " Stories Awaiting Approval"
                    : "  Approved Stories"}
                </heading>
              </div>
            )}

            <div>
              <div className="container">
                <div>
                  <Formik
                    onSubmit={onSubmit}
                    enableReinitialize={true}
                    initialValues={{ query: "" }}
                    className="formik"
                  >
                    <Form values={query.query}>
                      <Pagination
                        className="stories-pagination"
                        onChange={onChange}
                        current={paginate.pageIndex + 1}
                        total={paginate.totalCount}
                        pageSize={paginate.pageSize}
                      />
                      <div className=" form-group">
                        <label htmlFor="search"></label>
                        <Field
                          placeholder="Search Stories"
                          type="text"
                          name="query"
                          className="form-control-md"
                        />
                        <ErrorMessage
                          name="search"
                          component="div"
                        ></ErrorMessage>
                      </div>
                    </Form>
                  </Formik>
                  <div className=" stories-align-items-stretch">
                    {storyData.storyComponents}
                  </div>
                  <div className="story-approve">
                    {isApproved.isApproved && (
                      <div className="">
                        <button
                          onClick={onApproval}
                          className=" btn btn-outline-danger"
                        >
                          {storyStatus
                            ? " Show Approved Stories"
                            : " Show Unapproved Stories"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
Story.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string,
    currentOrgId: PropTypes.number,
    email: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default Story;

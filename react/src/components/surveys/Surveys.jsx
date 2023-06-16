import React, { Fragment, useState, useEffect } from "react";
import { Col, Row, Container, Tab } from "react-bootstrap";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import toastr from "toastr";

import PageHeading from "components/common/PageHeading";
import GridListViewButton from "components/common/GridListViewButton";

import FilterOptions from "./FilterOptions";
import SurveyGridView from "./SurveyGridView";
import SurveyListView from "./SurveyListView";

import surveyService from "services/surveyService";
import lookUpService from "services/lookUpService";

import debug from "sabio-debug";

function Surveys() {
  const _logger = debug.extend("test");

  const [isFilterOptionsVisible, setIsFilterOptionsVisible] = useState(false);
  const [pageData, setPageData] = useState({
    pageIndex: 0,
    pageSize: 6,
    totalPages: 0,
    count: 0,
    totalCount: 0,
    surveys: [],
    filteredSurveys: [],
  });
  const [lookUpData, setLookUpData] = useState({
    filterObject: [],
    surveyStatus: [],
    surveyTypes: [],
  });

  useEffect(() => {
    surveyService
      .getSurveys(pageData.pageIndex, pageData.pageSize)
      .then(getSurveysSuccess)
      .catch(getSurveysError);
    lookUpService
      .LookUp(["SurveyStatus", "SurveyTypes"])
      .then(getLookUpSuccess)
      .catch(getLookUpError);
  }, []);

  const getLookUpSuccess = (data) => {
    _logger(data);
    setLookUpData((prevState) => {
      const ld = { ...prevState };
      ld.surveyStatus = data.item.surveyStatus;
      ld.surveyTypes = data.item.surveyTypes;
      ld.filterObject = {
        title: "Filters",
        categories: [
          {
            name: "Survey Status",
            items: ld.surveyStatus,
          },
          {
            name: "Survey Types",
            items: ld.surveyTypes,
          },
        ],
      };
      setIsFilterOptionsVisible(true);
      return ld;
    });
  };

  const getLookUpError = (err) => {
    toastr.error("Failed to retrieve Survey Status and Types.", err);
  };

  const getSurveysSuccess = (data) => {
    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.surveys = data.item.pagedItems;
      pd.filteredSurveys = data.item.pagedItems;
      pd.pageIndex = 0;
      pd.pageSize = data.item.pageSize;
      pd.totalCount = data.item.totalCount;
      pd.totalPages = data.item.totalPages;
      pd.count = data.item.pagedItems.length;
      return pd;
    });
  };

  const getSurveysError = (err) => {
    toastr.error("Failed to retrieve Surveys.", err);
  };

  const onApplyClicked = (list) => {
    const payload = createSearchPayload(list);
    if (Object.keys(list).length === 0) {
      surveyService
        .getSurveys(0, pageData.pageSize)
        .then(getSurveysSuccess)
        .catch(getSurveysError);
    } else {
      surveyService
        .searchSurveys(payload)
        .then(getSurveysSuccess)
        .catch(getSurveysError);
    }
  };
  const createSearchPayload = (list) => {
    const payload = {
      pageIndex: 0,
      pageSize: pageData.pageSize,
      StatusTypes: [],
      SurveyTypes: [],
      query: "",
    };

    const filterCheckbox = (list, keys, values, category) => {
      list.forEach((status) => {
        keys.forEach((key, index) => {
          if (status.name === key && values[index]) {
            payload[category].push(status.id);
          }
        });
      });
    };

    if (list.hasOwnProperty("Survey Status")) {
      const statusKeys = Object.keys(list["Survey Status"]);
      const statusValues = Object.values(list["Survey Status"]);
      const listOfStatus = lookUpData.surveyStatus;
      filterCheckbox(listOfStatus, statusKeys, statusValues, "StatusTypes");
    }
    if (list.hasOwnProperty("Survey Types")) {
      const typeKeys = Object.keys(list["Survey Types"]);
      const typeValues = Object.values(list["Survey Types"]);
      const listOfTypes = lookUpData.surveyTypes;
      filterCheckbox(listOfTypes, typeKeys, typeValues, "SurveyTypes");
    }

    if (list.search !== null && list.search !== undefined) {
      payload.query = list.search;
    }

    return payload;
  };

  const onPaginationChange = (page) => {
    setPageData((prevState) => {
      const newUserObject = { ...prevState };
      newUserObject.pageIndex = page;
      return newUserObject;
    });

    surveyService
      .getSurveys(page - 1, pageData.pageSize)
      .then(getSurveysSuccess)
      .catch(getSurveysError);
  };

  return (
    <Fragment>
      <PageHeading pagetitle="Surveys" />
      <div className="py-6">
        <Container>
          <Tab.Container defaultActiveKey="grid">
            <Row>
              <Col lg={12} md={12} sm={12} className={`mb-4`}>
                <Row className="d-lg-flex justify-content-between align-items-center">
                  <Col md={6} lg={8} xl={9}>
                    <h4 className="mb-3 mb-lg-0">
                      Displaying {pageData.count} out of {pageData.totalCount}{" "}
                      courses
                    </h4>
                  </Col>
                  <Col md={6} lg={4} xl={3} className="justify-content-end">
                    <div className="me-2">
                      <GridListViewButton keyGrid="grid" keyList="list" />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col xl={3} lg={3} md={4} sm={12} className="mb-4 mb-lg-0">
                {isFilterOptionsVisible && (
                  <FilterOptions
                    data={lookUpData.filterObject}
                    onApply={onApplyClicked}
                  />
                )}
              </Col>
              <Col xl={9} lg={9} md={8} sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="grid" className="pb-4 px-0 ">
                    <SurveyGridView item={pageData} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="list" className="pb-4 px-0 react-code">
                    <SurveyListView item={pageData} />
                  </Tab.Pane>
                </Tab.Content>
                <div className="d-flex justify-content-center">
                  <Pagination
                    locale={locale}
                    onChange={onPaginationChange}
                    current={pageData.pageIndex}
                    total={pageData.totalCount}
                    pageSize={pageData.pageSize}
                    hideOnSinglePage={true}
                  />
                </div>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </Fragment>
  );
}

export default Surveys;

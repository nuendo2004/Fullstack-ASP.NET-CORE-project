import React, { useState, useEffect, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import SurveyCard from "./SurveyCard";
import PropTypes from "prop-types";

function SurveyListView(props) {
  const [listData, setListData] = useState({});

  useEffect(() => {
    setListData((prevState) => {
      const ld = { ...prevState };
      ld.filteredSurveys = props.item.filteredSurveys.map(mapSurveys);
      return ld;
    });
  }, [props.item.filteredSurveys]);
  const mapSurveys = (aSurvey) => {
    return (
      <Col lg={12} md={12} sm={12} key={aSurvey.id}>
        <SurveyCard item={aSurvey} viewby="list" />
      </Col>
    );
  };
  return (
    <Fragment>
      <Row>
        {listData.filteredSurveys &&
          listData.filteredSurveys.length > 0 &&
          listData.filteredSurveys}
      </Row>
    </Fragment>
  );
}

SurveyListView.propTypes = {
  item: PropTypes.shape({
    filteredSurveys: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        surveyStatus: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        surveyType: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
        }).isRequired,
        dateCreated: PropTypes.string.isRequired,
        dateModified: PropTypes.string.isRequired,
        createdBy: PropTypes.number.isRequired,
        modifiedBy: PropTypes.number.isRequired,
      }).isRequired
    ),
  }).isRequired,
};

export default SurveyListView;

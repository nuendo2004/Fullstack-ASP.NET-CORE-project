import React, { useState, useEffect, Fragment } from "react";
import { Col, Row } from "react-bootstrap";
import SurveyCard from "./SurveyCard";
import PropTypes from "prop-types";

function SurveyGridView(props) {
  const [gridData, setGridData] = useState({});

  useEffect(() => {
    setGridData((prevState) => {
      const gd = { ...prevState };
      gd.filteredSurveys = props.item.filteredSurveys.map(mapSurveys);
      return gd;
    });
  }, [props.item.filteredSurveys]);

  const mapSurveys = (aSurvey) => {
    return (
      <Col lg={4} md={6} sm={12} key={aSurvey.id}>
        <SurveyCard item={aSurvey} />
      </Col>
    );
  };

  return (
    <Fragment>
      <Row>
        {gridData.filteredSurveys &&
          gridData.filteredSurveys.length > 0 &&
          gridData.filteredSurveys}
      </Row>
    </Fragment>
  );
}

SurveyGridView.propTypes = {
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

export default SurveyGridView;

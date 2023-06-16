import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import debug from "sabio-debug";
import traineesService from "services/traineesService";
import { Row, Col, Card } from "react-bootstrap";
import TrainingUnitTraineeCard from "./TrainingUnitTraineeCard";

const _logger = debug.extend("TrainingUnitDetailView");

function TrainingUnitDetailView() {
  const [pageData, setPageData] = useState({
    arrayOfTrainees: [],
    traineeComponents: [],
  });
  const { state } = useLocation();
  useEffect(() => {
    _logger("TrainingUnitDetail state.type", state.type);
    if (state?.type === "View_Details") {
      _logger(" TrainingUnits Detail View is Firing", state.payload);
      const trainingUnitDetailView = state.payload.id;
      setPageData((prevState) => {
        const newTrainingUnitData = { ...prevState, ...state.payload };
        newTrainingUnitData.payload = trainingUnitDetailView;
        return newTrainingUnitData;
      });
    }
  }, [state]);

  const mapUnitsByTrainee = (aTrainee) => {
    _logger(aTrainee, "mappingtrainee");
    return (
      <TrainingUnitTraineeCard
        traineeTrainingUnitData={aTrainee}
        key={"list-A" + aTrainee.id}
      />
    );
  };

  useEffect(() => {
    _logger("useEffect");

    const trainingUnitId = 1;

    traineesService
      .getTraineesByTrainingUnitId(trainingUnitId)
      .then(onGetTrainingUnitsSuccess)
      .catch(onGetTrainingUnitserror);
  }, []);

  const onGetTrainingUnitsSuccess = (data) => {
    let arrayOfTrainee = data.items;

    _logger("Trainee Success is working", data);

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfTrainees = arrayOfTrainee;
      pd.traineeComponents = arrayOfTrainee?.map(mapUnitsByTrainee);

      return pd;
    });
  };
  const onGetTrainingUnitserror = (error) => {
    _logger(error);
  };

  return (
    <div>
      <React.Fragment>
        <Row className="justify-content-center">
          <h1>Training Unit Detail View</h1>
          <Col lg={9}>
            <Card
              style={{ width: "831", height: "105px" }}
              className=" text mb-3"
            >
              <Card.Body className="text-wrap">
                <Card.Subtitle className="text mb-3">
                  Description:
                  {""} {pageData.description}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>{pageData.traineeComponents}</Row>
      </React.Fragment>
    </div>
  );
}
export default TrainingUnitDetailView;

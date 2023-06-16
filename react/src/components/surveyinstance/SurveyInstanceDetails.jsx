import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import surveyInstanceService from "../../services/surveyInstanceService";
import { Button, Container } from "react-bootstrap";
import InstanceSurveyDetailsCard from "./InstanceSurveyDetailsCard";
import InstanceQuestionData from "./InstanceQuestionData";
import SurveyInstanceUserCard from "./SurveyInstanceUserCard"
import "../surveyinstance/surveyinstance.css";
import toastr from "toastr";
import debug from "sabio-debug";
const _logger = debug.extend("SurveyInstanceDetails");

function SurveyInstanceDetailsCard() {
  const [details, setDetails] = useState({ instanceData: {} });

  const { instanceId } = useParams();

  useEffect(() => {
    surveyInstanceService
      .getSurveyInstanceDetailsById(instanceId)
      .then(onGetInstanceDetailsSuccess)
      .catch(onGetInstanceDetailsError);
  }, [instanceId]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const onGetInstanceDetailsSuccess = (response) => {
    _logger("response inst det succ", response);
    toastr.success("Found more info!");

    const allInfo = response.item;

    setDetails((prevState) => {
      const instanceDetails = { ...prevState };
      instanceDetails.instanceData = allInfo;
      instanceDetails.instanceData.questionData =
        allInfo.survey.questions.map(mapQuestionData);
      instanceDetails.instanceData.answer = allInfo.survey.questions.filter(
        filterAnsweredQuestion
      );
      return instanceDetails;
    });
  };

  const onGetInstanceDetailsError = (error) => {
    _logger("get inst det err", error);
  };

  const navigate = useNavigate();
  const goToInstances = () => {
    navigate("/surveys/instances");
  };

  const mapQuestionData = (question, index) => {
    return (
      <InstanceQuestionData key={index} question={question} index={index} created={details.instanceData.survey?.dateCreated}/>
    );
  };

  const filterAnsweredQuestion = (question) => {
    if (question.answer) {
      return question;
    }
  };

  return (
    <React.Fragment>
      <Container>
        <h1 className="survey-instance-title my-4">
          Instance: {details.instanceData.id}
        </h1>

        <div className="text-in-acc-header">Survey Information</div>

        <InstanceSurveyDetailsCard survey={details.instanceData.survey} />

        <div className="text-in-acc-header">Questions For This Survey</div>

        <div>{details.instanceData.questionData}</div>

        <div className="text-in-acc-header">Provided By</div>

        <SurveyInstanceUserCard
          user={details?.instanceData?.createdBy}
          submitted={details.instanceData.dateCreated}
        />
      </Container>
      <div
        className="d-grid gap-2 d-md-flex justify-content-md-end"
        onClick={goToInstances}
      >
        <Button variant="primary px-4 mt-10">Return To Instances</Button>
      </div>
    </React.Fragment>
  );
}

export default React.memo(SurveyInstanceDetailsCard);

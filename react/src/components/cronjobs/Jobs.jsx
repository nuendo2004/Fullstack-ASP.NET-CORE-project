import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import debug from "sabio-debug";
import chronJobService from "services/jobSchedulesService";
import JobCard from "./JobCard";
import Select from "react-select";
import { Card, Row, Col, Button } from "react-bootstrap";
import lookUpService from "services/lookUpService";
import toastr from "toastr";

const _logger = debug.extend("Jobs");

function Jobs() {
  const navigate = useNavigate();
  const chronJobTypesTable = ["ChronJobTypes"];
  const daysOfWeekTable = ["DaysOfWeek"];
  const [state, setState] = useState({
    jobs: {
      daily: {
        data: [],
        components: [],
      },
      weekly: {
        data: [],
        components: [],
      },
      monthly: {
        data: [],
        components: [],
      },
      yearly: {
        data: [],
        components: [],
      },
    },
  });

  const [jobOption, setJobOption] = useState("daily");
  const [chronJobTypes, setChronJobTypes] = useState(null);
  const [daysOfWeekTypes, setDaysOfWeekTypes] = useState(null);

  const jobOptions = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Annually" },
  ];

  useEffect(() => {
    lookUpService
      .LookUp(chronJobTypesTable)
      .then(onGetJobTypesSuccess)
      .catch(onGetJobTypesError);
    lookUpService
      .LookUp(daysOfWeekTable)
      .then(onGetDaysSuccess)
      .catch(onGetDaysError);
  }, []);

  useEffect(() => {
    if (chronJobTypes && daysOfWeekTypes) {
      chronJobService.getAllJobs().then(onGetJobsSuccess).catch(onGetJobsError);
    }
  }, [chronJobTypes, daysOfWeekTypes]);

  const onGetJobsSuccess = (response) => {
    setState((prevState) => {
      let newState = { ...prevState };
      newState.jobs.daily.data = response.item?.daily;
      newState.jobs.daily.components = response.item?.daily?.map(mapJobCards);
      newState.jobs.weekly.data = response.item?.weekly;
      newState.jobs.weekly.components = response.item?.weekly?.map(mapJobCards);
      newState.jobs.monthly.data = response.item?.monthly;
      newState.jobs.monthly.components =
        response.item?.monthly?.map(mapJobCards);
      newState.jobs.yearly.data = response.item?.yearly;
      newState.jobs.yearly.components = response.item?.yearly?.map(mapJobCards);
      return newState;
    });
  };

  const onGetJobsError = (err) => {
    _logger(err);
    toastr.error("Something went wrong...");
  };

  const onGetJobTypesSuccess = (response) => {
    setChronJobTypes(() => {
      return response.item.chronJobTypes;
    });
  };

  const onGetJobTypesError = (error) => {
    _logger(error);
    toastr.error("Something went wrong...");
  };

  const onGetDaysSuccess = (response) => {
    setDaysOfWeekTypes(() => {
      return response.item.daysOfWeek;
    });
  };

  const onGetDaysError = (error) => {
    _logger(error);
    toastr.error("Something went wrong...");
  };
  function mapJobCards(job) {
    return (
      <JobCard
        key={job.id}
        job={job}
        jobTypes={chronJobTypes}
        dayTypes={daysOfWeekTypes}
        onEditClick={onEditClick}
      />
    );
  }

  const handleOptionsChange = (option) => {
    setJobOption(() => {
      return option.value;
    });
  };

  const onEditClick = (aJob) => {
    const transportJob = {
      state: { type: "JOB_VIEW", payload: aJob },
    };
    navigate(`/cronjobs/${aJob.id}/edit`, transportJob);
  };

  const onAddJobClick = () => {
    navigate("/cronjobs/add");
  };

  return (
    <React.Fragment>
      <Card className="border-0 mb-3">
        <Card.Header>
          <div className="mb-3 mb-lg-0">
            <h3 className="mb-0">Jobs</h3>
          </div>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col
              lg={4}
              md={4}
              sm={12}
              className="mb-lg-0 mb-2 justify-content-end"
            >
              <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={jobOptions[0]}
                isDisabled={false}
                isClearable={false}
                isSearchable={false}
                name="jobOptions"
                options={jobOptions}
                onChange={handleOptionsChange}
              />
            </Col>
            <Col
              lg={4}
              md={{ span: 4, offset: 2 }}
              sm={12}
              className="mb-lg-0 mb-2 justify-content-end"
            >
              <Button onClick={onAddJobClick}>Add Job</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row>{state.jobs[jobOption].components}</Row>
    </React.Fragment>
  );
}

export default Jobs;

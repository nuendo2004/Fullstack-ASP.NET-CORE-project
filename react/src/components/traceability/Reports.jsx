import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Row, Table, Col, Card } from "react-bootstrap";
import debug from "sabio-debug";
import PropTypes from "prop-types";
import toastr from "toastr";
import { useNavigate } from "react-router-dom"
import TrainingUnitService from "../../services/trainingUnitService"
import lookUpService from "services/lookUpService";
import traineesService from "services/traineesService";
import UserTable from "./ReportsTable";
import ReportsCard from "./ReportCards";
import NoReportsCard from "./NoReportCard";
import rescueService from "services/rescueService";
import "./traceabilityeventcard.css"


const _logger = debug.extend("trace");

const tableName = ["TrainingStatus"];

function Traceability(props) {

    const [pageData, setPageData] = useState({
        pageIndex: 1,
        pageSize: 1000,
        totalFound: 0,
        query: 0,
        trainingUnit: 0,
        trainingUnitComponents: [],
        trainingStatusComponents: [],
    })

    const [traineeData, setTraineeData] = useState({
        reportComponents: [],
        traineeComponent: []
    });

    const navigate = useNavigate()

    const currentOrg = props.currentUser.currentOrgId;

    useEffect(() => {
        lookUpService.LookUp(tableName).then(onLookUpSuccess).catch(onLookUpError)
    }, [])

    const queryChanged = (e) => {
        const intQuery = e.target.value;
        TrainingUnitService.getTrainingUnitByOrgId(currentOrg, pageData.pageIndex - 1, pageData.pageSize, intQuery).then(onGetUnitSuccess).catch(onGetUnitError)
    };

    const onGetUnitError = (response) => {
        _logger("UnitError---->", response)
        toastr.error("Get Unit Failed")
    };

    const onLookUpError = (response) => {
        _logger("lookError----->", response)
        toastr.error("Lookup Failed")
    };

    const onLookUpSuccess = (response) => {
        const lookData = response.item.trainingStatus;
        setPageData((prevState) => {
            let pd = { ...prevState }
            pd.trainingStatusComponents = lookData.map(mapTrainingStatus)
            return pd;
        })
    };

    const onGetUnitSuccess = (response) => {
        const trainingData = response.item.pagedItems;
        const tc = response.item.totalCount;
        setPageData((prevState) => {
            const pd = { ...prevState };
            pd.totalFound = tc;
            pd.trainingUnitComponents = trainingData.map(mapTrainingUnit);
            return pd;
        })
    };

    const mapTrainingStatus = (aStatus) => {
        return (<option key={aStatus.id} value={aStatus.id}>{aStatus.name}</option>)
    };

    const onViewTraineesClicked = (e) => {
        const aUnitId = e.target.value
        traineesService.getTraineesByTrainingUnitIdV2(aUnitId).then(onGetByUnitSuccess).catch(onGetByUnitError)
    };

    const onGetByUnitError = (response) => {
        _logger("Get Unit Failed----->", response);
        toastr.error("Get Unit Failed");
    }



    const mapTrainingUnit = (aUnit) => {
        return (<option key={aUnit.id} value={aUnit.id}>{aUnit.name}</option>)
    };

    const onGetByUnitSuccess = (response) => {
        const trainee = response.item
        _logger("TraineeByUnit----->", trainee)
        setTraineeData((prevState) => {
            const pd = { ...prevState };
            pd.traineeComponent = trainee.map(mapTrainees)
            return pd;
        })
    };

    const mapTrainees = (aTrainee) => {
        return <UserTable trainee={aTrainee} key={aTrainee.id} onReportsClick={onReportsclicked} onViewEvents={onViewEventsClicked}></UserTable>
    };

    const onReportsclicked = (trainee) => {
        _logger("ParentTraceabilityClicked---->", trainee)
        rescueService.getReportByTraineeId(pageData.pageIndex - 1, pageData.pageSize, trainee.id).then(onReportSuccess).catch(onReportError);
    };

    const onReportError = (response) => {
        _logger("Get Report Failed----->", response);
        toastr.error("No Reports")
        var report = [{
            image: "https://tinyurl.com/58hj7j9m"
            , title: "No Record Found!"
            , id: 1
        }]
        setTraineeData((prevState) => {
            const pd = { ...prevState };
            pd.reportComponents = report.map(NoReportMapper);
            return pd;
        });
    }

    const NoReportMapper = (aReport) => {
        return <NoReportsCard key={aReport.id} report={aReport}></NoReportsCard>
    }

    const onReportSuccess = (response) => {
        const report = response.item.pagedItems;
        setTraineeData((prevState) => {
            const pd = { ...prevState };
            pd.reportComponents = report.map(reportMapper);
            return pd;
        });
    };

    const onViewEventsClicked = useCallback((info) => {
        const payloadForTransport = { type: "MoreInfo_Report", trainee: info };
        const userId = info.id;
        navigate(`/events/${userId}`, { state: payloadForTransport })
    }, []);

    const reportMapper = (aReport) => {
        return <ReportsCard key={aReport.id} report={aReport}></ReportsCard>
    }

    return (
        <Fragment>
            <Row className="text-center">
                <h1><strong>Trainee Reports</strong></h1>
                <div className="w-50 mx-auto" style={{ marginTop: 20 }}>
                    <div className="form-group">
                        <label htmlFor="query" className="mx-auto table-traceability-text">1: Training Status</label>
                        <select type="submit" name="query" onChange={queryChanged} className="form-select">
                            <option label="Select Status" className="text-muted"></option>
                            {pageData.trainingStatusComponents}
                        </select>
                    </div>
                    <br />
                    <div className="form-group">
                        <label htmlFor="query" className="mx-auto table-traceability-text">2: Training Unit</label>
                        <select type="submit" name="trainingUnitComponents" onChange={onViewTraineesClicked} className="form-select">
                            <option label="Select Training Unit" className="text-muted"></option>
                            {pageData.trainingUnitComponents}
                        </select>
                    </div>
                    <br />
                </div>
            </Row>
            <Row className="col-md-12 mx-auto justify-content-center">
                <Col className="col-md-6">
                    <Table className="traceability-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Reports</th>
                                <th>Events</th>
                            </tr>
                        </thead>
                        <tbody>
                            {traineeData.traineeComponent}
                        </tbody>
                    </Table>
                </Col>
                <Col className="col-md-6 traceability-card">
                    <p className="text-center table-events-header">Reports</p>
                    <Card className="traceability-card-background">
                        {traineeData.reportComponents}
                    </Card>

                </Col>

            </Row>
        </Fragment>
    )
};

Traceability.propTypes = {
    currentUser: PropTypes.shape({
        currentOrgId: PropTypes.number.isRequired,
    }),
}

export default Traceability;
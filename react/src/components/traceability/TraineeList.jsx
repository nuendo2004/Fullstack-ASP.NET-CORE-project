import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"
import traineesService from "services/traineesService";
import { Row, Table, Col, Button } from "react-bootstrap";
import UserTable from "../../components/traceability/ReportsTable";
import toastr from "toastr";
import userService from "services/userService";

function Trainee(props) {
    const userId = props.currentUser.id;



    const [traineeData, setTraineeData] = useState({
        traineeComponent: []
        , currentTraineeId: 0
    });

    const navigate = useNavigate();

    useEffect(() => {
        traineesService.getTraineesByUserId(userId).then(onGetTraineeByUserSuccess).catch(onGetTraineeByUserError);
    }, [])

    const onGetTraineeByUserSuccess = (response) => {
        const traineeArray = response.items;
        setTraineeData((prevState) => {
            let pd = { ...prevState }
            pd.traineeComponent = traineeArray.map(mapTrainees)
            return pd;
        })
    };

    const mapTrainees = (aTrainee) => {
        return <UserTable trainee={aTrainee} onTraineeClicked={selectTrainee} key={aTrainee.id} currentTraineeId={traineeData.currentTraineeId} ></UserTable>
    }

    const selectTrainee = (traineeId) => {
        userService.changeTrainee(traineeId).then(onChangeSuccess).catch(onChangeError)
        setTraineeData((prevState) => {
            const pd = { ...prevState };
            pd.currentTraineeId = traineeId
            return pd;
        })
    };

    const onChangeSuccess = () => {
        toastr.success("Changed Trainee Successfully")
    };

    const onChangeError = () => {
        toastr.error("Changed Trainee Failed")
    }

    const onGetTraineeByUserError = () => {
        toastr.error("Error Getting Trainees")
    }

    const onHomeClick = (e) => {
        e.preventDefault();
        navigate("/")
    }

    return (
        <Fragment>
            <center><h1><strong>Select Trainee</strong></h1></center>
            <br />
            <Row className="col-md-12 mx-auto justify-content-center">
                <Col className="col-md-6">
                    <Table>
                        <thead>
                            <tr>
                                <th>Trainee</th>
                                <th>Training Unit</th>
                                <th>Select Trainee</th>
                            </tr>
                        </thead>
                        <tbody>
                            {traineeData.traineeComponent}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="col-md-12 mx-auto justify-content-center">
                <Col className="col-md-6">
                    <div>
                        <Button className="btn-xs btn-warning" onClick={onHomeClick}>
                            Home
                        </Button>
                    </div>
                </Col>
            </Row>

        </Fragment>
    )
};

Trainee.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.number.isRequired
    })
}

export default Trainee;
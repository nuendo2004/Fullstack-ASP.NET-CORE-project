import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import "./traceabilityeventcard.css";
import { useLocation } from "react-router-dom";
import debug from "sabio-debug";

const _logger = debug.extend("table");

function UserTable(props) {

    const user = props.trainee.user;
    const trainee = props.trainee;
    const reportClick = props.onReportsClick;
    const eventClick = props.onViewEvents;
    const traineeClicked = props.onTraineeClicked;
    const location = useLocation();
    _logger("currentuser----->", props.currentTraineeId)

    const [disable, setdisable] = useState(false);
    // be able to check to see if the current traineeId is selected, then to keep it off


    const localReports = (e) => {
        reportClick(trainee, e);
    };


    const localEventsClicked = (e) => {
        eventClick(trainee, e)
    };

    const localTraineeClicked = (e) => {
        _logger("CurrentTraineer clicked----->", e, trainee.id)
        traineeClicked(trainee.id, e)
        setdisable(true)
    }

    return (
        <Fragment>
            {location.pathname.includes("/usertrainees/") ?
                <tr>
                    <td className="name-title-table">{trainee.id}</td>
                    <td>
                        <p className="name-title-table">{trainee.trainingUnits.name}</p>
                    </td>
                    <td>
                        <button disabled={disable} className="btn btn-sm btn-primary" onClick={localTraineeClicked}>{disable === true ? 'Current Trainee' : 'select'}</button>
                    </td>
                </tr> :
                <tr>
                    <td className="name-title-table">{user.firstName} {user.lastName}</td>
                    <td>
                        {<button onClick={localReports} className="btn btn-sm btn-primary">View Reports</button>}
                    </td>
                    <td>
                        <button onClick={localEventsClicked} className="btn btn-sm btn-primary">View Events</button>
                    </td>
                </tr>
            }
        </Fragment >
    );
};

UserTable.propTypes = {
    trainee: PropTypes.shape({
        user: PropTypes.shape({
            id: PropTypes.number.isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
        }),
        id: PropTypes.number.isRequired,
        trainingUnits: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired
    }),
    onReportsClick: PropTypes.func.isRequired,
    onViewEvents: PropTypes.func.isRequired,
    onTraineeClicked: PropTypes.func.isRequired,
    currentTraineeId: PropTypes.number.isRequired
};


export default UserTable;

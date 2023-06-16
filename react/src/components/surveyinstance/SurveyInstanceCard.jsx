import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function SurveyInstanceCard(props) {
    let survInstance = props.instance;
    let indexOfInst = props.index;

    const navigate = useNavigate();
    const onBodyClicked = () => {
        navigate(`/surveys/instances/${survInstance.id}/details`);
      }
      
    return (
    <React.Fragment>  
        <tr onClick={onBodyClicked}>
            <th scope="row">{indexOfInst + 1}</th>
            <td className="text-wrap">{survInstance?.survey?.answeredBy?.[0]?.firstName || "Anonymous"} {survInstance?.survey?.answeredBy?.[0]?.lastName || "User"}</td>
            <td className="text-wrap">{survInstance.survey.name}</td>
            <td className="text-wrap">{survInstance.dateCreated.toString().substring(0, 10)}</td>
        </tr>
    </React.Fragment>
    )
}
SurveyInstanceCard.propTypes = {
    instance: PropTypes.shape({
      id: PropTypes.number.isRequired,
      survey: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        answeredBy: PropTypes.arrayOf(
            PropTypes.shape({
            id: PropTypes.number,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            mi: PropTypes.string,
            avatarUrl: PropTypes.string,
          })
        )
      }),
      userId: PropTypes.number,
      dateCreated: PropTypes.string.isRequired,
    }),
    index: PropTypes.number.isRequired,
  };


export default React.memo(SurveyInstanceCard)
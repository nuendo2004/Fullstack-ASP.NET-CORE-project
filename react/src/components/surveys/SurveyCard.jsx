import React from "react";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Image, Card, Row, Col, Dropdown } from "react-bootstrap";
import { MoreVertical, Edit } from "react-feather";
import Logo from "../../assets/images/background/project-cover-img.jpg";
import style from "./surveycard.module.css";
import CustomToggle from "../common/CustomToggle";

function SurveyCard({ item, viewby, extraclass }) {
  const navigate = useNavigate();

  const onEditSurvey = () => {
    const isEdit = true;
    navigate(`${item.id}`, { state: { item, isEdit } });
  };

  const onViewSurvey = () => {
    const isEdit = false;
    navigate(`${item.id}`, { state: { item, isEdit } });
  };

  const GridView = () => {
    return (
      <Card
        className={`mb-4 card-hover h-25em ${extraclass} ${style["survey-grid-card"]}`}
      >
        <Image src={Logo} alt="" className="card-img-top rounded-top-md" />
        <Card.Body>
          <Card.Title className="border-bottom">{item.name}</Card.Title>
          <Card.Text>
            {`${item.description} `}
            <span
              onClick={onViewSurvey}
              className={`text-primary text-decoration-none ${style["survey-pointer"]}`}
            >
              (View More)
            </span>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <Row className="align-items-center g-0">
            <Col>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={onEditSurvey}
                >
                  Edit
                </button>
              </div>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    );
  };

  const ListView = () => {
    return (
      <Card className="mb-4 card-hover">
        <Row className="g-0">
          <span
            className={`bg-cover img-left-rounded col-12 col-md-12 col-xl-3 col-lg-3 ${style["survey-list-card"]}`}
          >
            <Image
              src={Logo}
              alt="..."
              className="img-fluid d-lg-none invisible"
            />
          </span>
          <Col lg={9} md={12} sm={12}>
            <Card.Body>
              <Row className="align-items-center g-0">
                <Col lg={11} md={11} sm={11}>
                  <h3 className="mb-2">{item.name}</h3>
                  <h5 className="mb-2">
                    {`${item.description} `}
                    <span
                      onClick={onViewSurvey}
                      className={`text-primary text-decoration-none ${style["survey-pointer"]}`}
                    >
                      (View More)
                    </span>
                  </h5>
                </Col>
                <Col lg={1} md={1} sm={1}>
                  <div className="ms-3">
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle}>
                        <MoreVertical size="20px" className="text-secondary" />
                      </Dropdown.Toggle>
                      <Dropdown.Menu align="end">
                        <Dropdown.Header>SETTINGS</Dropdown.Header>
                        <Dropdown.Item eventKey="1" onClick={onEditSurvey}>
                          {" "}
                          <Edit
                            size="18px"
                            className="dropdown-item-icon"
                          />{" "}
                          Edit
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  };

  return <Fragment>{viewby === "grid" ? <GridView /> : <ListView />}</Fragment>;
}

SurveyCard.defaultProps = {
  viewby: "grid",
  extraclass: "",
};

SurveyCard.propTypes = {
  item: PropTypes.shape({
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
  }).isRequired,
  viewby: PropTypes.string,
  extraclass: PropTypes.string,
};

export default SurveyCard;

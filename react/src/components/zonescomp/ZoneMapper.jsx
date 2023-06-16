import React, { useEffect,useState } from "react";
import PropTypes from "prop-types";
import debug from "sabio-debug";
import { Pencil } from "react-bootstrap-icons";
import { Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import toastr from "toastr";
import { Col, Row, Card, Button, Tab } from "react-bootstrap";
import {
  PeopleFill,
  TruckFrontFill,
  ListTask,
  ChatSquareTextFill,
  KeyFill,
} from "react-bootstrap-icons";
import {
  PencilSquare,
  HandThumbsUp,
  ShieldSlash,
  ArchiveFill,
  LockFill,
  ExclamationTriangle,
} from "react-bootstrap-icons";
import Ratings from "components/ratings/Ratings";
import { ENTITY_TYPES_IDS } from "components/ratings/constants";

import traineesService from "services/traineesService";
import { getTraineeAccountsTraineeId } from "services/traineeAccountsService";
const _loggerV2 = debug.extend("ZonesMapperV2");

function ZoneMapper(props) {
  _loggerV2(props.currentUser.roles);
  const userRole = props.currentUser.roles;
  const aZone = props.zoneData;
  const [traineeZoneId,setTraineeZoneId] = useState([])
  const onLocalDeleteBttClicked = (evt) => {
    evt.preventDefault();
    props.onDeleteRequest(props.zoneData, evt);
  };
  const navigate = useNavigate();

  const onEditClicked = () => {
    const stateForTransports = { type: "PRODUCT_VIEW", payload: aZone };
    _loggerV2(aZone);
    navigate(`/zones/edit/${aZone?.id}`, { state: stateForTransports });
  };

  const onUpdateStatusClicked = () => {
    const stateForTransports = { type: "PRODUCT_VIEW_STATUS", payload: aZone };
    _loggerV2(aZone);
    navigate(`/zones/${aZone?.id}/status/${aZone?.zoneStatus.id}`, {
      state: stateForTransports,
    });
  };
useEffect(()=>{
  if(userRole.includes("Trainee")){
    traineesService
    .getTraineesByUserId(props.currentUser.id)
    .then(onGetTraineeIdSuc)
    .catch(onGetTraineeIdError)
  }
},[])
const onGetTraineeIdError = (err)=>{
  toastr.error("TraineeID is not available", err);
}
const onGetTraineeIdSuc =(response)=>{
  _loggerV2("FIRST LOGGER",response.item.id)
  getTraineeAccountsTraineeId(0, 500, response.item.id)
  .then(onGetTraineeAccSuc)
  .catch(onGetTraineeAccErr)
}
const onGetTraineeAccErr = (err)=>{
  toastr.error("TraineeAccount is not available for Validation",err)
}
const onGetTraineeAccSuc =(response)=>{
  const pItems = response.item.pagedItems;
  const zoneId = pItems.map((item)=>item.zone.id);
   _loggerV2("TRAINEE ZONE IDS", traineeZoneId);
  setTraineeZoneId(zoneId)
}
  const functionViewZoneGroups = () => {
    navigate(`/zone/zonegroupsview`);
    //hardcoded for demo purposes only
  };
  const functionViewTask = () => {
    const selectedZoneId = aZone.id;
    const zoneName = aZone.name.toLowerCase();
    const urlName = zoneName.replace(/\s/g, "");
    _loggerV2("FIRSTLOGGER", urlName);
    if (userRole.includes("Trainee")) {
      if (traineeZoneId.includes(selectedZoneId)) {
        navigate(`/zones/${selectedZoneId}/login`, { state: aZone });
      } else {
        navigate(`/zones/${selectedZoneId}/register`, { state: aZone });
      }
    }
    else (navigate(`/zones/${selectedZoneId}/${urlName}`))
  }

  const ztPublic = <PeopleFill className="zones-card-icon" />;
  const ztTransit = <TruckFrontFill className="zones-card-icon" />;
  const ztTask = <ListTask className="zones-card-icon" />;
  const ztSocial = <ChatSquareTextFill className="zones-card-icon" />;
  const ztAdmin = <KeyFill className="zones-card-icon" />;
  const zoneTypeImages = [ztPublic, ztTransit, ztTask, ztSocial, ztAdmin];
  const zsDraft = <PencilSquare className="zones-card-icon" />;
  const zsOperational = <HandThumbsUp className="zones-card-icon" />;
  const zsDisabled = <ShieldSlash className="zones-card-icon" />;
  const zsArchived = <ArchiveFill className="zones-card-icon" />;
  const zsLocked = <LockFill className="zones-card-icon" />;
  const zsCorrupted = <ExclamationTriangle className="zones-card-icon" />;
  const zoneStatusImages = [
    zsDraft,
    zsOperational,
    zsDisabled,
    zsArchived,
    zsLocked,
    zsCorrupted,
  ];
  return (
    <Tab.Container>
      <Col lg={3} md={4} sm={6}>
        <Card
          className="mb-4 card-hover zone-card-css"
          key={aZone.id}
          id={aZone.id}
        >
          <Row>
            <Col lg={6} md={6} sm={6}>
              <Card.Title className="zone-card-title">
                Type: {aZone.zoneType.name}
              </Card.Title>
            </Col>
            <Col lg={6} md={6} sm={6}>
              <Card.Title className="zone-card-title">
                Status: {aZone.zoneStatus.name}
              </Card.Title>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={6}>
              <span className="zones-card-icon">
                {zoneTypeImages[aZone.zoneType.id - 1]}
              </span>
            </Col>
            <Col lg={6} md={6} sm={6}>
              {zoneStatusImages[aZone.zoneStatus.id - 1]}
            </Col>
          </Row>

          <Card.Body className="zone-card-body">
            <div className="zone-card-body-up mb-3">
              <Card.Title className="zones-cardtitle">{aZone.name}</Card.Title>
              <Card.Text>{aZone.description}</Card.Text>
            </div>
            {userRole.includes("SysAdmin")||userRole.includes("OrgAdmin") ? (
              <div className="d-grid zone-card-select-buttons">
                <Row className="mt-auto">
                  <Button
                    className="zones-card-button-update"
                    onClick={onUpdateStatusClicked}
                  >
                    Update status
                  </Button>
                  <Button
                    className="zones-card-button-update"
                    onClick={functionViewTask}
                  >
                    View Zone
                  </Button>
                  <Button
                    onClick={functionViewZoneGroups}
                    className="zones-card-button-update btn"
                  >
                    View Zone Groups
                  </Button>
                </Row>
                <Row className="mt-auto">
                  <Button
                    className="zones-card-buttons"
                    onClick={onEditClicked}
                  >
                    <Pencil className="zones-card-icon-button" />
                  </Button>
                  <Button
                    className="zones-card-buttons "
                    onClick={onLocalDeleteBttClicked}
                  >
                    <Trash className="zones-card-icon-button" />
                  </Button>
                </Row>
              </div>
            ) : (
              <Row className="mt-auto">
                <Button
                  className="zones-card-button-update"
                  onClick={functionViewTask}
                >
                  View Zone
                </Button>
                <Button
                  onClick={functionViewZoneGroups}
                  className="zones-card-button-update btn"
                >
                  View Zone Groups
                </Button>
              </Row>
            )}
          </Card.Body>
          <Card.Footer>
            <Ratings
              currentUser={props.currentUser}
              entityTypeId={ENTITY_TYPES_IDS.Zones}
              entityId={aZone.id}
            ></Ratings>
          </Card.Footer>
        </Card>
      </Col>
    </Tab.Container>
  );
}

ZoneMapper.propTypes = {
  currentUser: PropTypes.shape({
    avatarUrl: PropTypes.string,
    email: PropTypes.string,
    firstName: PropTypes.string,
    id: PropTypes.number,
    isLoggedIn: PropTypes.bool,
    lastName: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
    
  }),
  zoneData: PropTypes.shape({
    zoneStatus: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    createdBy: PropTypes.number.isRequired,
    zoneType: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),

    dateModified: PropTypes.string.isRequired,
  }),
  statusOptionsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  onDeleteRequest: PropTypes.func.isRequired,
};

export default React.memo(ZoneMapper);

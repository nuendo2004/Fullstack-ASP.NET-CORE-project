import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

function TableLog(props) {
  const aLog = props;

  return (
    <tr>
      <th scope="row">{aLog.log.id}</th>
      <td>{aLog?.log.entityType?.name}</td>
      <td>{aLog?.log.accessType?.name}</td>
      <td>{aLog?.log.accessStatus?.name}</td>
      <td>{aLog.log.ipAddressPort}</td>
      <td>{aLog.log.endpointName}</td>
      <td>{moment(aLog.log.dateCreated).format("MM/DD/YYYY")}</td>
      <td>{aLog.log.payloadName}</td>
      <td>{aLog.log.route}</td>
      <td>{aLog.log.deviceType?.name}</td> 
    </tr>
  );
}

TableLog.propTypes = {
  logInfo: PropTypes.shape({
    entityType: PropTypes.string.isRequired,
    entityId: PropTypes.number.isRequired,
    accessType: PropTypes.string.isRequired,
    accessStatus: PropTypes.string.isRequired,
    ipAddressPort: PropTypes.string.isRequired,
    endPoint: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired,
    route: PropTypes.string.isRequired, 
    deviceTypeId: PropTypes.number.isRequired, 
    deviceType: PropTypes.string.isRequired
  }),
};

export default TableLog;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import debug from "sabio-debug";
import { logActivity } from "services/accessLogsService";

const ZoneLogger = (props) => {
  const _logger = debug.extend("ZoneTracker");
  const { entityId, payloadName } = props;
  const location = useLocation();
  _logger(
    "zone param",
    location.pathname.split("/")[2],
    location.pathname,
    entityId
  );
  const log = {
    entityTypeId: 3,
    entityId: entityId,
    accessTypeId: 5,
    accessStatusId: 1,
    iPAddressPort: "unknown",
    endpointName: "unknown",
    payloadName: payloadName || "Access",
    route: location.pathname,
    deviceTypeId: getDeviceType(navigator?.userAgentData?.platform),
    zoneId: location.pathname.split("/")[2],
  };
  const [currentLog] = useState(log);

  function getDeviceType(device) {
    if (device === "Windows") return 2;
    if (device === "Mac") return 3;
    if (device === "iPhone") return 6;
    if (device === "Android") return 7;
    return 8;
  }

  useEffect(() => {
    _logger(currentLog);
    if (!currentLog.entityId) return;
    if (
      location.pathname.split("/")[1] === "transit" ||
      location.pathname.split("/")[2] === "transit"
    )
      currentLog.zoneId = 4;
    logActivity(currentLog).catch((e) => {
      _logger(e.response);
    });
  }, [currentLog]);
};

export default ZoneLogger;

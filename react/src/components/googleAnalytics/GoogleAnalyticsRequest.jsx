import React from "react";
import * as gaService from "../../services/googleAnalyticsService";
import sabioDebug from "sabio-debug";
import { useEffect, useState } from "react";
import toastr from "toastr";
import { toast } from "react-toastify";
import GoogleAnalyticsGraph from "./GoogleAnalyticsGraph";

const _logger = sabioDebug.extend("Google Analytics");

const AnalyticsRequests = () => {
  const [googleAnalytics, setGoogleAnalytics] = useState({
    OperatingSystem: [],
    Location: [],
    PathName: [],
    Session: [],
    SessionTotal: [],
    Event: [],
    User: [],
  });

  const [startDate] = useState({
    startDate: "7daysAgo",
  });

  const [operatingSystem] = useState({
    startDate: startDate.startDate,
    endDate: "today",
    metric: "users",
    dimension: "operatingSystem",
  });
  const [userReport] = useState({
    startDate: startDate.startDate,
    endDate: "today",
    metric: "users",
    dimension: "dayOfWeek",
  });
  const [sessionReport] = useState({
    startDate: startDate.startDate,
    endDate: "today",
    metric: "sessions",
    dimension: "date",
  });
  const [pathReport] = useState({
    startDate: startDate.startDate,
    endDate: "today",
    metric: "pageViews",
    dimension: "pagePath",
  });
  const [locationReport] = useState({
    startDate: startDate.startDate,
    endDate: "today",
    metric: "users",
    dimension: "country",
  });
  const [eventReport] = useState({
    startDate: startDate.startDate,
    endDate: "today",
    metric: "totalEvents",
    dimension: "eventLabel",
  });

  const analyticsReportRequest = [
    operatingSystem,
    userReport,
    sessionReport,
    pathReport,
    locationReport,
    eventReport,
  ];

  useEffect(() => {
    var report = null;
    for (let i = 0; i < analyticsReportRequest.length; i++) {
      report = analyticsReportRequest[i];
      var response = gaService
        .GoogleAnalytics(report)
        .then(onUserAnalyticsSuccess)
        .catch(onUserAnalyticsError);

      _logger("For Loop: ", report, response);
    }
  }, []);

  const onUserAnalyticsSuccess = (response) => {
    let dimensionName = response.reports[0].columnHeader.dimensions[0];
    if (dimensionName === "ga:eventLabel") {
      setGoogleAnalytics((prevState) => {
        const analytics = { ...prevState };
        analytics.Event = response.reports[0].data.rows;
        return analytics;
      });
      return googleAnalytics.Event;
    } else if (dimensionName === "ga:operatingSystem") {
      setGoogleAnalytics((prevState) => {
        const analytics = { ...prevState };
        analytics.OperatingSystem = response.reports[0].data.rows;
        return analytics;
      });
      return googleAnalytics.OperatingSystem;
    } else if (dimensionName === "ga:dayOfWeek") {
      setGoogleAnalytics((prevState) => {
        const analytics = { ...prevState };
        analytics.User = response.reports[0].data.rows;
        return analytics;
      });
      return googleAnalytics.User;
    } else if (dimensionName === "ga:pagePath") {
      setGoogleAnalytics((prevState) => {
        const analytics = { ...prevState };
        analytics.PathName = response.reports[0].data.rows;
        return analytics;
      });
      return googleAnalytics.PathName;
    } else if (dimensionName === "ga:country") {
      setGoogleAnalytics((prevState) => {
        const analytics = { ...prevState };
        analytics.Location = response.reports[0].data.rows;
        return analytics;
      });
      return googleAnalytics.Location;
    } else if (dimensionName === "ga:date") {
      setGoogleAnalytics((prevState) => {
        const analytics = { ...prevState };
        analytics.Session = response.reports[0].data.rows;
        analytics.SessionTotal = response.reports[0].data.totals[0].values[0];
        return analytics;
      });
      return googleAnalytics.Session;
    }
    toast.success("Google Analytics Retrieved");
    return googleAnalytics;
  };

  const onUserAnalyticsError = (error) => {
    toastr.error(error, "Analytics Not Found");
  };

  return (
    <div>
      <div className="row"></div>
      <div></div>
      <div>
        <GoogleAnalyticsGraph
          pathNameData={googleAnalytics?.PathName}
          operatingSysData={googleAnalytics?.OperatingSystem}
          sessionsData={googleAnalytics?.Session}
          sessionsTotals={googleAnalytics?.SessionTotal}
          locationData={googleAnalytics?.Location}
          userData={googleAnalytics?.User}
          eventData={googleAnalytics?.Event}
        />
      </div>
    </div>
  );
};

export default AnalyticsRequests;

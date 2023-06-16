import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import PropTypes from "prop-types";
import toastr from "toastr";
import "./internalanalytics.css";
import ApexCharts from "../ApexCharts";
import securityEventsService from "services/securityEventsService";
import {
  calculatePercentChangeArray,
  dynamicSort,
  getMonthsValuesChooseYear,
} from "./internalFunctions";
import { orgHacksChartOptions } from "./internalChartData";
import debug from "sabio-debug";
const _logger = debug.extend("OrgHacksChart");

const OrgHacksChart = (props) => {
  _logger("props", props);

  const orgsAlphabetical = props?.secEvtsOrgs.sort(dynamicSort("name"));

  const selectOrgOptions = (orgObjects) => {
    let optionsArray = orgObjects.map(({ id, name }) => ({
      value: id,
      label: name,
    }));
    return optionsArray;
  };
  const selectOptions = selectOrgOptions(orgsAlphabetical);
  const animatedComponents = makeAnimated();

  const [orgsDataArray, setOrgsDataArray] = useState([]);
  const [organizationIds, setOrganizationIds] = useState([]);
  const [prevLength, setPrevLength] = useState(0);

  const onOrgSelect = (e) => {
    const ids = e.map((e) => e.value);
    setPrevLength(organizationIds.length);
    setOrganizationIds(ids);
  };

  const orgMonthlyHacks = (dataArray) => {
    let dataSeries = [];
    for (let i = 0; i < dataArray.length; i++) {
      let monthValues = getMonthsValuesChooseYear(
        props?.selectedYear,
        dataArray[i].byMonth,
        "date",
        "securityEventTotals"
      );
      let orgObj = {
        id: dataArray[i].id,
        monthValues: monthValues,
        monthChange: calculatePercentChangeArray(monthValues),
      };
      dataSeries.push(orgObj);
    }
    return dataSeries;
  };

  const hacksChartDataSeries = (orgs, dataArray) => {
    let monthlyData = orgMonthlyHacks(dataArray);
    let apexDataSeries = [];
    monthlyData.forEach((object) => {
      let result = orgs.find((obj) => obj.id === object.id);
      apexDataSeries.push(
        {
          name: `${result.name} Hacks`,
          data: object.monthValues,
        },
        {
          name: `${result.name} % Change`,
          data: object.monthChange,
        }
      );
    });
    return apexDataSeries;
  };

  useEffect(() => {
    if (organizationIds.length === 0) {
      setOrgsDataArray([]);
    } else if (prevLength < organizationIds.length) {
      getEachOrgStats(organizationIds);
    } else if (prevLength > organizationIds.length) {
      setOrgsDataArray(
        orgsDataArray.filter((obj) => organizationIds.includes(obj.id))
      );
    }
  }, [organizationIds]);

  //#region | getOrgHacksOverTime
  const getOrgHacksOverTime = async (id) => {
    if (id) {
      await securityEventsService
        .getOrganizationStats(id)
        .then(onGetOrgStatsSuccess)
        .catch(onGetOrgStatsError);
    }
  };

  const onGetOrgStatsSuccess = (response) => {
    _logger("onGetOrgStatsSuccess", response);

    let newOrgData = {};
    newOrgData.id = response.id;
    newOrgData.byWeek = response.data.items[0];
    newOrgData.byMonth = response.data.items[1];
    newOrgData.byYear = response.data.items[2];

    if (!orgsDataArray.find((object) => object.id === newOrgData.id)) {
      setOrgsDataArray((prevState) => {
        return [...prevState, newOrgData];
      });
    }
  };

  const onGetOrgStatsError = (response) => {
    _logger("onGetOrgStatsError", response);
    toastr.error("Failed to get organization's stats.", "Error");
  };
  //#endregion

  const getEachOrgStats = (ids) => {
    for (let i = 0; i < ids?.length; i++) {
      getOrgHacksOverTime(ids[i]);
    }
  };

  return (
    <Col xl={12} lg={12} md={12} className="mb-2">
      <Card className="h-100">
        <Card.Header className="internal-analytics-card-header-evenly card-header-height">
          <h4 className="internal-analytics-title">Hacks per Organization</h4>
          <Select
            isMulti
            name="organizations"
            options={selectOptions}
            onChange={onOrgSelect}
            components={animatedComponents}
          />
        </Card.Header>
        <Card.Body>
          <ApexCharts
            options={orgHacksChartOptions(props?.selectedYear)}
            series={hacksChartDataSeries(orgsAlphabetical, orgsDataArray)}
            type="line"
          />
        </Card.Body>
      </Card>
    </Col>
  );
};

OrgHacksChart.propTypes = {
  secEvtsOrgs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  selectedYear: PropTypes.number,
};

export default OrgHacksChart;

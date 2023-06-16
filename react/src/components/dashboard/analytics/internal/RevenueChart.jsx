import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import Select from "react-select";
import ApexCharts from "../ApexCharts";
import PropTypes from "prop-types";
import { getDateValue } from "utils/dateFormater";
import debug from "sabio-debug";
import { getLastXYears, getMonthsValuesChooseYear } from "./internalFunctions";
import {
  chartSeriesDataName,
  earningsChartOptions,
  monthLabels,
} from "./internalChartData";
const _logger = debug.extend("RevenueChart");

const RevenueChart = (props) => {
  _logger("props", props);
  const weekRevenue = props?.revenue?.byWeek;
  const monthRevenue = props?.revenue?.byMonth;
  const yearRevenue = props?.revenue?.byYear;
  const selectOptions = [
    { value: "1", label: "Weeks" },
    { value: "2", label: "Months" },
    { value: "3", label: "Years" },
  ];

  const [chartData, setChartData] = useState({
    revenueSeries: [],
    revenueOptions: {},
  });

  useEffect(() => {
    setChartData((prevState) => {
      let newState = { ...prevState };
      newState.revenueSeries = chartSeriesDataName(
        getWeeksValues(weekRevenue),
        "Total Revenue"
      );
      newState.revenueOptions = earningsChartOptions(getPast12Weeks());
      return newState;
    });
  }, [props]);

  const onTimePeriodSelect = (e) => {
    const seriesValues = [
      null,
      getWeeksValues(weekRevenue),
      getMonthsValuesChooseYear(
        props?.selectedYear,
        monthRevenue,
        "timePeriod",
        "totalRevenue"
      ),
      getYearsValues(yearRevenue),
    ];

    const seriesLabels = [
      null,
      getPast12Weeks(),
      monthLabels,
      getLastXYears(6),
    ];

    setChartData((prevState) => {
      let newState = { ...prevState };
      newState.revenueSeries = chartSeriesDataName(
        seriesValues[e.value],
        "Total Revenue"
      );
      newState.revenueOptions = earningsChartOptions(seriesLabels[e.value]);
      return newState;
    });
  };

  const getPast12Weeks = () => {
    let weeks = [];
    const today = new Date();
    const first = today.getDate() - today.getDay() + 1;
    const last = first + 6;
    const sunday = new Date(today.setDate(last));

    for (let i = 0; i <= 12; i++) {
      let week = new Date(
        sunday.getFullYear(),
        sunday.getMonth(),
        sunday.getDate()
      );
      week.setDate(week.getDate() - i * 7);
      weeks.push(getDateValue(week));
    }

    weeks.shift();
    weeks.reverse();
    return weeks;
  };

  const getWeeksValues = (data) => {
    let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let past12weeks = getPast12Weeks();

    for (let i = 0; i < array.length; i++) {
      const element = data.find(
        (e) => `${new Date(e.timePeriod)}` === `${new Date(past12weeks[i])}`
      );
      if (element !== undefined) {
        array[i] = element.totalRevenue;
      }
    }

    return array;
  };

  const getYearsValues = (data) => {
    let array = getLastXYears(6);

    for (let i = 0; i < array.length; i++) {
      const element = data.find(
        (e) => new Date(e.timePeriod).getFullYear() === array[i]
      );
      if (element !== undefined) {
        array[i] = element.totalRevenue;
      } else {
        array[i] = 0;
      }
    }

    return array;
  };

  return (
    <React.Fragment>
      <Col xs={12} sm={12} md={12} lg={8} xl={8} className="mb-3">
        <Card>
          <Card.Header className="internal-analytics-card-header-evenly card-header-height">
            <div>
              <h4 className="internal-analytics-title">Revenue</h4>
            </div>
            <div>
              <Select
                name="revenue"
                defaultValue={selectOptions[0]}
                options={selectOptions}
                onChange={onTimePeriodSelect}
              ></Select>
            </div>
          </Card.Header>
          <Card.Body>
            <ApexCharts
              options={chartData.revenueOptions}
              series={chartData.revenueSeries}
              type="line"
            />
          </Card.Body>
        </Card>
      </Col>
    </React.Fragment>
  );
};

RevenueChart.propTypes = {
  revenue: PropTypes.shape({
    byMonth: PropTypes.arrayOf(
      PropTypes.shape({
        timePeriod: PropTypes.string.isRequired,
        totalRevenue: PropTypes.number.isRequired,
      })
    ).isRequired,
    byWeek: PropTypes.arrayOf(
      PropTypes.shape({
        timePeriod: PropTypes.string.isRequired,
        totalRevenue: PropTypes.number.isRequired,
      })
    ).isRequired,
    byYear: PropTypes.arrayOf(
      PropTypes.shape({
        timePeriod: PropTypes.string.isRequired,
        totalRevenue: PropTypes.number.isRequired,
      })
    ).isRequired,
  }),
  selectedYear: PropTypes.number,
};

export default RevenueChart;

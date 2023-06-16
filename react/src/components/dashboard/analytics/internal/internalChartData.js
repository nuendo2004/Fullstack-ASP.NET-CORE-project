const currentYear = new Date().getFullYear();
export const currentYearMonths = [
  `January ${currentYear}`,
  `February ${currentYear}`,
  `March ${currentYear}`,
  `April ${currentYear}`,
  `May ${currentYear}`,
  `June ${currentYear}`,
  `July ${currentYear}`,
  `August ${currentYear}`,
  `September ${currentYear}`,
  `October ${currentYear}`,
  `November ${currentYear}`,
  `December ${currentYear}`,
];

export const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const yearMonths = (year) => {
  if (!year) {
    return [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  } else {
    return [
      `January ${year}`,
      `February ${year}`,
      `March ${year}`,
      `April ${year}`,
      `May ${year}`,
      `June ${year}`,
      `July ${year}`,
      `August ${year}`,
      `September ${year}`,
      `October ${year}`,
      `November ${year}`,
      `December ${year}`,
    ];
  }
};

export const chartSeriesData = (data) => {
  return [
    {
      data: data,
    },
  ];
};

export const chartSeriesDataName = (data, name) => {
  return [
    {
      name: name,
      data: data,
    },
  ];
};

export const totalUsersChartOptions = (year) => {
  return {
    chart: {
      height: 60,
      type: "area",
      toolbar: { show: !1 },
      sparkline: { enabled: true },
      grid: { show: !1, padding: { left: 0, right: 0 } },
    },
    colors: ["#19cb98"],
    dataLabels: { enabled: !1 },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      colors: "#19cb98",
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 100],
      },
    },
    xaxis: {
      labels: { show: !1 },
      axisBorder: { show: !1 },
      categories: yearMonths(year),
    },
    yaxis: [
      {
        show: false,
        y: 0,
        offsetX: 0,
        offsetY: 0,
        padding: { left: 0, right: 0 },
        labels: {
          formatter: function (val) {
            return val;
          },
        },
      },
    ],
    tooltip: { x: { show: 1 } },
  };
};

export const flaggedUsersChartOptions = (year) => {
  return {
    chart: {
      height: 60,
      type: "area",
      toolbar: { show: !1 },
      sparkline: { enabled: true },
      grid: { show: !1, padding: { left: 0, right: 0 } },
    },
    colors: ["#E85050"],
    dataLabels: { enabled: !1 },
    stroke: { curve: "smooth", width: 2 },
    fill: {
      colors: "#E85050",
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.5,
        stops: [0, 100],
      },
    },
    xaxis: {
      labels: { show: !1 },
      axisBorder: { show: !1 },
      categories: yearMonths(year),
    },
    yaxis: [
      {
        show: false,
        y: 0,
        offsetX: 0,
        offsetY: 0,
        padding: { left: 0, right: 0 },
        labels: {
          formatter: function (val) {
            return val;
          },
        },
      },
    ],
    tooltip: { x: { show: 1 } },
  };
};

export const activeUsersChartOptions = {
  labels: monthLabels,
  chart: {
    fontFamily: "$font-family-base",
    type: "line",
    toolbar: { show: !1 },
    grid: { show: !1, padding: { left: 0, right: 0 } },
    offsetX: 0,
    zoom: {
      enabled: false,
    },
  },
  colors: ["#29BAF9"],
  dataLabels: { enabled: !1 },
  stroke: { curve: "smooth", width: 4, colors: ["#29BAF9"] },
  xaxis: {
    axisBorder: { show: !1 },
    axisTicks: { show: !1 },
    crosshairs: { show: !0 },
    labels: {
      offsetX: 0,
      offsetY: 5,
      style: { fontSize: "13px", fontWeight: 400, colors: "#a8a3b9" },
    },
  },
  yaxis: [
    {
      y: 0,
      offsetX: 0,
      offsetY: 0,
      padding: { left: 0, right: 0 },
      labels: {
        formatter: function (val) {
          return val;
        },
      },
    },
  ],
  grid: {
    borderColor: "#e0e6ed",
    strokeDashArray: 5,
    xaxis: { lines: { show: !1 } },
    yaxis: { lines: { show: !0 } },
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    offsetY: -50,
    fontSize: "16px",
    markers: {
      width: 10,
      height: 10,
      strokeWidth: 0,
      strokeColor: "#fff",
      fillColors: void 0,
      radius: 12,
      onClick: void 0,
      offsetX: 0,
      offsetY: 0,
    },
    itemMargin: { horizontal: 0, vertical: 20 },
  },
  tooltip: { theme: "light", marker: { show: !0 }, x: { show: !1 } },
};

export const pendingUsersChartOptions = {
  labels: monthLabels,
  chart: {
    fontFamily: "$font-family-base",
    type: "line",
    toolbar: { show: !1 },
    grid: { show: !1, padding: { left: 0, right: 0 } },
    offsetX: 0,
    zoom: {
      enabled: false,
    },
  },
  colors: ["#c28135"],
  dataLabels: { enabled: !1 },
  stroke: { curve: "smooth", width: 4 },
  xaxis: {
    axisBorder: { show: !1 },
    axisTicks: { show: !1 },
    crosshairs: { show: !0 },
    labels: {
      offsetX: 0,
      offsetY: 5,
      style: { fontSize: "13px", fontWeight: 400, colors: "#a8a3b9" },
    },
  },
  yaxis: [
    {
      y: 0,
      offsetX: 0,
      offsetY: 0,
      padding: { left: 0, right: 0 },
      labels: {
        formatter: function (val) {
          return val;
        },
      },
    },
  ],
  grid: {
    borderColor: "#e0e6ed",
    strokeDashArray: 5,
    xaxis: { lines: { show: !1 } },
    yaxis: { lines: { show: !0 } },
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  },
  legend: {
    position: "top",
    horizontalAlign: "right",
    offsetY: -50,
    fontSize: "16px",
    markers: {
      width: 10,
      height: 10,
      strokeWidth: 0,
      strokeColor: "#fff",
      fillColors: void 0,
      radius: 12,
      onClick: void 0,
      offsetX: 0,
      offsetY: 0,
    },
    itemMargin: { horizontal: 0, vertical: 20 },
  },
  tooltip: { theme: "light", marker: { show: !0 }, x: { show: !1 } },
};

export const organizationsUsersChartOptions = (
  categories,
  name,
  columnWidth
) => {
  return {
    chart: {
      id: `totalOrg${name}Chart`,
      redrawOnParentResize: true,
    },
    dataLabels: {
      enabled: true,
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        horizontal: true,
        columnWidth: `${columnWidth}%`,
      },
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };
};

export const activeDemoChartOptions = (categories) => {
  return {
    chart: {
      type: "bar",
      height: 200,
      sparkline: { enabled: true },
      offsetY: +10,
    },
    states: {
      normal: { filter: { type: "none", value: 0 } },
      hover: { filter: { type: "darken", value: 0.55 } },
      active: {
        allowMultipleDataPointsSelection: !1,
        filter: { type: "darken", value: 0.55 },
      },
    },
    colors: ["#8968fe"],
    plotOptions: {
      bar: { borderRadius: 4, columnWidth: "50%" },
    },
    xaxis: {
      crosshairs: { width: 1 },
      categories: categories,
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return val;
        },
      },
    },
    dataLabels: {
      enabled: true,
      rotate: 90,
      textAnchor: "middle",
      style: {
        colors: ["#8968fe"],
      },
      formatter: function (val) {
        if (val === 0) {
          return "0";
        }
      },
    },
    tooltip: {
      fixed: { enabled: !1 },
      x: { show: 1 },
      y: {
        title: {
          formatter: function () {
            return ["Active Demo Accounts:"];
          },
        },
      },
      marker: { show: !1 },
      shared: true,
      intersect: false,
    },
    responsive: [
      { breakpoint: 480, options: { chart: { height: 150 } } },
      { breakpoint: 1441, options: { chart: { height: 150 } } },
      { breakpoint: 1981, options: { chart: { height: 150 } } },
      { breakpoint: 2500, options: { chart: { height: 250 } } },
      { breakpoint: 3000, options: { chart: { height: 300 } } },
    ],
  };
};

export const earningsChartOptions = (labels) => {
  return {
    labels: labels,
    chart: {
      fontFamily: "$font-family-base",
      height: 200,
      type: "line",
      toolbar: { show: !1 },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#754FFE"],
    stroke: { width: 4, curve: "smooth", colors: ["#754FFE"] },
    xaxis: {
      axisBorder: { show: !1 },
      axisTicks: { show: !1 },
      crosshairs: { show: !0 },
      labels: {
        offsetX: 0,
        offsetY: 5,
        style: { fontSize: "13px", fontWeight: 400, colors: "#a8a3b9" },
      },
    },
    yaxis: {
      labels: {
        formatter: function (e) {
          return "$" + e;
        },
        style: { fontSize: "13px", fontWeight: 400, colors: "#a8a3b9" },
        offsetX: -15,
      },
    },
    grid: {
      borderColor: "#e0e6ed",
      strokeDashArray: 5,
      xaxis: { lines: { show: !1 } },
      yaxis: { lines: { show: !0 } },
      padding: { top: 0, right: 0, bottom: 0, left: 0 },
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      offsetY: -50,
      fontSize: "16px",
      markers: {
        width: 10,
        height: 10,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: void 0,
        radius: 12,
        onClick: void 0,
        offsetX: 0,
        offsetY: 0,
      },
      itemMargin: { horizontal: 0, vertical: 20 },
    },
    tooltip: { theme: "light", marker: { show: !0 }, x: { show: !1 } },

    responsive: [
      { breakpoint: 480, options: { chart: { height: 250 } } },
      { breakpoint: 1441, options: { chart: { height: 250 } } },
      { breakpoint: 1981, options: { chart: { height: 250 } } },
      { breakpoint: 2500, options: { chart: { height: 350 } } },
      { breakpoint: 3000, options: { chart: { height: 400 } } },
    ],
  };
};

export const orgHacksChartOptions = (year) => {
  return {
    chart: {
      toolbar: { show: !1 },
      height: 200,
      type: "line",
      zoom: { enabled: !1 },
      stacked: false,
    },
    colors: [
      "#0AB0F2",
      "#0AB0F2",
      "#50E85E",
      "#50E85E",
      "#EFF20A",
      "#EFF20A",
      "#F2210A",
      "#F2210A",
      "#BA0AF2",
      "#BA0AF2",
      "#F2A20A",
      "#F2A20A",
    ],
    dataLabels: { enabled: false },
    stroke: {
      width: 3,
      curve: "smooth",
      dashArray: [0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3],
    },
    legend: { show: !1 },
    markers: { size: 0, hover: { sizeOffset: 6 } },
    xaxis: {
      categories: yearMonths(year),
      labels: {
        style: {
          fontSize: "12px",
          fontFamily: "Inter",
          cssClass: "apexcharts-xaxis-label",
        },
      },
    },
    yaxis: [
      {
        labels: {
          style: {
            fontSize: "12px",
            fontFamily: "Inter",
            cssClass: "apexcharts-xaxis-label",
          },
          title: {
            text: "Hacks",
          },
          offsetX: -12,
          offsetY: 0,
        },
      },
    ],
    tooltip: {},
    grid: { borderColor: "#f1f1f1" },
    responsive: [
      { breakpoint: 480, options: { chart: { height: 300 } } },
      { breakpoint: 1441, options: { chart: { height: 360 } } },
      { breakpoint: 1980, options: { chart: { height: 400 } } },
      { breakpoint: 2500, options: { chart: { height: 470 } } },
      { breakpoint: 3000, options: { chart: { height: 450 } } },
    ],
  };
};

export const InternalChartData = [
  currentYearMonths,
  monthLabels,
  yearMonths,
  chartSeriesData,
  chartSeriesDataName,
  totalUsersChartOptions,
  flaggedUsersChartOptions,
  activeUsersChartOptions,
  pendingUsersChartOptions,
  organizationsUsersChartOptions,
  activeDemoChartOptions,
  earningsChartOptions,
  orgHacksChartOptions,
];

export default InternalChartData;

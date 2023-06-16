export const calculatePercentChangeArray = (dataArray) => {
  let array = [];

  for (let i = 0; i < dataArray.length; i++) {
    let percent;
    let a = dataArray[i - 1];
    let b = dataArray[i];
    if (b !== 0) {
      if (a !== 0) {
        percent = ((b - a) / a) * 100;
      } else {
        percent = b * 100;
      }
    } else if (isNaN(a)) {
      percent = 0;
    } else {
      percent = -a * 100;
    }
    array.push(Math.floor(percent));
  }
  return array;
};

export const dynamicSort = (property) => {
  return function (a, b) {
    return a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
  };
};

export const getLastXYears = (number) => {
  let years = [];
  for (let i = 0; i < number; i++) {
    years.push(new Date().getFullYear() - i);
  }
  years.reverse();
  return years;
};

export const getMonthsValuesChooseYear = (year, data, ISODate, property) => {
  let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < data?.length; i++) {
    if (isDateInYear(year, data[i][ISODate])) {
      let dateMonth = data[i][ISODate].slice(5, 7);
      const monthIndex = Number(dateMonth) - 1;
      array[monthIndex] = data[i][property];
    }
  }
  return array;
};

export const getMonthsValuesCurrentYear = (data, ISODate, property) => {
  let array = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < data?.length; i++) {
    if (isDateInThisYear(data[i][ISODate])) {
      let dateMonth = data[i][ISODate].slice(5, 7);
      const monthIndex = Number(dateMonth) - 1;
      array[monthIndex] = data[i][property];
    }
  }
  return array;
};

export const getPropertyValues = (data, property) => {
  return data.map((object) => object[property]);
};

export const getSelectYearsOptions = (number) => {
  let years = getLastXYears(number);
  let optionsArray = years.map((year) => ({ value: year, label: year }));
  return optionsArray;
};

export const isDateInThisWeek = (date) => {
  const today = new Date();
  const todayDate = today.getDate();
  const todayDay = today.getDay();
  const firstDayOfWeek = new Date(
    new Date(today).setDate(todayDate - todayDay)
  );
  firstDayOfWeek.setHours(0, 0, 0, 0);
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);
  lastDayOfWeek.setHours(23, 59, 59, 59);

  return date >= firstDayOfWeek && date <= lastDayOfWeek;
};

export const isDateInThisYear = (date) => {
  const thisYear = new Date().getFullYear();
  const dateToCheck = new Date(date).getFullYear();
  return dateToCheck === thisYear;
};

export const isDateInYear = (year, date) => {
  const thisYear = year;
  const dateToCheck = new Date(date).getFullYear();
  return dateToCheck === thisYear;
};

export const optimalColumnWidthPercent = (seriesLength) => {
  return 20 + 60 / (1 + 30 * Math.exp(-seriesLength / 3));
};

export const returnPercentageString = (numOne, numTwo) => {
  return `${Math.round((numOne / numTwo) * 100)}%`;
};

export const summaryIconColor = (variant) => {
  switch (variant) {
    case "up":
      return "success";
    case "success":
      return "success";
    case "down":
      return "danger";
    case "danger":
      return "danger";
    case "secondary":
      return "secondary";
    case "warning":
      return "warning";
    case "info":
      return "info";
    default:
      return "primary";
  }
};

const internalFunctions = [
  calculatePercentChangeArray,
  dynamicSort,
  getLastXYears,
  getPropertyValues,
  getMonthsValuesChooseYear,
  getMonthsValuesCurrentYear,
  isDateInThisWeek,
  isDateInThisYear,
  isDateInYear,
  optimalColumnWidthPercent,
  returnPercentageString,
  summaryIconColor,
];

export default internalFunctions;

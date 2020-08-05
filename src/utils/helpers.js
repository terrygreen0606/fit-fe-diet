import { monthNames } from 'constants/monthNames';

export const localStringToNumber = (s) => {
  return Number(String(s).replace(/[^0-9.]+/g, ''));
};

export const deepObjectMerge = (destination, source) => {
  const newDestination = { ...destination };
  const newSource = { ...source };

  for (const property in newSource) {
    if (typeof newSource[property] === 'object' && newSource[property] !== null) {
      newDestination[property] = {
        ...newDestination[property],
        ...newSource[property]
      };
    } else {
      newDestination[property] = newSource[property];
    }
  }

  return newDestination;
};

export const getMonthName = (monthNum, months = monthNames.en) => {
  let monthName = '';

  if (months[monthNum - 1]) {
    monthName = months[monthNum - 1];
  }

  return monthName;
};

export const getWordNumEnding = (iNumber, aEndings = ['day', 'days', 'days']) => {
  let sEnding, i; // 1 day 4 days 5 days
  
  iNumber = Number(iNumber) % 100;

  if (iNumber >= 11 && iNumber <= 19) {
      sEnding = aEndings[2];
  } else {
    i = iNumber % 10;

    switch (i) {
      case (1): sEnding = aEndings[0]; break;
      case (2):
      case (3):
      case (4): sEnding = aEndings[1]; break;
      default: sEnding = aEndings[2];
    }
  }

  return sEnding;
};

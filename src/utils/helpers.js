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

export const getMonthName = (monthNum) => {
  const monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let monthName = '';

  if (monthsNames[monthNum - 1]) {
    monthName = monthsNames[monthNum - 1];
  }

  return monthName;
};

export const getDayEnding = (iNumber) => {
  let sEnding, i, aEndings = ['day', 'days', 'days']; // 1 4 5
  
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

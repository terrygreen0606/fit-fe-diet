export const OVERWEIGHT = {
  type: 1,
  str: 'Overweight',
};
export const NORMAL = {
  type: 0,
  str: 'Normal',
};
export const UNDERWEIGHT = {
  type: -1,
  str: 'Underweight',
};

export const bmiStatus = (bmiType) => {
  let weight = '';
  if (bmiType === OVERWEIGHT.type) {
    weight = OVERWEIGHT.str;
  } else if (bmiType === NORMAL.type) {
    weight = NORMAL.str;
  } else {
    weight = UNDERWEIGHT.str;
  }

  return weight;
};

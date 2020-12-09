export const OVERWEIGHT = 'Overweight';
export const NORMAL = 'Normal';
export const UNDERWEIGHT = 'Underweight';

export const bmiStatus = (bmi) => {
  let weight = '';
  if (bmi > 25) weight = OVERWEIGHT;
  else if (bmi >= 18.6 && bmi < 25) weight = NORMAL;
  else weight = UNDERWEIGHT;

  return weight;
};

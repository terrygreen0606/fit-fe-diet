import axios from 'utils/axios';

type UserWeightPredictionParams = {
  measurement: 'si' | 'us',
  height?: number, // centimeters/feet,inch
  weight?: number, // kilograms/pounds 30..400
  weight_goal?: number, // kilograms/pounds 30..400
  goal?: -1 | 0 | 1, // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight
};

export const getUserWeightPrediction = (params: UserWeightPredictionParams) => {
  return axios.get('/user/weightprediction', {
    params
  });
};

import axios from 'utils/axios';

type userUpdateProfileParams = {
  name: string,
  surname: string,
  phone: string,
  birthdate: number, // timestamp
  gender: 'm' | 'f',
  measurement: 'si' | 'us',
  height: number, // height in centimeters/feet,inch
  goal: -1 | 0 | 1 // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight
};

export const userUpdateProfile = (params: userUpdateProfileParams) => {
  return axios.put('/user/update-profile', params);
};

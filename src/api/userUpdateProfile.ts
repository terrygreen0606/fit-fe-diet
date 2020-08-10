import axios from 'utils/axios';

type userUpdateProfileParams = {
  name: string,
  surname: string,
  phone: string,
  birthdate: number, // timestamp
  gender: 'm' | 'f',
  height: number, // millimeters
  goal: -1 | 0 | 1 // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight
};

export const userUpdateProfile = (params: userUpdateProfileParams) => {
  return axios.post('/user/update-profile', params);
};

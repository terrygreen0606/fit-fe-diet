import axios from 'utils/axios';

type UserSignupParams = {
  email: string,
  password: string,
  name: string,
  surname: string,
  phone: string,
  age?: number,
  gender: 'm' | 'f',
  measurement: 'si' | 'us',
  height?: number,
  weight?: number,
  weight_goal?: number,
  goal?: -1 | 0 | 1,
  ignore_cusine_ids?: string[]
};

export const userSignup = (params: UserSignupParams) => axios.post('/user/signup', {
  ...params,
});

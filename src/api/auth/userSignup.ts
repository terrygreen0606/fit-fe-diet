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
  height?: number, // centimeters/feet,inch
  weight?: number, // kilograms 30..400
  weight_goal?: number, // kilograms 30..400
  goal?: -1 | 0 | 1, // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight
  ignore_cusine_ids?: string[]
};

export const userSignup = (params: UserSignupParams) => axios.post('/user/signup', {
  ...params,
});

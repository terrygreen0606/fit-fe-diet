import axios from 'utils/axios';
import { UserAuthProfileType } from 'types/auth';

interface UserSignupParams extends UserAuthProfileType {
  email: string;
  password: string;
};

export const userSignup = (params: UserSignupParams) => axios.post('/user/signup', {
  ...params,
});

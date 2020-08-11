import axios from 'utils/axios';

export const userLogin = (email: string, password: string) => axios.post('/user/login', {
  email,
  password,
});

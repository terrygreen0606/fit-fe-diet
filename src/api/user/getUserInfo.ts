import axios from 'utils/axios';

export const getUserInfo = () => axios.get('user/profile');

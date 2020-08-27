import axios from 'utils/axios';

export const fetchUserProfile = () => axios.get('/user/profile');

import axios from 'utils/axios';

export const getUserSettings = () => axios.get('app/settings');

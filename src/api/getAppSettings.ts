import axios from 'utils/axios';

export const getAppSettings = () => axios.get('/app/settings');

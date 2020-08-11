import axios from 'utils/axios';

export const userAcknowledge = (token: string) => axios.post('/user/ack', {}, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

import axios from 'utils/axios';

export const getPaymentHistory = () =>
  axios.get('/payment/history');

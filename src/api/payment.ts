import axios from 'utils/axios';

export const getPaymentHistory = () =>
  axios.get('/payment/history');

export const getPaymentMethods = () =>
  axios.get('/payment/methods');

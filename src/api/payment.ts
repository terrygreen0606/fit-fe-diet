import axios from 'utils/axios';
import { creditCardPayParams } from 'types';

export const getPaymentHistory = () =>
  axios.get('/payment/history');

export const getPaymentMethods = () =>
  axios.get('/payment/methods');

export const payCreditCard = (params: creditCardPayParams) =>
  axios.post('/payment/card', params);

import axios from 'utils/axios';
import { creditCardPayParams } from 'types';

export const getPaymentHistory = () =>
  axios.get('/payment/history');

export const getPaymentMethods = () =>
  axios.get('/payment/methods');

export const payCreditCard = (params: creditCardPayParams) =>
  axios.post('/payment/card', params);

export const getCheckoutTariff = () =>
  axios.get('/payment/checkout-tariff');

export const getAppTariff = (id: string) =>
  axios.get(`/app/tariff/${id}`);

export const getAppTariffs = () =>
  axios.get('/app/get-tariffs');

export const getPaymentStatus = (id: string) =>
  axios.get(`/payment/status/${id}`);

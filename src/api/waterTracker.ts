import { stringify } from 'querystring';
import axios from 'utils/axios';

export const getDataStatsForPeriod = (
  period: string | 'week' | 'month' | 'year',
) =>
  axios.get(`/water/stats?period=${period}`);

export const getDataStatsForToday = () =>
  axios.get('/water/today');

export const addDrink = (measurement: string, amount: number) =>
  axios.post('/water/add-drink', {
    measurement,
    amount,
  });

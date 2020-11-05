/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'utils/axios';
import {
  UserValidateParams,
  UserWeightPredictionParams,
  UserUpdateProfileParams,
  UserUpdateMealSettingsParams,
} from 'types';

export const deleteFamilyMembers = (email: string) =>
  axios.delete(`/user/family/${email}`);

export const fetchUserProfile = () =>
  axios.get('/user/profile');

export const getUserFamily = () =>
  axios.get('/user/family');

export const getUserInviteLink = () =>
  axios.get('/user/invite-link');

export const getUserSettings = () =>
  axios.get('/app/settings');

export const getUserWeightChart = () =>
  axios.get('/user/weight-chart');

export const getUserWeightPrediction = (params: UserWeightPredictionParams) =>
  axios.get('/user/weight-prediction', {
    params,
  });

export const userInviteFriendByEmail = (email: string) =>
  axios.put(`/user/invite-friend/${email}`);

export const userUpdateProfile = (params: UserUpdateProfileParams) =>
  axios.put('/user/update-profile', params);

export const userUpdateMealSettings = (params: UserUpdateMealSettingsParams) =>
  axios.put('/user/meal-settings', params);

export const userValidate = (params: UserValidateParams) =>
  axios.post('/user/validate', { ...params });

export const userUpdateMeasurement = (measurement: string) =>
  axios.put('/user/measurement', {
    measurement,
  });

export const getPublicShopListUrl = (txt: number = 0) =>
  axios.get(`/user/shopping-list-url?txt=${txt}`);

export const getAppTariff = (id: string) =>
  axios.get(`/app/tariff/${id}`);

export const getActiveAppTariff = () =>
  axios.get('/user/tariff');

export const getAppTariffs = () =>
  axios.get('/app/get-tariffs');

export const getAppReviews = () =>
  axios.get('/app/reviews');

export const userInviteFamilyByEmail = (email: string) =>
  axios.put(`/user/invite-family/${email}`);

export const getUserDashboard = () =>
  axios.get('/user/dashboard');

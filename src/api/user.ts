/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'utils/axios';
import { UserValidateParams } from 'types';

export const deleteFamilyMembers = (email: string) => axios.delete(`/user/family/${email}`);

export const fetchUserProfile = () => axios.get('/user/profile');

export const getUserFamily = () => axios.get('user/family');

export const getUserInviteLink = () => axios.get('user/invite-link');

export const getUserSettings = () => axios.get('app/settings');

export const getUserWeightChart = () => {
  return axios.get('/user/weight-chart');
};

type UserWeightPredictionParams = {
  measurement: 'si' | 'us',
  height?: number, // centimeters/feet,inch
  weight?: number, // kilograms/pounds 30..400
  weight_goal?: number, // kilograms/pounds 30..400
  goal?: -1 | 0 | 1, // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight
};

export const getUserWeightPrediction = (params: UserWeightPredictionParams) => axios.get('/user/weight-prediction', {
  params,
});

export const userInviteFriendByEmail = (email: string) => axios.put(`user/invite-friend/${email}`);

type userUpdateProfileParams = {
  name: string,
  measurement: 'si' | 'us',
  gender: 'm' | 'f',
  surname?: string,
  phone?: string,
  is_mailing?: boolean,
};

export const userUpdateProfile = (params: userUpdateProfileParams) => axios.put('/user/update-profile', params);

type userUpdateMealSettingsParams = {
  measurement: 'si' | 'us', // allowed values 'si', 'us'
  gender: 'm' | 'f', // allowed values 'm', 'f'
  age: number, // size range: 16..100
  height: string, // centimeters/feet,inch
  weight: number, // kilograms/pounds 30..999
  weight_goal: number, // kilograms/pounds 30..999
  goal: -1 | 0 | 1, // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight,
  ignore_cuisine_ids: Array<string>, // Ignorable cuisine ids
  diseases: Array<string>, // Diseases codes
  meals_cnt: 3 | 4 | 5, // size range: 3..5
  act_level: number, // size range: 1000..2000
};

export const userUpdateMealSettings = (params: userUpdateMealSettingsParams) =>
  axios.put('/user/meal-settings', params);

export const userValidate = (params: UserValidateParams) =>
  axios.post('/user/validate', { ...params });

export const userUpdateMeasurement = (measurement: string) =>
  axios.put('/user/measurement', {
    measurement,
  });

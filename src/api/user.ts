/* eslint-disable @typescript-eslint/naming-convention */
import axios from 'utils/axios';

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
  surname: string,
  phone: string,
  birthdate: number, // timestamp
  gender: 'm' | 'f',
  measurement: 'si' | 'us',
  height: number, // height in centimeters/feet,inch
  goal: -1 | 0 | 1, // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight
};

export const userUpdateProfile = (params: userUpdateProfileParams) => axios.put('/user/update-profile', params);

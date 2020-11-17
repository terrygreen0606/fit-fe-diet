/* eslint-disable no-restricted-syntax */
export type UserAuthProfileType = {
  name: string,
  surname: string,
  phone: string,
  age?: number,
  gender: 'm' | 'f',
  measurement: 'si' | 'us',
  tpl_signup: number,
  height?: number, // centimeters/feet,inch
  weight?: number, // kilograms/pounds 30..400
  weight_goal?: number, // kilograms/pounds 30..400
  ignore_cuisine_ids?: string[],
  diseases?: string[],
  act_levels?: string[],
  meal_counts?: any[],
  request_hash?: string,
  reg_url?: string,
  reg_params?: string,
};

export type UserFacebookSignUpParams = {
  token: string,
  profile: UserAuthProfileType
};

export type UserGoogleSignUpParams = {
  id_token: string,
  profile: UserAuthProfileType
};

export interface UserSignupParams extends UserAuthProfileType {
  email: string;
  password: string;
}

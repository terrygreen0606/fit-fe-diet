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
  goal?: -1 | 0 | 1, // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight
  ignore_cuisine_ids?: string[],
  diseases?: string[],
  act_levels?: string[],
  meal_counts?: any[]
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

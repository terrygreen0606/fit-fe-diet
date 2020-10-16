export type InputError = {
  code?: string,
  field?: string,
  message: string
};

export type UserValidateParams = {
  name?: string,
  surname?: string,
  email?: string,
  phone?: string,
  age?: number,
  gender?: 'm' | 'f',
  measurement?: 'si' | 'us',
  height?: number, // centimeters/feet,inch
  weight?: number, // kilograms/pounds 30..400
  weight_goal?: number, // kilograms/pounds 30..400
  goal?: -1 | 0 | 1, // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight
  ignore_cuisine_ids?: string[],
  diseases?: string[]
};

export type UserWeightPredictionParams = {
  measurement: 'si' | 'us',
  height?: number, // centimeters/feet,inch
  weight?: number, // kilograms/pounds 30..400
  weight_goal?: number, // kilograms/pounds 30..400
  goal?: -1 | 0 | 1, // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight
};

export type UserUpdateProfileParams = {
  name: string,
  measurement: 'si' | 'us',
  gender: 'm' | 'f',
  surname?: string,
  phone?: string,
  is_mailing?: boolean,
};

export type UserUpdateMealSettingsParams = {
  measurement?: 'si' | 'us', // allowed values 'si', 'us'
  gender?: 'm' | 'f', // allowed values 'm', 'f'
  age?: number, // size range: 16..100
  height?: string, // centimeters/feet,inch
  weight?: number, // kilograms/pounds 30..999
  weight_goal?: number, // kilograms/pounds 30..999
  goal?: -1 | 0 | 1, // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight,
  ignore_cuisine_ids?: Array<string>, // Ignorable cuisine ids
  diseases?: Array<string>, // Diseases codes
  meals_cnt?: number | 3 | 4 | 5, // size range: 3..5
  act_level?: number, // size range: 1000..2000
};

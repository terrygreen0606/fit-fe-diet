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

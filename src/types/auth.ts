export type UserAuthProfileType = {
  name: string,
  surname: string,
  phone: string,
  age?: number,
  gender: 'm' | 'f',
  measurement: 'si' | 'us',
  tpl_signup: number,
  height?: number, // millimeters 500..2500
  weight?: number, // grams 30000..400000
  weight_goal?: number, // grams 30000..400000
  goal?: -1 | 0 | 1, // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight
  ignore_cuisine_ids?: string[]
};

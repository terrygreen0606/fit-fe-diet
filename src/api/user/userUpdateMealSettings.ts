import axios from 'utils/axios';

export const userUpdateMealSettings = (
  measurement: 'si' | 'us', // allowed values 'si', 'us'
  gender?: 'm' | 'f', // allowed values 'm', 'f'
  age?: number, // size range: 12..100
  height?: string, // centimeters/feet,inch
  weight?: number, // kilograms/pounds 30..999
  weight_goal?: number, // kilograms/pounds 30..999
  goal?: -1 | 0 | 1, // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight,
  ignore_cuisine_ids?: Array<string>, // Ignorable cuisine ids
  diseases?: Array<string>, // Diseases codes
  meals_cnt?: 3 | 4 | 5, // size range: 3..5
) => axios.put(
  '/user/meal-settings',
  {
    measurement,
    gender,
    age,
    height,
    weight,
    weight_goal,
    goal,
    ignore_cuisine_ids,
    diseases,
    meals_cnt,
  },
);

import axios from 'utils/axios';

export const userUpdateMealSettings = (
  measurement: 'si' | 'us' | string,
  gender?: 'm' | 'f' | string,
  age?: number,
  height?: string, // centimeters/feet,inch
  weight?: number, // kilograms/pounds 30..999
  goal?: -1 | 0 | 1, // -1 => Lose weight, 0 => Keep the weight, 1 => Lift the weight,
  ignore_cuisine_ids?: Array<string>,
  diseases?: Array<string>,
  meals_cnt?: 3 | 4 | 5,
) => axios.put(
  '/user/meal-settings',
  {
    measurement,
    gender,
    age,
    height,
    weight,
    goal,
    ignore_cuisine_ids,
    diseases,
    meals_cnt,
  },
);

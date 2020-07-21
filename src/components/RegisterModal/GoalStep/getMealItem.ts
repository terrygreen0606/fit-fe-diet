import { ReactComponent as MilkIcon } from 'assets/img/icons/milk-icon.svg';
import { ReactComponent as MeatIcon } from 'assets/img/icons/meat-icon.svg';
import { ReactComponent as FishIcon } from 'assets/img/icons/fish-icon.svg';
import { ReactComponent as CookIcon } from 'assets/img/icons/cook-icon.svg';
import { ReactComponent as BreadIcon } from 'assets/img/icons/bread-icon.svg';
import { ReactComponent as CakeIcon } from 'assets/img/icons/cake-icon.svg';

export const getMealItem = (mealId: string) => {
  let mealItem = {
    title: '',
    icon: null
  };

  switch (mealId) {
    case 'milk':
      mealItem = {
        title: 'Milk',
        icon: MilkIcon
      };
      break;

    case 'meat':
      mealItem = {
        title: 'Meat',
        icon: MeatIcon
      };
      break;

    case 'fish':
      mealItem = {
        title: 'Fish',
        icon: FishIcon
      };
      break;

    case 'diseases':
      mealItem = {
        title: 'Diseases',
        icon: CookIcon
      };
      break;

    case 'gluten':
      mealItem = {
        title: 'Gluten',
        icon: BreadIcon
      };
      break;

    case 'deabetes':
      mealItem = {
        title: 'Deabetes',
        icon: CakeIcon
      };
      break;
  }

  return mealItem;
};

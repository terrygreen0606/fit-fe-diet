import { ReactComponent as MilkIcon } from 'assets/img/icons/milk-icon.svg';
import { ReactComponent as MeatIcon } from 'assets/img/icons/meat-icon.svg';
import { ReactComponent as FishIcon } from 'assets/img/icons/fish-icon.svg';
import { ReactComponent as CookIcon } from 'assets/img/icons/cook-icon.svg';
import { ReactComponent as BreadIcon } from 'assets/img/icons/bread-icon.svg';
import { ReactComponent as CakeIcon } from 'assets/img/icons/cake-icon.svg';

export const getFoodItem = (foodId: string) => {
  let foodItem = {
    title: '',
    icon: null
  };

  switch (foodId) {
    case 'milk':
      foodItem = {
        title: 'Milk',
        icon: MilkIcon
      };
      break;

    case 'meat':
      foodItem = {
        title: 'Meat',
        icon: MeatIcon
      };
      break;

    case 'fish':
      foodItem = {
        title: 'Fish',
        icon: FishIcon
      };
      break;

    case 'diseases':
      foodItem = {
        title: 'Diseases',
        icon: CookIcon
      };
      break;

    case 'gluten':
      foodItem = {
        title: 'Gluten',
        icon: BreadIcon
      };
      break;

    case 'deabetes':
      foodItem = {
        title: 'Deabetes',
        icon: CakeIcon
      };
      break;
  }

  return foodItem;
};

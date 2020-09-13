import React from 'react';
import { ReactComponent as BreakfastIcon } from 'assets/img/icons/breakfast-icon.svg';
import { ReactComponent as LunchIcon } from 'assets/img/icons/lunch-icon.svg';
import { ReactComponent as SnackIcon } from 'assets/img/icons/snack-icon.svg';
import { ReactComponent as DinnerIcon } from 'assets/img/icons/dinner-icon.svg';

export const getMealIcon = (mealCode: string) => {
  switch (mealCode) {
    case 'breakfast':
      return <BreakfastIcon />;
    case 'lunch':
      return <LunchIcon />;
    case 'snack':
      return <SnackIcon />;
    case 'dinner':
      return <DinnerIcon />;
    default:
      return null;
  }
};

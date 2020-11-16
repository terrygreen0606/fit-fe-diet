import React from 'react';
import uuid from 'react-uuid';

import { routes } from 'constants/routes';

import { ReactComponent as WeighScaleIcon } from 'assets/img/icons/weigh-scale-icon.svg';
import { ReactComponent as WaterGlassIcon } from 'assets/img/icons/water-glass-icon.svg';

export const dataForTodayActivities = [
  {
    id: uuid(),
    icon: <WeighScaleIcon />,
    title: 'activities.weight',
    link: routes.nutritionPlanWeight,
    isActive: false,
    labelName: 'weight',
  },
  {
    id: uuid(),
    icon: <WaterGlassIcon />,
    title: 'activities.wt',
    link: routes.waterTracker,
    isActive: true,
    labelName: 'water_tracker',
  },
];

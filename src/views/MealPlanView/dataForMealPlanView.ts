import { getImagePath } from 'utils';

import { ReactComponent as DumbbellIcon } from 'assets/img/icons/dumbbell-icon.svg';
import { ReactComponent as WeighScaleIcon } from 'assets/img/icons/weigh-scale-icon.svg';
import { ReactComponent as WaterGlassIcon } from 'assets/img/icons/water-glass-icon.svg';

export const mockData = [
  {
    slide: 1,
    title: 'tour.step1.title',
    text: 'tour.step1.text',
    image: getImagePath('tour-after-signup/s1_image.png'),
    btn_text: 'register.next',
  },
  {
    slide: 2,
    title: 'tour.step2.title',
    text: 'tour.step1.text',
    image: getImagePath('tour-after-signup/s2_image.png'),
    btn_text: 'register.next',
  },
  {
    slide: 3,
    title: 'tour.step3.title',
    text: 'tour.step1.text',
    image: getImagePath('tour-after-signup/s3_image.png'),
    btn_text: 'register.next',
  },
  {
    slide: 4,
    title: 'tour.step4.title',
    image: getImagePath('tour-after-signup/s4_image.png'),
    btn_text: 'tour.start_service',
  },
];

export const tourStepFunction = (width, tourStep) => {
  const step1Element = document.querySelector('.nutrition-plan-info-col-today-activities');
  const step2Element = document.querySelector('.nutrition-plan-card-list-col');
  const step3Element = document.querySelector('.nutrition-plan-diet-settings-card');
  const scrollIntoViewOptions: ScrollIntoViewOptions = { behavior: 'smooth', block: 'center' };

  if (width > 768) {
    if (tourStep === 1) { step1Element?.scrollIntoView(scrollIntoViewOptions); }
    if (tourStep === 2) { step2Element?.scrollIntoView(scrollIntoViewOptions); }
    if (tourStep === 3) { step3Element?.scrollIntoView(scrollIntoViewOptions); }
  } else {
    if (tourStep === 1) { step1Element?.scrollIntoView(scrollIntoViewOptions); }
    if (tourStep === 2) { step2Element?.scrollIntoView(scrollIntoViewOptions); }
    // The arrangement of the components will do so
    if (tourStep === 3) { step3Element?.scrollIntoView(scrollIntoViewOptions); }
  }
};

export const dataForTodayActivities = [
  {
    icon: DumbbellIcon,
    text: 'trainings.add.workout',
    value: 'workout_add',
  },
  {
    icon: WeighScaleIcon,
    text: 'trainings.add.weight',
    value: 'weight_add',
  },
  {
    icon: WaterGlassIcon,
    text: 'trainings.wt',
    value: 'water_tracker',
  },
];

import {
  s1_image,
  s2_image,
  s3_image,
  s4_image,
} from 'assets/img/tour-after-signup';

export const mockData = [
  {
    slide: 1,
    title: 'tour.step1.title',
    text: 'tour.step1.text',
    image: s1_image,
    btn_text: 'register.next',
  },
  {
    slide: 2,
    title: 'tour.step2.title',
    text: 'tour.step1.text',
    image: s2_image,
    btn_text: 'register.next',
  },
  {
    slide: 3,
    title: 'tour.step3.title',
    text: 'tour.step1.text',
    image: s3_image,
    btn_text: 'register.next',
  },
  {
    slide: 4,
    title: 'tour.step4.title',
    image: s4_image,
    btn_text: 'tour.start_service',
  },
];

export const tourStepFunction = (width, tourStep) => {
  const step1Element = document.querySelector('.nutrition-plan-add-recipe-card');
  const step2Element = document.querySelector('.today-activities');
  const step3Element = document.querySelector('.nutrition-plan-card-list-col');
  const step4Element = document.querySelector('.nutrition-plan-diet-settings-card');
  const scrollIntoViewOptions: ScrollIntoViewOptions = { behavior: 'smooth', block: 'center' };

  if (width > 768) {
    if (tourStep === 1) { step1Element.scrollIntoView(scrollIntoViewOptions); }
    if (tourStep === 2) { step2Element.scrollIntoView(scrollIntoViewOptions); }
    if (tourStep === 3) { step3Element.scrollIntoView(scrollIntoViewOptions); }
    if (tourStep === 4) { step4Element.scrollIntoView(scrollIntoViewOptions); }
  } else {
    if (tourStep === 1) { step1Element.scrollIntoView(scrollIntoViewOptions); }
    if (tourStep === 2) { step2Element.scrollIntoView(scrollIntoViewOptions); }
    // The arrangement of the components will do so
    if (tourStep === 3) { step1Element.scrollIntoView(scrollIntoViewOptions); }
    if (tourStep === 4) { step4Element.scrollIntoView(scrollIntoViewOptions); }
  }
};
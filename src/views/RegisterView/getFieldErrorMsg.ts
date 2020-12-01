import { getTranslate } from 'utils';

export const getFieldErrorMsg = (
  field: string,
  measurement: 'si' | 'us',
  localePhrases: any,
) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  const isMetric: boolean = measurement === 'si';

  let errorMsg: string = '';

  switch (field) {
    case 'height':
      if (isMetric) {
        errorMsg = t('validation.error.height.metric.msg', { AMOUNT: 50, COUNT: 250 });
      }
      break;

    case 'weight':
      if (isMetric) {
        errorMsg = t('validation.error.weight.metric.msg', { AMOUNT: 30, COUNT: 400 });
      }
      break;

    case 'weight_goal':
      if (isMetric) {
        errorMsg = t('validation.error.weight.metric.msg', { AMOUNT: 30, COUNT: 400 });
      }
      break;

    case 'age':
      errorMsg = t('validation.error.age.msg', { COUNT: 16 });
      break;

    default:
      errorMsg = '';
  }

  return errorMsg;
};

import { InputError } from 'types';
import FormValidator from 'utils/FormValidator';

export const validateFieldOnChange = (
  name: string,
  value: any,
  event,
  data: any,
  setData: (data: any) => void,
  errorList: InputError[],
  setErrorList: (errors: InputError[]) => void,
  element?
) => {
  let errors: InputError[] = [];

  if (event) {
    const input = event.target;
    errors = FormValidator.validate(input);
  } else if (element) {
    errors = FormValidator.validate(element);
  }

  let errorListTemp = [...errorList];

  if (event) {
    errorListTemp = errorListTemp.filter(error => error.field !== event.target.name);
  } else if (element) {
    errorListTemp = errorListTemp.filter(error => error.field !== element.name);
  }

  setErrorList([
    ...errorListTemp,
    ...errors
  ]);

  setData({
    ...data,
    [name]: value
  });
};

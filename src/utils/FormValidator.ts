// https://github.com/chriso/validator.js
import validator from 'validator';
import { getTranslate } from 'utils';

const getErrorMsg = (errorCode, param, localePhrases = {}) => {
  const t = (code: string, placeholders?: any) =>
    getTranslate(localePhrases, code, placeholders);

  let data = '';
  let errorMsg = '';

  switch (errorCode) {
    case 'required':
      errorMsg = t('validation.error.required.msg');
      break;

    case 'email':
      errorMsg = t('validation.error.email.msg');
      break;

    case 'number':
      errorMsg = t('validation.error.number.msg');
      break;

    case 'integer':
      errorMsg = t('validation.error.integer.msg');
      break;

    case 'regex':
      errorMsg = t('validation.error.regex.msg');
      break;

    case 'alphanum':
      errorMsg = t('validation.error.alphanum.msg');
      break;

    case 'url':
      errorMsg = t('validation.error.url.msg');
      break;

    case 'equalto':
      errorMsg = t('validation.error.equalto.msg', { VALUE: param });
      break;

    case 'minlen':
      errorMsg = t('validation.error.minlen.msg', { COUNT: param });
      break;

    case 'maxlen':
      errorMsg = t('validation.error.maxlen.msg', { COUNT: param });
      break;

    case 'min-max-len':
      data = param.split(',');
      errorMsg = t('validation.error.minmaxlen.msg', { AMOUNT: data[1], COUNT: data[0] });
      break;

    case 'len':
      errorMsg = t('validation.error.len.msg', { COUNT: param });
      break;

    case 'min':
      errorMsg = t('validation.error.min.msg', { COUNT: param });
      break;

    case 'max':
      errorMsg = t('validation.error.max.msg', { COUNT: param });
      break;

    case 'min-max':
      data = param.split(',');
      errorMsg = t('validation.error.min_max.msg', { AMOUNT: data[1], COUNT: data[0] });
      break;

    case 'list':
      errorMsg = t('validation.error.list.msg', { VALUE: param });
      break;

    default:
      errorMsg = t('validation.error.default.msg');
      break;
  }

  return errorMsg;
};

/**
 * Helper methods to validate form inputs
 * using controlled components
 */
const FormValidator = (localePhrases = {}) => {
  /**
     * Validate input element
     * @param element Dome element of the input
     * Uses the following attributes
     *     data-validate: array in json format with validation methods
     *     data-param: used to provide arguments for certain methods.
     */
  const validate = (element: HTMLInputElement) => {
    if (!element.getAttribute('data-validate')) {
      return [];
    }

    const isCheckbox = element.type === 'checkbox';
    const { value } = element;
    const { name } = element;

    if (!name) throw new Error('Input name must not be empty.');

    // use getAttribute to support IE10+
    const param = element.getAttribute('data-param');
    const validations = JSON.parse(element.getAttribute('data-validate'));

    const result = []; // [validate_code]: true (if has validation error)
    let data: any = '';
    const value2 = document.getElementById(param)?.['value'];

    if (validations && validations.length) {
      /*  Result of each validation must be true if the input is invalid
                and false if valid. */
      validations.forEach((m) => {
        switch (m) {
          case 'required':
            result[m] = isCheckbox ? element.checked === false : validator.isEmpty(value);
            break;
          case 'email':
            result[m] = value && value.length > 0 ? !validator.isEmail(value) : false;
            break;
          case 'number':
            result[m] = value && value.length > 0 ? !validator.isNumeric(value) : false;
            break;
          case 'integer':
            result[m] = value && value.length > 0 ? !validator.isInt(value) : false;
            break;
          case 'regex':
            result[m] = value && value.length > 0 ? !(new RegExp(param).test(value?.replaceAll('_', '') || '')) : false;
            break;
          case 'alphanum':
            result[m] = value && value.length > 0 ? !validator.isAlphanumeric(value) : false;
            break;
          case 'url':
            result[m] = value && value.length > 0 ? !validator.isURL(value) : false;
            break;
          case 'equalto':
            // here we expect a valid ID as param
            result[m] = !validator.equals(value, value2);
            break;
          case 'minlen':
            result[m] = !validator.isLength(value?.trim() || '', { min: param });
            break;
          case 'maxlen':
            result[m] = value && value.length > 0 ? !validator.isLength(value?.trim() || '', { max: param }) : false;
            break;
          case 'max-max-len':
            data = param.split(',');
            result[m] = value && value.length > 0
              ? !validator.isLength(value?.trim() || '', { min: validator.toInt(data[0]), max: validator.toInt(data[1]) })
              : false;
            break;
          case 'len':
            result[m] = value && value.length > 0
              ? !validator.isLength(value?.trim()?.replaceAll('_', '') || '', { min: param, max: param })
              : false;
            break;
          case 'min':
            result[m] = value && value.length > 0 ? !validator.isFloat(value, { min: validator.toInt(param) }) : false;
            break;
          case 'max':
            result[m] = value && value.length > 0 ? !validator.isFloat(value, { max: validator.toInt(param) }) : false;
            break;
          case 'min-max':
            /* pass the min & max value in the the data-param like this data-param="0,12"
             min:0 , max:12
            */
            data = param.split(',');
            result[m] = value && value.length > 0 ?
              !(validator.isFloat(value, { min: data[0] }) && validator.isFloat(value, { max: data[1] }))
              : false;
            break;
          case 'list':
            const list = JSON.parse(param);
            result[m] = !validator.isIn(value, list);
            break;
          default:
            throw new Error('Unrecognized validator.');
        }
      });
    }

    const newErrors = Object.keys(result)
      .filter((error) => result[error])
      .map((errorCode) => ({
        field: name,
        code: errorCode,
        message: getErrorMsg(errorCode, param, localePhrases),
      }));

    return newErrors;
  };

  /**
     * Bulk validation of input elements.
     * Used with form elements collection.
     * @param  {Array} inputs Array for DOM element
     * @return {Object}       Contains array of error and a flag to
     *                        indicate if there was a validation error
     */
  const bulkValidate = (inputs) => {
    let errors = [];
    let hasError = false;

    inputs.filter((input) => input.getAttribute('data-validate')).forEach((input) => {
      const newErrors = validate(input);

      errors = [...errors, ...newErrors];

      if (!hasError) hasError = errors.length > 0;
    });

    return {
      errors,
      hasError,
    };
  };

  return {
    validate,
    bulkValidate,
  };
};

export default FormValidator;

// https://github.com/chriso/validator.js
import validator from 'validator';

const getErrorMsg = (code, param) => {
  let data = '';

  switch (code) {
    case 'required':
      return 'Field is required';

    case 'email':
      return 'Incorrect email';

    case 'number':
      return 'Value should be a number';

    case 'integer':
      return 'Value should be integer';

    case 'regex':
      return 'Value doesnt accept pattern';

    case 'alphanum':
      return 'Value should be alphanumeric';

    case 'url':
      return 'Incorrect url';

    case 'equalto':
      return `Value should be equal to ${param}`;

    case 'minlen':
      return `Min length ${param}`;

    case 'maxlen':
      return `Max length ${param}`;

    case 'min-max-len':
      data = param.split(',');
      return `Min length ${data[0]}, Max length ${data[1]}`;

    case 'len':
      return `Length should be ${param}`;

    case 'min':
      return `Value should be more than ${param}`;

    case 'max':
      return `Value should be less than ${param}`;

    case 'min-max':
      data = param.split(',');
      return `Values should be less than ${data[1]} and greater than ${data[0]}`;

    case 'list':
      return `Values doesn't contain ${param}`;

    default:
      return '';
  }
};

/**
 * Helper methods to validate form inputs
 * using controlled components
 */
const FormValidator = {
  /**
     * Validate input element
     * @param element Dome element of the input
     * Uses the following attributes
     *     data-validate: array in json format with validation methods
     *     data-param: used to provide arguments for certain methods.
     */
  validate(element) {
    if (!element.getAttribute('data-validate')) {
      return [];
    }

    const isCheckbox = element.type === 'checkbox';
    const value = isCheckbox ? element.checked : element.value;
    const { name } = element;

    if (!name) throw new Error('Input name must not be empty.');

    // use getAttribute to support IE10+
    const param = element.getAttribute('data-param');
    const validations = JSON.parse(element.getAttribute('data-validate'));

    const result = []; // [validate_code]: true (if has validation error)
    let data = '';

    if (validations && validations.length) {
      /*  Result of each validation must be true if the input is invalid
                and false if valid. */
      validations.forEach((m) => {
        switch (m) {
          case 'required':
            result[m] = isCheckbox ? value === false : validator.isEmpty(value);
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
            const value2 = document.getElementById(param).value;
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
            result[m] = value && value.length > 0 ? !validator.isLength(value?.trim() || '', { min: validator.toInt(data[0]), max: validator.toInt(data[1]) }) : false;
            break;
          case 'len':
            result[m] = value && value.length > 0 ? !validator.isLength(value?.trim()?.replaceAll('_', '') || '', { min: param, max: param }) : false;
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
              !(validator.isFloat(value, { min: validator.toInt(data[0]) }) && validator.isFloat(value, { max: validator.toInt(data[1]) }))
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
        message: getErrorMsg(errorCode, param),
      }));

    return newErrors;
  },

  /**
     * Bulk validation of input elements.
     * Used with form elements collection.
     * @param  {Array} inputs Array for DOM element
     * @return {Object}       Contains array of error and a flag to
     *                        indicate if there was a validation error
     */
  bulkValidate(inputs) {
    let errors = [];
    let hasError = false;

    inputs.filter((input) => input.getAttribute('data-validate')).forEach((input) => {
      const newErrors = this.validate(input);

      errors = [...errors, ...newErrors];

      if (!hasError) hasError = errors.length > 0;
    });

    return {
      errors,
      hasError,
    };
  },
};

export default FormValidator;

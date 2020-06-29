// https://github.com/chriso/validator.js
import validator from 'validator';

const getErrorMsg = (code, param) => {
  switch (code) {
    case 'required':
      return 'Поле обязательно для ввода';

    case 'email':
      return 'Неверно введён email';

    case 'number':
      return 'Значение поля должно быть число';

    case 'integer':
      return 'Значение поля должно быть целым числом';

    case 'alphanum':
      return 'Поле должно только содержать цифры и буквы';

    case 'url':
      return 'Неверно введён url';

    case 'equalto':
      return `Поле должно совпадать с ${param}`;

    case 'minlen':
      return `Минимальная длина поля ${param}`;

    case 'maxlen':
      return `Максимальная длина поля ${param}`;

    case 'len':
      return `Длина поля должна быть равна ${param}`;

    case 'min':
      return `Значение поля должно быть не меньше ${param}`;

    case 'max':
      return `Значение поля должно быть не больше ${param}`;

    case 'list':
      return `${param} не входит в значение поля`;

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
    const name = element.name;

    if (!name) throw new Error('Input name must not be empty.');

    // use getAttribute to support IE10+
    const param = element.getAttribute('data-param');
    const validations = JSON.parse(element.getAttribute('data-validate'));

    const result = []; // [validate_code]: true (if has validation error)

    if (validations && validations.length) {
      /*  Result of each validation must be true if the input is invalid
                and false if valid. */
      validations.forEach(m => {
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
            result[m] = !validator.isLength(value, { min: param });
            break;
          case 'maxlen':
            result[m] = value && value.length > 0 ? !validator.isLength(value, { max: param }) : false;
            break;
          case 'len':
            result[m] = value && value.length > 0 ? !validator.isLength(value, { min: param, max: param }) : false;
            break;
          case 'min':
            result[m] = value && value.length > 0 ? !validator.isInt(value, { min: validator.toInt(param) }) : false;
            break;
          case 'max':
            result[m] = value && value.length > 0 ? !validator.isInt(value, { max: validator.toInt(param) }) : false;
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
      .filter(error => result[error])
      .map(errorCode => ({
        field: name,
        code: errorCode,
        message: getErrorMsg(errorCode, param)
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

    inputs.filter(input => input.getAttribute('data-validate')).forEach(input => {
      const newErrors = this.validate(input);

      errors = [...errors, ...newErrors];

      if (!hasError) hasError = errors.length > 0;
    });

    return {
      errors,
      hasError
    };
  }
};

export default FormValidator;

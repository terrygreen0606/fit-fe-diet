import { InputError } from 'types';

export const hasFieldError = (errorsList: InputError[], field: string, code?: string) => {
  if (code) {
    return !!errorsList.find(error => error.field === field && error.code === code);
  }
  return !!errorsList.find(error => error.field === field);
};

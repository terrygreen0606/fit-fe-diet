import { InputError } from 'types';

export const getFieldErrors = (field: string, errorsList: InputError[]) => errorsList.filter((error) => error.field === field);

import { toast } from 'react-toastify';
import { routes } from 'constants/routes';

export const redirectToPayView = (props, text) => {
  props.history.push(routes.checkout);
  toast.error(text);
};

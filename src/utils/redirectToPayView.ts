import { toast } from 'react-toastify';
import { routes } from 'constants/routes';

export const redirectToPayView = (history, text) => {
  history.push(routes.checkout);
  toast.error(text);
};

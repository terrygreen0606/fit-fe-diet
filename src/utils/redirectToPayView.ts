import { toast } from 'react-toastify';
import { routes } from 'constants/routes';

export const redirectToPayView = (propsHistory, text) => {
  propsHistory.push(routes.checkout);
  toast.error(text);
};

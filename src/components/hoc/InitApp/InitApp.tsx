import { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'utils/axios';

import { routes } from 'constants/routes';
import { xhrStatuses } from 'constants/statuses';

interface InitAppProps extends RouteComponentProps {
  history: any,
  children: any,
}

declare global {
  interface Window {
    dataLayer: any;
  }
}

const InitApp = ({ history, children }: InitAppProps) => {
  window.addEventListener('beforeinstallprompt', (e) => {
    window['beforeinstallprompt'] = e;
    if (
      history.location.pathname.indexOf(routes.register) > -1 ||
      history.location.pathname.indexOf(routes.registerWelcome) > -1
    ) {
      e.preventDefault();
    }
  });

  history.listen((location) => {
    if (location.pathname.indexOf(routes.checkoutThankyou) > -1) {
      if (window['beforeinstallprompt'] && window['beforeinstallprompt'].prompt) {
        window['beforeinstallprompt'].prompt();
      }
    }
  });

  axios.interceptors.response.use((response) => response, (error) => {
    if (error.response) {
      if (error.response.status === xhrStatuses.NOT_PAID) {
        history.push(routes.registerWelcome);
      }
    }

    throw error;
  });

  useEffect(() => {
    // if gtag didn't have time to load, the required field is added
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'optimize.activate' });
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [window.location.pathname]);

  return children;
};

export default withRouter(InitApp);

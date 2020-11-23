import React, { useEffect } from 'react';
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
      history.location.pathname.indexOf(routes.afterSignup) > -1
    ) {
      e.preventDefault();
    }
  });

  history.listen((location) => {
    if (location.pathname.indexOf(routes.afterCheckout) > -1) {
      if (window['beforeinstallprompt'] && window['beforeinstallprompt'].prompt) {
        window['beforeinstallprompt'].prompt();
      }
    }
  });

  axios.interceptors.response.use((response) => response, (error) => {
    if (error.response) {
      if (error.response.status === xhrStatuses.NOT_PAID) {
        sessionStorage.setItem('redirectedToPayView', 'true');
        history.push(routes.checkout);
      }
    }

    throw error;
  });

  useEffect(() => {
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'optimize.activate' });
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default withRouter(InitApp);

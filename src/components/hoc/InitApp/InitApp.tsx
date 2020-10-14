import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import axios from 'utils/axios';

import { routes } from 'constants/routes';
import { xhrStatuses } from 'constants/statuses';

interface InitAppProps extends RouteComponentProps {
  history: any,
  children: any,
}

const InitApp = ({ history, children }: InitAppProps) => {
  axios.interceptors.response.use((response) => response, (error) => {
    if (error.response) {
      if (error.response.status === xhrStatuses.NOT_PAID) {
        sessionStorage.setItem('redirectedToPayView', 'true');
        history.push(routes.checkout);
      }
    }
  });

  return (
    <>
      {children}
    </>
  );
};

export default withRouter(InitApp);

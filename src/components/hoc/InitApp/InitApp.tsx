import React from 'react';
import { withRouter, useHistory, RouteComponentProps } from 'react-router-dom';
import axios from 'utils/axios';

import { routes } from 'constants/routes';
import { xhrStatuses } from 'constants/statuses';

type InitAppProps = RouteComponentProps & {
  children: any,
};

const InitApp = ({
  children,
}: InitAppProps) => {
  const history = useHistory();

  axios.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === xhrStatuses.NOTPAID) {
      sessionStorage.setItem('redirectedToPayView', 'true');
      history.push(routes.checkout);
    }
  });

  return (
    <>
      {children}
    </>
  );
};

export default withRouter(InitApp);

import { facebookAuth } from 'utils';

export const initFacebookAuth = (setLoading: (loading: boolean) => void) => {
  setLoading(true);

  window.fbAsyncInit = () => {
    const interval = setInterval(checkFacebookInitSuccess, 100);

    function checkFacebookInitSuccess() {
      if (window.FB) {
        clearInterval(interval);
        setLoading(false);
      }
    }

    facebookAuth();
  };
};

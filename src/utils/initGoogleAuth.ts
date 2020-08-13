import { googleAuth } from 'utils';


export const initGoogleAuth = (
  setLoading: (loading: boolean) => void,
  setError: (loading: boolean) => void
) => {
  setLoading(true);

  const interval = setInterval(tryGoogleAuthInit, 100);

  function tryGoogleAuthInit() {
    if (window['gapi']) {
      clearInterval(interval);

      googleAuth((response) => {
        setLoading(false);
      }, (error) => {
        setError(true);
      });
    }
  }
};

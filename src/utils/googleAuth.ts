// const GOOGLE_CLIENT_ID_DEV = '507935053251-5fmvm4gqnggi9a4k2sn0951p0v5pchk9.apps.googleusercontent.com';
const GOOGLE_CLIENT_ID = '697977923202-90s2n3u16nc2299k6lflfev5uemt1m70.apps.googleusercontent.com';

export const googleAuth = (
  onSuccess: (resp: any) => void,
  onError: (err?: any) => void,
) => {
  window['gapi'].load('auth2', () => {
    window['gapi'].auth2
      .init({
        client_id: GOOGLE_CLIENT_ID,
      })
      .then((auth2) => {
        onSuccess(auth2);
      })
      .catch((error) => {
        onError(error);
      });
  }, (error) => {
    onError(error);
  });
};

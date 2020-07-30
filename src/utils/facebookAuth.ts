const FACEBOOK_APP_ID = '838129493383346';

export const initFacebookAuth = () => {
  window['FB'].init({
    appId            : FACEBOOK_APP_ID,
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v7.0'
  });
};

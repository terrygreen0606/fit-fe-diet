import axios from 'utils/axios';

export const loadPhrases = (lang: string) => 
  axios.get('/i18n/load', {
    headers: {
      'Accept-Language': lang,
    },
  });

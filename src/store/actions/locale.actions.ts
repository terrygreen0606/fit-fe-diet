export const SET_LOCALE_LANG = 'SET_LOCALE_LANG';
export const SET_LOCALE_PHRASES = 'SET_LOCALE_PHRASES';

export const setLocaleLang = (lang: string) => ({ type: SET_LOCALE_LANG, lang });
export const setLocalePhrases = (phrases: any) => ({ type: SET_LOCALE_PHRASES, phrases });

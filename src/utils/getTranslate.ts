import { translatePlaceholders } from 'constants/translatePlaceholders';

export const getTranslate = (phrases: any, code: string, placeholders?: any) => {
  let phrase = phrases[code] || null;

  if (phrase && placeholders) {
    Object.keys(placeholders).forEach(plachlderKey => {
      const placeholder = translatePlaceholders.find(key => key.replace(/#/g, '') === plachlderKey.toString().toUpperCase());

      if (!placeholder) return;

      phrase = phrase.replace(new RegExp(placeholder, 'gi'), placeholders[plachlderKey]);
    });
  }

  return phrase;
};

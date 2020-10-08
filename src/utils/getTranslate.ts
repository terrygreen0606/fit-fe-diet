export const getTranslate = (phrases: any, code: string, placeholders?: any) => {
  let phrase = phrases[code] || null;

  if (phrase && placeholders) {
    Object.keys(placeholders).forEach((placeholderKey) => {
      const placeholder = placeholderKey.toString().toUpperCase();
      phrase = phrase.replace(new RegExp(`#${placeholder}#`, 'gi'), placeholders[placeholderKey]);
    });
  }

  return phrase;
};

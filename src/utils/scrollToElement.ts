export const scrollToElement = (element: Element, offset: number = 0) => {
  const scrollTop = (element?.getBoundingClientRect().top || 0) + window.pageYOffset + offset;
  window.scrollTo({ top: scrollTop, behavior: 'smooth' });
};

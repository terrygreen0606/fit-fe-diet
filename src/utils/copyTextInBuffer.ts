export const copyTextInBuffer = (element: string) => {
  const input = document.createElement('input');

  input.setAttribute('value', document.querySelector(element).innerHTML);

  input.style.opacity = '0';

  document.body.appendChild(input);

  input.select();

  document.execCommand('copy');

  document.body.removeChild(input);
};

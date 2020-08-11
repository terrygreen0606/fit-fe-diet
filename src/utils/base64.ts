export const base64 = {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into btoa.
  encode: (str) => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    (match, p1) => String.fromCharCode(Number(`0x${p1}`)))),
  // Going backwards: from bytestream, to percent-encoding, to original string.
  decode: (str) => decodeURIComponent(atob(str).split('')
    .map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`)
    .join('')),
};

export const costCategoryOptions = [
  {
    value: 1,
    label: '$',
  },
  {
    value: 2,
    label: '$$',
  },
  {
    value: 3,
    label: '$$$',
  },
];

export const servingOptions = [
  {
    value: 1,
    label: 1,
  },
  {
    value: 2,
    label: 2,
  },
  {
    value: 3,
    label: 3,
  },
  {
    value: 4,
    label: 4,
  },
  {
    value: 5,
    label: 5,
  },
];

export const colourStylesSelect = {
  control: (styles) => ({
    ...styles,
    padding: '15px',
    border: '1px solid #c6c6c6',
    borderRadius: '5px',
    transition: 'all 0.2s ease',
    ':hover': {
      border: '1px solid #474747',
    },
  }),
};

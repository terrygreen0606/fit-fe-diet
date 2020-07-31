export const costCategoryOptions = [
  {
    value: 1,
    label: 'Cheap',
  },
  {
    value: 2,
    label: 'Average',
  },
  {
    value: 3,
    label: 'High',
  },
]

export const servingOptions = [
  {
    value: 1,
    label: '1 serving',
  },
  {
    value: 2,
    label: '2 servings',
  },
  {
    value: 3,
    label: '3 servings',
  },
  {
    value: 4,
    label: '4 servings',
  },
  {
    value: 5,
    label: '5 servings',
  },
];

export const colourStylesSelect = {
  control: styles => ({
    ...styles,
    padding: '15px',
    border: '1px solid #c6c6c6',
    borderRadius: '5px',
    transition: 'all 0.2s ease',
    ':hover': {
      border: '1px solid #474747'
    }
  }),
};

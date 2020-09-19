import { getImagePath } from 'utils';

export const colourStylesSelect = {
  container: (styles) => ({
    ...styles,
    width: '100%',
    ':focus': {
      outline: '1px auto #4d4d4d',
    },
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: 'none',
  }),
  control: (styles) => ({
    ...styles,
    padding: '10px 15px',
    border: '1px solid #c6c6c6',
    borderRadius: '0px',
    transition: 'all 0.2s ease',
    boxShadow: 'none',
    cursor: 'pointer',
    ':hover': {
      border: '1px solid #4d4d4d !important',
    },
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: '#fff',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#CBFFCE',
      color: '#0FC1A1',
    },
  }),
};

export const mockData = [
  {
    title: 'shop_list.slide.title_1',
    text: 'tour.step1.text',
    image: getImagePath('shopping-list/s1_image.png'),
  },
  {
    title: 'shop_list.slide.title_2',
    text: 'tour.step1.text',
    image: getImagePath('shopping-list/s2_image.png'),
  },
  {
    title: 'shop_list.slide.title_3',
    text: 'tour.step1.text',
    image: getImagePath('shopping-list/s3_image.png'),
  },
];

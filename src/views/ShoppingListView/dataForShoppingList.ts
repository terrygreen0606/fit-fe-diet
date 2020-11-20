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
    lineHeight: '1.2',
    border: '1px solid #c6c6c6',
    borderRadius: '0px',
    transition: 'all 0.2s ease',
    boxShadow: 'none',
    cursor: 'pointer',
    overflow: 'hidden',
    ':hover': {
      border: '1px solid #4d4d4d !important',
    },
  }),
  option: (styles) => ({
    ...styles,
    backgroundColor: '#fff',
    color: '#000',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#CBFFCE',
      color: '#0FC1A1',
    },
  }),
  valueContainer: (styles) => ({
    ...styles,
    overflow: 'visible',
  }),
};

export const mockData = [
  {
    title: 'shop_list.slide.title_1',
    desc: 'shop_list.slide.desc_1',
    image: getImagePath('shopping-list/s1_image.png'),
  },
  {
    title: 'shop_list.slide.title_2',
    desc: 'shop_list.slide.desc_2',
    image: getImagePath('shopping-list/s2_image.png'),
  },
  {
    title: 'shop_list.slide.title_3',
    desc: 'shop_list.slide.desc_3',
    image: getImagePath('shopping-list/s3_image.png'),
  },
];

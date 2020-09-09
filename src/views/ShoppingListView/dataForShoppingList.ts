import { getImagePath } from 'utils';

export const colourStylesSelect = {
  container: (styles) => ({
    ...styles,
    width: '100%',
    ':focus': {
      outline: '1px auto #F391AA',
    },
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    display: 'none',
  }),
  control: (styles, state) => ({
    ...styles,
    padding: '10px 25px',
    border: '1px solid #F391AA',
    borderRadius: '1px',
    transition: 'all 0.2s ease',
    boxShadow: state.isFocused ? '0 0 0 1px #F391AA' : 'none',
    ':hover': {
      border: '1px solid #F391AA',
    },
  }),
};

export const mockData = [
  {
    slide: 1,
    title: 'shop_list.slide.title_1',
    text: 'tour.step1.text',
    image: getImagePath('shopping-list/s1_image.png'),
    btn_text: 'register.next',
  },
  {
    slide: 2,
    title: 'shop_list.slide.title_2',
    text: 'tour.step1.text',
    image: getImagePath('shopping-list/s2_image.png'),
    btn_text: 'register.next',
  },
  {
    slide: 3,
    title: 'shop_list.slide.title_3',
    text: 'tour.step1.text',
    image: getImagePath('shopping-list/s3_image.png'),
    btn_text: 'register.next',
  },
];

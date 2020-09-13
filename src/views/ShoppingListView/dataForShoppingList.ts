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
    padding: '15px',
    border: '1px solid #c6c6c6',
    borderColor: state.isFocused ? '#2684FF !important' : '#c6c6c6 !important',
    borderRadius: '5px',
    transition: 'all 0.2s ease',
    boxShadow: 'none',
    ':hover': {
      border: '1px solid #E8E8E8 !important',
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

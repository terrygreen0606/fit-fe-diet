export const selectStyles = {
  container: (styles) => ({
    ...styles,
    width: '100%',
    ':focus': {
      outline: '1px auto #0c57b9',
    },
  }),
  indicatorSeparator: (styles) => ({
    ...styles,
    display: 'none',
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    fill: '#fff',
  }),
  control: (styles) => ({
    ...styles,
    minHeight: '77px',
    padding: '10px 15px',
    border: '1px solid #106EE8',
    backgroundColor: '#106EE8',
    borderRadius: '0px',
    boxShadow: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    ':hover': {
      backgroundColor: '#0c57b9',
      border: '1px solid #0c57b9 !important',
    },
  }),
  placeholder: (styles) => ({
    ...styles,
    fontSize: '26px',
    fontWeight: 'bold',
    color: '#fff',
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
};

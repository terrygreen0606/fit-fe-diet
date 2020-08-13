import axios from 'utils/axios';

export const getSignUpTpl = () => axios.put('/user/tpl-signup');

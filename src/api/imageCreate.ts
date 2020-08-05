import axios from 'utils/axios';

type imageCreateParams = {
  category: 'ingredient' | 'recipe' | 'user',
  mime_type: string,
  size: number
};

export const imageCreate = (params: imageCreateParams) => {
  return axios.post('/image/create', params);
};

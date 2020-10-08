import axios from 'utils/axios';

type ImageCreateParams = {
  category: 'ingredient' | 'recipe' | 'user',
  mime_type: string,
  size: number
};

export const imageCreate = (params: ImageCreateParams) => 
  axios.post('/image/create', params);

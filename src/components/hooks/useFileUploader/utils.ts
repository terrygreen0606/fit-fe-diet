/* eslint-disable @typescript-eslint/no-unused-vars */
import { imageCreate, uploadImageAWS } from 'api';
import { getImageAWSFormData } from 'utils';

export const uploadFileAWS = async (file: File) => {
  let data;

  try {
    const imageCreateResponse = await imageCreate({
      category: 'recipe',
      mime_type: file.type,
      size: file.size,
    });

    const uploadImageAWSResp = await uploadImageAWS(
      imageCreateResponse.data.action,
      getImageAWSFormData(imageCreateResponse.data.fields, file),
    );

    data = {
      image_id: imageCreateResponse.data.image_id,
      url: imageCreateResponse.data.url,
    };
  } catch (error) {
    throw new Error({
      ...error,
      file,
    });
  }

  return data;
};

export const validateFile = (file: File, accept: string | string[]) => {
  const acceptRegExp = [];

  if (Array.isArray(accept)) {
    acceptRegExp.push(...accept);
  } else {
    acceptRegExp.push(
      ...accept.split(/,\s?/).map((item) => new RegExp(`${item}$`, 'g')),
    );
  }

  return acceptRegExp.some((item) => item.test(file.name));
};

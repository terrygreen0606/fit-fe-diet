export const getImagePath = (imagePath: string) => {
  let s3ImgPath = imagePath;

  if (s3ImgPath.split('/').length === 1) {
    s3ImgPath = `img/${imagePath}`;
  }
  // eslint-disable-next-line
  const localImg = require(`assets/img/${imagePath}`);

  return process.env.NODE_ENV === 'development' || localImg.search('data:image') > -1
    ? localImg
    : `${process.env.PUBLIC_URL}/static/media/${s3ImgPath}`;
};

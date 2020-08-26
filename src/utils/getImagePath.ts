export const getImagePath = (imagePath: string) => {
  let s3ImgPath = imagePath;

  if (s3ImgPath.split('/').length === 1) {
    s3ImgPath = `img/${imagePath}`;
  }

  return process.env.NODE_ENV === 'development'
    ? require(`assets/img/${imagePath}`) 
    : `https://fitstg.s3.eu-central-1.amazonaws.com/${s3ImgPath}`;
};

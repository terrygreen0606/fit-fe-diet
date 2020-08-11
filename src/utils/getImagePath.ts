export const getImagePath = (imagePath: string) => (process.env.NODE_ENV === 'development'
  ? require(`assets/img/${imagePath}`) : `https://fitstg.s3.eu-central-1.amazonaws.com/${imagePath}`);

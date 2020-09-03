/* eslint-disable prefer-destructuring */
export const getVideo = (link: string) => {
  let videoId: string = '';

  if (link.includes('youtube')) {
    videoId = link.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }
  if (link.includes('vimeo')) {
    videoId = link.split('/')[3];
    return `https://player.vimeo.com/video/${videoId}`;
  }
};

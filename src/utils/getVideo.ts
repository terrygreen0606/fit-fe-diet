/* eslint-disable prefer-destructuring */
const getPathYoutube = (id: string) => `https://www.youtube.com/embed/${id}`;

export const getVideo = (link: string) => {
  let videoId: string = '';

  if (link.includes('youtube')) {
    videoId = link.split('v=')[1];

    if (videoId.includes('&')) {
      videoId = videoId.split('&')[0];
      return getPathYoutube(videoId);
    }

    return getPathYoutube(videoId);
  }

  if (link.includes('youtu.be')) {
    videoId = link.split('/')[3];
    return getPathYoutube(videoId);
  }

  if (link.includes('vimeo')) {
    videoId = link.split('/')[3];
    return `https://player.vimeo.com/video/${videoId}`;
  }
};

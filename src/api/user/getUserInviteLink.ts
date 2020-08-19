import axios from 'utils/axios';

export const getUserInviteLink = () => axios.get('user/invite-link');

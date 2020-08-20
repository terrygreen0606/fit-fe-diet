import axios from 'utils/axios';

export const userInviteFriendByEmail = (email: string) => axios.put(`user/invite-friend/${email}`);

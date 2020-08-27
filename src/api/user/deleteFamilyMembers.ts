import axios from 'utils/axios';

export const deleteFamilyMembers = (email: string) => axios.delete(`/user/family/${email}`);

import axios from 'axios';
import { BASE_URL } from '../constants.js';

export const createAuthStore = (set) => ({
  userInfo: localStorage.getItem('boundStore')
    ? JSON.parse(localStorage.getItem('boundStore'))?.state.userInfo
    : null,
  isLoadingUserInfo: false,
  login: async ({ email, password }) => {
    try {
      set({ isLoadingUserInfo: true });
      const response = await axios.post(
        `${BASE_URL}/api/users/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );

      set({ userInfo: response.data, isLoadingUserInfo: false });
    } catch (error) {
      set({ isLoadingUserInfo: false });
      throw error;
    }
  },
  logout: async () => {
    try {
      await axios.post(`${BASE_URL}/api/users/logout`, null, {
        withCredentials: true,
      });
      set({ userInfo: null });
    } catch (error) {
      throw error;
    }
  },
});

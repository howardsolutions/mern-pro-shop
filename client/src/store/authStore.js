import { axiosInstance } from '../axiosConfig';

export const createAuthStore = (set) => ({
  userInfo: localStorage.getItem('boundStore')
    ? JSON.parse(localStorage.getItem('boundStore'))?.state.userInfo
    : null,

  isLoadingUserInfo: false,
  isLoadingRegister: false,
  isLoadingUpdateProfile: false,

  login: async ({ email, password }) => {
    try {
      set({ isLoadingUserInfo: true });
      const response = await axiosInstance.post(`/api/users/login`, {
        email,
        password,
      });

      set({ userInfo: response.data, isLoadingUserInfo: false });
    } catch (error) {
      set({ isLoadingUserInfo: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post(`/api/users/logout`);
      set({ userInfo: null });
    } catch (error) {
      throw error;
    }
  },

  register: async ({ name, email, password }) => {
    try {
      set({ isLoadingRegister: true });
      const response = await axiosInstance.post(`/api/users`, {
        email,
        password,
        name,
      });
      set({ userInfo: response.data, isLoadingRegister: false });
    } catch (error) {
      set({ isLoadingRegister: false });

      throw error;
    }
  },

  updateUserProfile: async (userData) => {
    try {
      set({ isLoadingUpdateProfile: true });

      const response = await axiosInstance.put(`/api/users/profile`, userData);
      set({ userInfo: response.data });
      set({ isLoadingUpdateProfile: false });
    } catch (error) {
      set({ isLoadingUpdateProfile: false });
      throw error;
    }
  },
});

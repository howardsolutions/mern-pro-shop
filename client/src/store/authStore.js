import { axiosInstance } from '../axiosConfig';

export const createAuthStore = (set) => ({
  userInfo: localStorage.getItem('boundStore')
    ? JSON.parse(localStorage.getItem('boundStore'))?.state.userInfo
    : null,

  isLoadingUserInfo: false,
  isLoadingRegister: false,
  isLoadingUpdateProfile: false,
  isDeletingUser: false,
  isUpdatingUser: false,

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

  // for admin user only
  deleteUser: async (userId) => {
    try {
      set({ isDeletingUser: true });

      await axiosInstance.delete(`/api/users/${userId}`, userData);
      set({ isDeletingUser: false });
    } catch (error) {
      set({ isDeletingUser: false });
      throw error;
    }
  },

  updateUser: async ({ userId, name, email, isAdmin }) => {
    try {
      set({ isUpdatingUser: true });

      await axiosInstance.put(`/api/users/${userId}`, { name, email, isAdmin });
      set({ isUpdatingUser: false });
    } catch (error) {
      set({ isUpdatingUser: false });
      throw error;
    }
  },
});

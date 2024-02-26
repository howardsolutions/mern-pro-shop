export const createAuthStore = (set) => ({
  userInfo: localStorage.getItem('boundStore')
    ? JSON.parse(localStorage.getItem('boundStore'))?.state.userInfo
    : null,
  setCredentials: (info) => set({ userInfo: info }),
});

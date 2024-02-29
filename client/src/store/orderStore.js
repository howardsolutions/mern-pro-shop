import { axiosInstance } from '../axiosConfig';

export const createOrderStore = (set) => ({
  isCreateOrderLoading: false,
  isLoadingOrderDetails: false,

  createOrder: async (order) => {
    set({ isCreateOrderLoading: true });

    try {
      const response = await axiosInstance.post(`api/orders`, order);
      set({ isCreateOrderLoading: false });
      return response;
    } catch (error) {
      set({ isCreateOrderLoading: false });

      throw error;
    }
  },
  getOrderDetails: async (orderId) => {
    set({ isLoadingOrderDetails: true });

    try {
      const orderDetail = await axiosInstance.get(`api/orders/${orderId}`);
      set({ isLoadingOrderDetails: false });
    } catch (error) {
      set({ isLoadingOrderDetails: false });
      throw error;
    }
  },
});

import { axiosInstance } from '../axiosConfig';

export const createOrderStore = (set) => ({
  isCreateOrderLoading: false,
  isPayOrderLoading: false,

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

  payOrder: async (orderId, orderDetail) => {
    try {
      set({ isPayOrderLoading: true });

      const updatedOrder = await axiosInstance.post(
        `api/orders/${orderId}`,
        orderDetail
      );

      set({ isPayOrderLoading: false });

      return updatedOrder;
    } catch (error) {
      set({ isPayOrderLoading: false });
      throw error;
    }
  },
});

import { axiosInstance } from '../axiosConfig';

export const createOrderStore = (set) => ({
  isCreateOrderLoading: false,
  isPayOrderLoading: false,
  isDeliverOrderLoading: false,

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

  payOrder: async ({ orderId, details }) => {
    try {
      set({ isPayOrderLoading: true });

      const updatedOrder = await axiosInstance.put(
        `api/orders/${orderId}/pay`,
        details
      );

      set({ isPayOrderLoading: false });

      return updatedOrder;
    } catch (error) {
      set({ isPayOrderLoading: false });
      throw error;
    }
  },

  deliverOrder: async (orderId) => {
    try {
      set({ isDeliverOrderLoading: true });

      const updatedOrder = await axiosInstance.put(
        `api/orders/${orderId}/deliver`
      );

      set({ isDeliverOrderLoading: false });

      return updatedOrder;
    } catch (error) {
      set({ isDeliverOrderLoading: false });
      throw error;
    }
  },
});

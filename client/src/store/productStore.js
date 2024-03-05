import { axiosInstance } from '../axiosConfig';

export const createProductStore = (set) => ({
  isCreateProductLoading: false,
  isDeleteProductLoading: false,
  isEditProductLoading: false,

  createProduct: async () => {
    try {
      set({ isCreateProductLoading: true });
      const sampleCreatedProduct = await axiosInstance.post('/api/products');
      set({ isCreateProductLoading: false });
      return sampleCreatedProduct;
    } catch (error) {
      set({ isCreateProductLoading: false });
      throw error;
    }
  },

  deleteProduct: async (productId) => {
    try {
      set({ isDeleteProductLoading: true });
      await axiosInstance.delete(`/api/products/${productId}`);
      set({ isDeleteProductLoading: false });
    } catch (error) {
      set({ isDeleteProductLoading: false });
      throw error;
    }
  },

  editProduct: async ({ productId, updatedData }) => {
    try {
      set({ isEditProductLoading: true });
      await axiosInstance.put(`/api/products/${productId}`, updatedData);
      set({ isEditProductLoading: false });
    } catch (error) {
      set({ isEditProductLoading: false });
      throw error;
    }
  },
});

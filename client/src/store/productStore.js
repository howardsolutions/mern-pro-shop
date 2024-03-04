import { axiosInstance } from '../axiosConfig';

export const createProductStore = (set) => ({
  isCreateProductLoading: false,
  isDeleteProductLoading: false,
  isEditProductLoading: false,
});

import { useState, useEffect } from 'react';
import { axiosInstance } from '../axiosConfig';

export function useProductDetail(productId) {
  const [productDetail, setProductDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefetch, refetch] = useState(false);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await axiosInstance.get(`/api/products/${productId}`);
        setProductDetail(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    }

    fetchProductDetails();
  }, [isRefetch]);

  return { productDetail, isLoading, refetch, error };
}

import { useState, useEffect } from 'react';
import { axiosInstance } from '../axiosConfig';

export function useProductDetail(productId) {
  const [productDetail, setProductDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        setIsLoading(true);
        setError(false);
        const { data } = await axiosInstance.get(`/api/products/${productId}`);
        setProductDetail(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    }

    fetchProductDetails();
  }, [refetch]);

  return { productDetail, isLoading, refetch, error };
}

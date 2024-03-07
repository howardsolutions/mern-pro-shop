import { useState, useEffect } from 'react';
import { axiosInstance } from '../axiosConfig';

export function useGetTopProducts() {
  const [topProducts, setTopProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefetch, refetch] = useState(false);

  useEffect(() => {
    async function getTopProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await axiosInstance.get(`/api/products/top`);
        setTopProducts(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    }

    getTopProducts();
  }, [isRefetch]);

  return { topProducts, isLoading, refetch, error };
}

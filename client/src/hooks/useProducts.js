import { useEffect, useState } from 'react';
import { axiosInstance } from '../axiosConfig';

export function useProducts(pageNumber, keywords) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefresh, refetch] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await axiosInstance.get(`/api/products`, null, {
          params: {
            pageNumber,
            keywords,
          },
        });
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.response?.data);
      }
    }

    fetchProducts();
  }, [isRefresh]);

  return { products, refetch, isLoading, error };
}

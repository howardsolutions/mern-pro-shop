import { useEffect, useState } from 'react';
import { axiosInstance } from '../axiosConfig';

function getFilterParams(pageNumber, keywords) {
  if (pageNumber || keywords) {
    return {
      ...(pageNumber && { pageNumber }),
      ...(keywords && { keywords }),
    };
  }

  return null;
}

export function useProducts({ pageNumber, keywords }) {
  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefresh, refetch] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await axiosInstance.get(`/api/products`, {
          params: getFilterParams(pageNumber, keywords),
        });
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.response?.data);
      }
    }

    fetchProducts();
  }, [isRefresh, pageNumber, keywords]);

  return { data: products, refetch, isLoading, error };
}

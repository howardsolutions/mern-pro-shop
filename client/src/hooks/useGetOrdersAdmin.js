import { useState, useEffect } from 'react';
import { axiosInstance } from '../axiosConfig';

export function useGetOrdersAdmin() {
  const [orders, setOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAllOrdersForAdmin() {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axiosInstance.get(`/api/orders`);
        setOrders(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.response?.data);
      }
    }

    getAllOrdersForAdmin();
  }, []);

  return { orders, isLoading, error };
}

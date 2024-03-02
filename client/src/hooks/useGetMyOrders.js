import { useState, useEffect } from 'react';
import { axiosInstance } from '../axiosConfig';

export function useGetMyOrders() {
  const [myOrders, setmyOrders] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getMyOrders() {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axiosInstance.get(`/api/orders/myorders`);
        setmyOrders(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.response?.data);
      }
    }

    getMyOrders();
  }, []);

  return { myOrders, isLoading, error };
}

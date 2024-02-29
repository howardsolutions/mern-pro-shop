import { useState, useEffect } from 'react';
import { axiosInstance } from '../axiosConfig';

export function useGetPaypalClientId() {
  const [paypalClientId, setPaypalClientId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPaypalClientId() {
      setIsLoading(true);
      setError(null);
      try {
        const { clientId } = await axiosInstance(`/api/config/paypal`);
        setPaypalClientId(clientId);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.response?.data);
      }
    }

    getPaypalClientId();
  }, []);

  return { paypalClientId, isLoading, error };
}

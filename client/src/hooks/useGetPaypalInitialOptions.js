import { useState, useEffect } from 'react';
import { axiosInstance } from '../axiosConfig';

function getPaypalInitialOptions(clientId) {
  const initialOptions = {
    'client-id': clientId,
    currency: 'USD',
    intent: 'capture',
  };

  return initialOptions;
}

export function useGetPaypalInitialOptions() {
  const [paypalClientId, setPaypalClientId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  let paypalInitialOptions;

  useEffect(() => {
    async function getPaypalClientId() {
      setIsLoading(true);
      setError(null);
      try {
        const { clientId } = await axiosInstance(`/api/config/paypal`);
        setPaypalClientId(clientId);
        paypalInitialOptions = getPaypalInitialOptions(clientId);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.response?.data);
      }
    }

    getPaypalClientId();
  }, []);

  return { paypalClientId, paypalInitialOptions, isLoading, error };
}

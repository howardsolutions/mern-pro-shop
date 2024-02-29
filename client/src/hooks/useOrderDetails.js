import { useState, useEffect } from 'react';

import { axiosInstance } from '../axiosConfig';

export function useOrderDetails(productId) {
  const [orderDetails, setOrderDetails] = useState();

  useEffect(() => {
    async function fetchOrderDetails() {
      const { data } = await axiosInstance(`/api/orders/${productId}`);

      setOrderDetails(data);
    }

    fetchOrderDetails();
  }, []);

  return { orderDetails };
}

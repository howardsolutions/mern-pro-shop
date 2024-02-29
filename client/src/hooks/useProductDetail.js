import { useState, useEffect } from 'react';
import { axiosInstance } from '../axiosConfig';

export function useProductDetail(productId) {
  const [productDetail, setProductDetail] = useState();

  useEffect(() => {
    async function fetchProductDetails() {
      const { data } = await axiosInstance.get(`/api/products/${productId}`);

      setProductDetail(data);
    }

    fetchProductDetails();
  }, []);

  return { productDetail };
}

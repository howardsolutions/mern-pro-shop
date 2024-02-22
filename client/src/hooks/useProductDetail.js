import { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

export function useProductDetail(productId) {
  const [productDetail, setProductDetail] = useState();

  useEffect(() => {
    async function fetchProductDetails() {
      const { data } = await axios.get(`${BASE_URL}/api/products/${productId}`);

      setProductDetail(data);
    }

    fetchProductDetails();
  }, []);

  return { productDetail };
}

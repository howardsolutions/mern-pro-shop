import { useState, useEffect } from 'react';
import axios from 'axios';

export function useProductDetail(productId) {
  const [productDetail, setProductDetail] = useState();

  useEffect(() => {
    async function fetchProductDetails() {
      const { data } = await axios.get(
        `http://localhost:4000/api/products/${productId}`
      );

      console.log(data, 'dcm');

      setProductDetail(data);
    }

    fetchProductDetails();
  }, []);

  return { productDetail };
}

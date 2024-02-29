import { useEffect, useState } from 'react';
import { axiosInstance } from '../axiosConfig';

export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axiosInstance.get(`/api/products`);
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return { products };
}

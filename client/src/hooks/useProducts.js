import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';

export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get(`${BASE_URL}/api/products`);
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return { products };
}

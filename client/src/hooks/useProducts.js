import { useEffect, useState } from 'react';
import axios from 'axios';

export function useProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await axios.get('http://localhost:4000/api/products');
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return { products };
}

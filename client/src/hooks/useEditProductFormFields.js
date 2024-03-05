import { useState, useEffect } from 'react';
import { useProductDetail } from './useProductDetail';

const initialOptions = {
  name: '',
  price: 0,
  image: '',
  brand: '',
  category: '',
  description: '',
  countInStock: 0,
};

export function useEditProductFormFields(productId) {
  const [productDetailFormFields, setProductDetailsFormFields] =
    useState(initialOptions);

  const {
    productDetail: product,
    isLoading,
    error,
    refetch,
  } = useProductDetail(productId);

  function handleUpdateFormFields(field, value) {
    let newFormState = { ...productDetailFormFields };
    newFormState[field] = value;
    setProductDetailsFormFields(newFormState);
  }

  useEffect(() => {
    setProductDetailsFormFields((prevState) => ({
      ...prevState,
      name: product?.name,
      price: product?.price,
      image: product?.image,
      brand: product?.brand,
      category: product?.category,
      countInStock: product?.countInStock,
      description: product?.description,
    }));
  }, [product]);

  return {
    productDetailFormFields,
    isLoading,
    error,
    refetch,
    handleUpdateFormFields,
  };
}

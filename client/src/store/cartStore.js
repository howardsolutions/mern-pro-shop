import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { addDecimals } from '../helper';

const cartStore = (set) => ({
  cartItems:
    JSON.parse(localStorage.getItem('cartStore'))?.state.cartItems || [],

  addToCart: (item) =>
    set(
      (store) => {
        const existItem = store.cartItems.find(
          (cartItem) => cartItem._id === item._id
        );

        if (!existItem) {
          store.cartItems = [...store.cartItems, item];
        } else {
          // Item already exists => increase the quantity by replace with new item (passed in params) with updated quantity
          store.cartItems = store.cartItems.map((cartItem) =>
            cartItem._id === existItem._id ? item : cartItem
          );
        }

        // Calculate items price
        store.itemsPrice = addDecimals(
          store.cartItems.reduce(
            (acc, curItem) => acc + curItem.price * curItem.qty,
            0
          )
        );

        // Calculate shipping price -- If order is > $100 then free, else $10 shipping fee
        store.shippingPrice = addDecimals(store.itemsPrice > 100 ? 0 : 10);

        // Calculate tax price (15% of tax)
        store.taxPrice = addDecimals(Number(0.15 * store.itemsPrice));

        // calculate total price
        store.totalPrice = (
          +store.itemsPrice +
          +store.shippingPrice +
          +store.taxPrice
        ).toFixed(2);
      },
      false,
      'addToCart'
    ),

  removeFromCart: (id) =>
    set((store) => ({
      cartItems: store.cartItems.filter((item) => item._id !== id),
    })),
});

export const useCartStore = create(
  persist(devtools(cartStore), { name: 'cartStore' })
);

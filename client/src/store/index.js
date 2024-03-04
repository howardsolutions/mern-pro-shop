import { create } from 'zustand';
import { createCartStore } from './cartStore';
import { createAuthStore } from './authStore';
import { createOrderStore } from './orderStore';
import { createProductStore } from './productStore';
import { devtools, persist } from 'zustand/middleware';

export const useBoundStore = create(
  devtools(
    persist(
      (...args) => ({
        ...createAuthStore(...args),
        ...createCartStore(...args),
        ...createOrderStore(...args),
        ...createProductStore(...args),
      }),
      { name: 'boundStore' }
    )
  )
);

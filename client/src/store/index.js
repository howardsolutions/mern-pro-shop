import { create } from 'zustand';
import { createCartStore } from './cartStore';
import { createAuthStore } from './authStore';
import { createOrderStore } from './orderStore';
import { devtools, persist } from 'zustand/middleware';

export const useBoundStore = create(
  devtools(
    persist(
      (...args) => ({
        ...createAuthStore(...args),
        ...createCartStore(...args),
        ...createOrderStore(...args),
      }),
      { name: 'boundStore' }
    )
  )
);

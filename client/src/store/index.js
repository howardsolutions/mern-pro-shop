import { create } from 'zustand';
import { createCartStore } from './cartStore';
import { createAuthStore } from './authStore';
import { devtools, persist } from 'zustand/middleware';

export const useBoundStore = create(
  devtools(
    persist((...args) => ({
      ...createAuthStore(...args),
      ...createCartStore(...args),
    }))
  ),
  { name: 'bound-store' }
);

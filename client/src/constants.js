export const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : process.env.BASE_URL;

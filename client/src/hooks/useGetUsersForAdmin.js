import { useState, useEffect } from 'react';
import { axiosInstance } from '../axiosConfig';

export function useGetUsersForAdmin() {
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefetch, refetch] = useState(false);

  useEffect(() => {
    async function getUsers() {
      setIsLoading(true);
      setError(null);

      try {
        const { data } = await axiosInstance(`/api/users`);
        setUsers(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error.response?.data);
      }
    }

    getUsers();
  }, [isRefetch]);

  return { users, isLoading, error, refetch };
}

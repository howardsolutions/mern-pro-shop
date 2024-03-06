import { useState, useEffect } from 'react';
import { axiosInstance } from '../axiosConfig';

export function useGetUserDetails(userId) {
  const [userDetails, setUserDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefetch, refetch] = useState(false);

  useEffect(() => {
    async function getUserDetails() {
      try {
        setIsLoading(true);
        setError(null);
        const { data } = await axiosInstance(`/api/users/${userId}`);
        setUserDetails(data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError(error);
      }
    }

    getUserDetails();
  }, [isRefetch]);

  return { userDetails, isLoading, refetch, error };
}

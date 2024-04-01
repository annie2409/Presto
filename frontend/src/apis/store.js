import { useQuery } from 'react-query';
import { BACKEND_URL } from './urls.js';
import { LOGGED_IN_USER } from '../utils/constants.js';

export const getStore = async () => {
  const response = await fetch(`${BACKEND_URL}/store`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getTokenFromSessionStorage()}`,
    },
  });
  if (!response.ok) {
    return response.text().then((errorMessage) => {
      const message = JSON.parse(errorMessage);
      throw new Error(message.error);
    });
  }
  return response.json();
};

export const updateStore = async (data) => {
  const response = await fetch(`${BACKEND_URL}/store`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${getTokenFromSessionStorage()}`,
    },
    body: JSON.stringify({
      store: data,
    }),
  });
  if (!response.ok) {
    return response.text().then((errorMessage) => {
      const message = JSON.parse(errorMessage);
      throw new Error(message.error);
    });
  }
  return response.json();
};

export const useUserStore = () => {
  const { data, isLoading, error } = useQuery('useUserStore', getStore);

  return { data, isLoading, error };
};

export const useUserStorePolling = () => {
  const { data, isLoading, error } = useQuery('useUserStore', getStore, {
    refetchInterval: 5000,
  });

  return { data, isLoading, error };
};

const getTokenFromSessionStorage = () => {
  return JSON.parse(sessionStorage.getItem(LOGGED_IN_USER)).token;
};

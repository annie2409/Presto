import { BACKEND_URL } from './urls.js';

export const registerUser = async (data) => {
  const response = await fetch(`${BACKEND_URL}/admin/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    return response.text().then((errorMessage) => {
      const message = JSON.parse(errorMessage);
      throw new Error(message.error);
    });
  }
  return response.json();
};

export const login = async (data) => {
  const response = await fetch(`${BACKEND_URL}/admin/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    return response.text().then((errorMessage) => {
      const message = JSON.parse(errorMessage);
      throw new Error(message.error);
    });
  }
  return response.json();
};

export const logout = async (token) => {
  const response = await fetch(`${BACKEND_URL}/admin/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
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

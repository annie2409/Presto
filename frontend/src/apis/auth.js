import { BACKEND_URL } from './api.js';

export const registerUser = async (data) => {
  const response = await fetch(`${BACKEND_URL}/admin/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch user data');
  }
  return response.json();
};

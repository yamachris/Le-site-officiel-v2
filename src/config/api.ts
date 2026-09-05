export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4101';

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
  USERS: `${API_BASE_URL}/users`,
  GAMES: `${API_BASE_URL}/games`,
};

export default API_ENDPOINTS;

import axios from 'axios';

// Set your base URLs here for easy switching
export const AUTH_SERVER_URL = 'http://localhost:5143/api';
export const CONNECT_TOKEN_URL = 'http://localhost:5143';
export const WEB_API_URL = 'https://localhost:7246/api';

// First server instance
export const authServerInstance = axios.create({
  baseURL: AUTH_SERVER_URL,
  withCredentials: true, // Important for sending cookies
});

export const connectTokenInstance = axios.create({
  baseURL: CONNECT_TOKEN_URL,
  withCredentials: true, // Important for sending cookies
});

// Second server instance
export const webApiInstance = axios.create({
  baseURL: WEB_API_URL,
  withCredentials: true,
});

export const userRegisterInstance = axios.create({
  baseURL: AUTH_SERVER_URL,
  withCredentials: true,
});

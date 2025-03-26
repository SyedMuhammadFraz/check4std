import axios from 'axios';

// First server instance
export const authServerInstance = axios.create({
  baseURL: 'http://localhost:5143/api',
  withCredentials: true, // Important for sending cookies
});

export const connectTokenInstance = axios.create({
  baseURL: 'http://localhost:5143',
  withCredentials: true, // Important for sending cookies
});

// Second server instance
export const webApiInstance = axios.create({
  baseURL: 'https://localhost:7246/api',
  withCredentials: true,
});

export const userRegisterInstance = axios.create({
  baseURL: 'https://localhost:7246/api',
  withCredentials: true,
});

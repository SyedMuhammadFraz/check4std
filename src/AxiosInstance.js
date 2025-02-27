import axios from 'axios';

// Create an instance of Axios
export const axiosInstance = axios.create({
  baseURL: 'https://localhost:7246/api',
  withCredentials: true // Important for sending cookies
});
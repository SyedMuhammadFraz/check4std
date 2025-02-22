import axios from 'axios';

// Create an instance of Axios
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  withCredentials: true // Important for sending cookies
});
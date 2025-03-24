import axios from 'axios';

// First server instance
export const authServerInstance = axios.create({
  baseURL: 'https://check4std-authserverbackend-env.eba-kuzevk48.us-east-1.elasticbeanstalk.com/api',
  withCredentials: true, // Important for sending cookies
});

export const connectTokenInstance = axios.create({
  baseURL: 'https://check4std-authserverbackend-env.eba-kuzevk48.us-east-1.elasticbeanstalk.com/',
  withCredentials: true, // Important for sending cookies
});

// Second server instance
export const webApiInstance = axios.create({
  baseURL: 'https://check4std-backend-env.eba-rtquxvnp.us-east-1.elasticbeanstalk.com/api',
  withCredentials: true,
});

export const userRegisterInstance = axios.create({
  baseURL: 'https://check4std-authserverbackend-env.eba-kuzevk48.us-east-1.elasticbeanstalk.com/api',
  withCredentials: true,
});

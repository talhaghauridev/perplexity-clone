import axiosClient from 'axios';
import { API_BASE_URL } from '@/constants/api-endpoints';
import { STORAGE_KEYS } from '@/constants/storage-keys';
import Cookies from 'js-cookie';

const axios = axiosClient.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axios.interceptors.request.use(async config => {
  config.headers['X-Client-Type'] = 'web';
  const token = Cookies.get(STORAGE_KEYS.AUTH.ACCESS_TOKEN);
  console.log({ token });
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    const errorMessage = error.response?.data?.message;
    if (errorMessage && error.response?.status === 401) {
      console.log({ errorMessage });
    }
    return Promise.reject(error);
  }
);

export default axios;

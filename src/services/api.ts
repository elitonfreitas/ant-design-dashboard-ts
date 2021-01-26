import axios, { AxiosInstance } from 'axios';
import Constants from '../utils/Constants';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  headers: {
    Authorization: localStorage.getItem(Constants.storage.TOKEN),
    locale: localStorage.getItem(Constants.storage.LANG),
  },
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem(Constants.storage.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  function (response) {
    const message = response && response.data ? response.data.message : '';
    if (message.includes(Constants.message.INVALID_TOKEN)) {
      localStorage.removeItem(Constants.storage.TOKEN);
      localStorage.removeItem(Constants.storage.LOGGED);
      localStorage.removeItem(Constants.storage.LANG);
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default api;

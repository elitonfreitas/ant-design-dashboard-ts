import axios, { AxiosInstance } from 'axios';
import Constants from '../utils/Constants';

const api: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  headers: {
    Authorization: localStorage.getItem(Constants.storage.TOKEN),
  },
});

export default api;

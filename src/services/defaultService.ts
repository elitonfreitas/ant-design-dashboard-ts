import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import Constants from 'utils/Constants';
import api from './api';

class DefaultService {
  private api: AxiosInstance;

  constructor() {
    this.api = api;
  }

  async autoLogin() {
    const data: AxiosRequestConfig = {
      url: '/users/login',
      method: 'POST',
      data: {
        username: 'testUser',
        password: 'test123',
      },
    };

    try {
      const result = await this.api(data);
      this.api.defaults.headers.Authorization = `Bearer ${result.data.token}`;
      localStorage.setItem(Constants.storage.TOKEN, `Bearer ${result.data.token}`);
    } catch (error) {
      console.log('Authenticate', error.response);
    }
  }

  async checkToken(error: AxiosError) {
    if (error.message) {
      const data = error.response?.data;

      if (data && data.message.includes('Token expirado/inválido, favor gerar outro')) {
        await this.autoLogin();
      } else {
        const token = localStorage.getItem(Constants.storage.TOKEN);
        if (token) {
          this.api.defaults.headers.Authorization = `Bearer ${token}`;
        } else {
          await this.autoLogin();
        }
      }
    }
  }

  async get(url: string, errorResponse = {}) {
    try {
      const result = await this.api.get(url);
      return result.data;
    } catch (error) {
      await this.checkToken(error);
      return errorResponse;
    }
  }
}

export default new DefaultService();

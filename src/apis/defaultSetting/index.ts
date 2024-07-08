import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosBetterStacktrace from 'axios-better-stacktrace';
import _ from 'lodash';
import { redirect } from 'react-router-dom';

import { baseUrl } from '@/interfaces/apis';

axios.defaults.withCredentials = true;

export const axiosCreateInstance = (customConfig: AxiosRequestConfig): AxiosInstance => {
  const { url = '' } = customConfig;
  const apiUrl = baseUrl + '/api/v1' + url;

  const config: AxiosRequestConfig = {
    baseURL: apiUrl,
  };

  if (customConfig.baseURL && customConfig.url) {
    customConfig.baseURL += customConfig.url;
  }

  _.merge(config, customConfig);

  const instance = axios.create(config);
  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (error.response) {
        console.log('server responded with non 2xx code: ', error.response.status);
        console.log('Response data: ', error.response.data);
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('jwtToken');
          redirect('/login');
        }
      } else if (error.request) {
        console.log('No response received: ', error.request);
      } else {
        console.log('Error setting up request: ', error.message);
      }

      return Promise.reject(error);
    },
  );

  axiosBetterStacktrace(instance);

  return instance;
};

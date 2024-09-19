import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { getToken } from '../token';
import { toast } from 'react-toastify';
import { StatusCodeMapping } from '../types';

const BACKEND_URL = 'https://13.design.htmlacademy.pro';
const REQUEST_TIMEOUT = 5000;

type DetailMessageType = {
  type: string;
  message: string;
}

const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT
  });
  api.interceptors.request.use(
    (config) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['x-token'] = token;
      }
      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = (error.response.data);
        toast.warn(detailMessage.message);
      }
      throw error;
    });

  return api;
};


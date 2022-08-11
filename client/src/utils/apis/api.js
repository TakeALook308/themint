import axios from 'axios';
import { getCookie, setCookie } from '../functions/cookies';

const getAccessToken = () => {
  const accessToken = getCookie('accessToken');
  return accessToken;
};

// TODO: Backend refresh 로직따라 삭제 가능
const getLocalRefreshToken = () => {
  const refreshToken = window.localStorage.getItem('refreshToken');
  return refreshToken;
};

// TODO: Backend refresh 로직따라 변경 가능
const getNewAccessToken = () => {
  return instance.post('/api/refreshtoken', {
    refreshToken: getLocalRefreshToken(),
  });
};

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// TODO: Backend 로직따라서 refreshtoken이 없을 경우 변경될 수 있음.
instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const newAccessToken = await getNewAccessToken();
          const { accessToken } = newAccessToken.data;
          setCookie('accessToken', accessToken);
          instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
          return instance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.esponse.data) {
        return Promise.reject(err.respojse.data);
      }
    }
    return Promise.reject(err);
  },
);

export const fetchData = {
  get: async (url, option) => await instance.get(url, option),
  post: async (url, body, option) => await instance.post(url, body, option),
  put: async (url, body, option) => await instance.put(url, body, option),
  patch: async (url, body, option) => await instance.patch(url, body, option),
  delete: async (url, body, option) => await instance.delete(url, body, option),
};

export const getData = async (url, option) => await instance.get(url, option);
export const postData = async (url, body, option) => await instance.post(url, body, option);
export const patchData = async (url, body, option) => await instance.patch(url, body, option);
export const putData = async (url, body, option) => await instance.put(url, body, option);
export const deleteData = async (url, body, option) => await instance.delete(url, body, option);

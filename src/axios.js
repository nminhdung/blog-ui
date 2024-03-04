import axios from 'axios';
import { API_ROOT } from './utils/constants.js';

const instance = axios.create({
  baseURL: `${API_ROOT}/api`
});

instance.defaults.withCredentials = true;
instance.interceptors.request.use(
  function (config) {
    let token = window.localStorage.getItem('persist:blog/user') &&
      JSON.parse(
        window.localStorage.getItem("persist:blog/user")
      )?.token?.slice(1, -1);
    config.headers = { ...config.headers, authorization: `Bearer ${token}` }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
)


export default instance;
import axios, { AxiosInstance } from 'axios';

import { Endpoint } from './endpoints';
import { Config } from './types';

const baseURL = 'https://lldev.thespacedevs.com/2.2.0';

export const api  = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const builder = (api: AxiosInstance) => ({
  launch: {
    upcoming: <T>(config: Config = {}) => api.get<T>(Endpoint.LAUNCH_UPCOMING, { params: config }),
  }
});

export default builder(api);

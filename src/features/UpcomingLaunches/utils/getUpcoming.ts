import { Response } from '../config/types';
import { api } from '../../../cofig/api';
import getOffset from './getOffest';

let endpoint = '/launch/upcoming/';

const getUpcoming = async (next?: string): Promise<Response> => {
  const res = await api.get(`${endpoint}?limit=${100}&offset=${getOffset(next)}`);

  if (res.status !== 200) {
    throw new Error(res.statusText || 'Something went wrong');
  }

  return res;
};

export default getUpcoming;

import getUpcoming from './getUpcoming';

import { api } from '../../../cofig/api';
jest.mock('../../../cofig/api');


describe('getUpcoming', () => {
  it('should call api.get', () => {
    const Response = {
      status: 200,
      data: {
        count: 0,
        results: [],
      }
    };

    (api.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(Response));

    getUpcoming();

    expect(api.get).toHaveBeenCalledTimes(1);
  });

  it('should call api with expected url, if next string was not passed', () => {
    const Response = {
      status: 200,
      data: {
        count: 0,
        results: [],
      }
    };

    (api.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(Response));

    getUpcoming();

    expect(api.get).toHaveBeenCalledWith('/launch/upcoming/?limit=100&offset=0');
  });

  it('should call api with expected url, if next string was passed', () => {
    const Response = {
      status: 200,
      data: {
        count: 0,
        results: [],
      }
    };

    const next = '/launch/upcoming/?limit=100&offset=100';

    (api.get as jest.Mock).mockImplementationOnce(() => Promise.resolve(Response));

    getUpcoming(next);

    expect(api.get).toHaveBeenCalledWith('/launch/upcoming/?limit=100&offset=100');
  });
});

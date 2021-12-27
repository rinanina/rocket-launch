import React from 'react';
import { render, cleanup, act } from '@testing-library/react';

import getUpcoming from '../../utils/getUpcoming';

afterEach(() => {
  cleanup;
  jest.resetAllMocks();
});

jest.mock('../../utils/getUpcoming');

import UpcomingLaunches from '../UpcomingLaunches';
jest.useFakeTimers('modern').setSystemTime(new Date('2022-01-01'))

const Results = [
  {
    window_start: '2022-01-01',
    pad: {
      latitude: 638,
      longitude: 44,
      name: 'mocked_name_pad_1',
    },
    name: 'mocked_name_1',
    program: [{
      name: 'mocked_name_pad_11',
    },
      {
        name: 'mocked_name_pad_12',
      }]
  },
  {
    window_start: '2022-02-01',
    pad: {
      latitude: 63,
      longitude: 445,
      name: 'mocked_name_pad_2',
    },
    name: 'mocked_name_2',
    program: [{
      name: 'mocked_name_pad_21',
    },
      {
        name: 'mocked_name_pad_22',
      }],
  },
];

const Response = {
  status: 200,
  data: {
    count: 2,
    results: Results,
  }
};

describe('<UpcomingLaunches />',  () => {
  it('should return app component, form, inputs, button and inner map component', async () => {
    (getUpcoming as jest.Mock).mockImplementationOnce(() => Promise.resolve(Response));

    await act(async () => {
      const { getByTestId, getByText } = render(<UpcomingLaunches />);

      jest.runAllTimers();
      expect(getByTestId('app')).toBeInTheDocument();
      expect(getByTestId('form')).toBeInTheDocument();
      expect(getByTestId('start')).toBeInTheDocument();
      expect(getByTestId('end')).toBeInTheDocument();
      expect(getByText('Submit')).toBeInTheDocument();
      expect(getByTestId('map')).toBeInTheDocument();
    });
  });
});

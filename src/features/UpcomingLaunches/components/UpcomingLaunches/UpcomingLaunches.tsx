import React, {FC, useEffect, useMemo, useState} from 'react';

import { MarkedMap } from '../../../MarkedMap';
import {DataItem, Filters, Response} from '../../config/types';
import getUpcoming from '../../utils/getUpcoming';
import LaunchFilters from '../LaunchFilters';
import {Loading} from '../../../../cofig/types';

const now = Date.now();
const maxDate = now + (90 * 24 * 60 * 60 * 1000);

const UpcomingLaunches: FC = () => {
  const [filters, setFilters] = useState<Filters>();
  const [items, setItems] = useState<DataItem[]>([]);
  const [next, setNext] = useState<string>();
  const [firstLaunch, setFirstLaunch] = useState<DataItem | undefined>();
  const [loading, setLoading] = useState<Loading>(Loading.IDLE);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    setLoading(Loading.PENDING);

    getUpcoming(next)
      .then((res: Response) => {
        const data = res.data.results;

        // filter upcoming data to display and work with only for next 3 month
        const filteredData = data.filter(({ window_start }: DataItem) => new Date(window_start).getTime() < maxDate);

        setItems((items: DataItem[]) => ([...items, ...filteredData]));

        // update next to load more data, if exists
        res.data.next && setNext(res.data.next);

        setLoading(Loading.SUCCESS);
      })
      .catch((error) => {
        setError(error);
        setLoading(Loading.ERROR);
      })
  }, [next]);

  const handleFiltersChange = (filters: Filters) => {
    setFilters(filters);
  }

  const memoizedItems = useMemo(() => {
    let first: DataItem | undefined;

    const filtered = filters ? items.filter((item) => {
      const startValue = new Date(item.window_start).getTime();

      // select closest launch between selected dates and default limits
      if (startValue >= now && startValue >= filters.start && startValue <= filters.end && (!first || startValue < new Date(first.window_start).getTime())) {
        first = item;
      }

      return startValue >= filters.start && startValue <= filters.end;
    }) : items;

    first && setFirstLaunch(first);

    return filtered;

  }, [items, filters]);

  return (
    <div data-testid='app'>
      <LaunchFilters
        onFiltersChange={handleFiltersChange}
        minDate={now}
        maxDate={maxDate}
      />
      {(loading === Loading.IDLE || loading === Loading.PENDING) && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {loading === Loading.SUCCESS && !memoizedItems.length && (
        <div>No upcoming launches found between selected dates</div>
      )}
      <MarkedMap items={memoizedItems} firstLaunch={firstLaunch} />
    </div>
  );
};

export default UpcomingLaunches;

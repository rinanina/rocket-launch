import React, { ChangeEvent, FC, FormEvent, useState } from 'react';
import moment from 'moment';

import { Filters } from '../../config/types';
import { DATE_FORMAT } from '../../config/constants';
import { Wrapper, Input, Button } from './styled';

type Props = {
  onFiltersChange: (filters: Filters) => void;
  minDate: number;
  maxDate: number;
};

const LaunchFilters: FC<Props> = ({ onFiltersChange, minDate, maxDate }) => {
  const min = moment(minDate).format(DATE_FORMAT);
  const max = moment(maxDate).format(DATE_FORMAT)
  const [filters, setFilters] = useState<{ start?: string; end?: string;  }>({});

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const target = event.target as unknown as { start: HTMLInputElement, end: HTMLInputElement };

    onFiltersChange({
      start: new Date(target.start.value).getTime(),
      end: new Date(target.end.value).getTime(),
    });
  };

  const handleStartChange = (event: ChangeEvent) => {
    setFilters((filters) => ({...filters, start: (event.target as HTMLInputElement).value }));
  };

  const handleEndChange = (event: ChangeEvent) => {
    setFilters((filters) => ({...filters, end: (event.target as HTMLInputElement).value }));
  };

  return (
    <Wrapper>
      <form data-testid='form' onSubmit={handleSubmit}>
        <Input
          data-testid='start'
          type='date'
          name='start'
          min={min}
          max={filters.end}
          onChange={handleStartChange}
          required
        />
        <Input
          data-testid='end'
          type='date'
          name='end'
          min={filters.start}
          max={max}
          onChange={handleEndChange}
          required
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Wrapper>
  );
};

export default LaunchFilters;

export type Response = {
  data: {
    results: DataItem[];
    count: number;
    next?: string;
  };
  status: number;
  statusText?: string;
};

export type Program = {
  name: string;
};

export type DataItem = {
  window_start: string;
  pad: {
    latitude: number;
    longitude: number;
    name: string;
  },
  name: string;
  program: Program[];
};

export type Filters = {
  start: number;
  end: number;
};

export enum Loading {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type Config = {
  limit?: number;
  offset?: number;
};


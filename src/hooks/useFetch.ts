import {useRef, useState} from 'react';

import {Loading, Config} from '../cofig/types';
import API from '../cofig/api';

type FetchHandler<T, R> = (exec: ExecHandler<T>, res: ResHandler<T, R>, config?: Config) => void;

type ExecHandler<T> = (api: typeof API) => Promise<T>;

type ResHandler<T,R> = (res: T) => R;

type Response<T, R> = [
  Loading,
  R | null,
  FetchHandler<T, R>,
];

const useFetch = <T, R>(): Response<T, R>  => {
  const [response, setResponse] = useState<R | null>(null);
  const [loading, setLoading] = useState<Loading>(Loading.IDLE);
  // const [error, setError] = useState<string>();
  const executor = useRef<ExecHandler<T>>();
  const responseHandler = useRef<ResHandler<T, R>>();

  const doFetch:FetchHandler<T, R> = async (exec: ExecHandler<T>, res: ResHandler<T, R>) => {
    executor.current = exec;
    responseHandler.current = res;

    setLoading(Loading.PENDING);

    await executor.current(API)
      .then((res) => {
        setResponse(responseHandler.current!(res));
        setLoading(Loading.SUCCESS);
      })
      .catch((e) => {
        setLoading(Loading.ERROR);
      });
  };

  return [loading, response, doFetch];
};

export default useFetch;

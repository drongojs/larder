import {
  Status,
  Query as IQuery,
} from './types';

interface StaticQueryConstructorArgs<T> {
  status?: Status,
  fetching?: boolean,
  data?: T,
  error?: any,
}
export class StaticQuery<T> implements IQuery<T> {
  status: Status;
  isFetching: boolean;
  _data: T;
  error: any;

  constructor({
    data,
    error,
    fetching = false,
    status = data ? Status.SUCCESS : error ? Status.ERROR : Status.LOADING,
  }: StaticQueryConstructorArgs<T> = {}) {
    this.status = status;
    this.isFetching = fetching;
    this.error = error;
    this._data = data;
  }

  get data() {
    switch (this.status) {
    case Status.IDLE:
    case Status.LOADING:
      throw new Promise(() => {});
    case Status.SUCCESS:
      return this._data;
    case Status.ERROR:
      throw this.error;
    default:
      throw new Error(`Unknown status ${this.status}`);
    }
  }
  set data(v) {
    this._data = v;
    this.status = Status.SUCCESS;
  }

  invalidate() {
    this.isFetching = true;
  }
}

import {
  Status,
  Query as IQuery,
} from './types';

interface StaticQueryConstructorArgs<T> {
  status?: Status,
  data?: T,
  error?: any,
}
export class StaticQuery<T> implements IQuery<T> {
  status: Status;
  _data: T;
  error: any;

  constructor({
    data,
    error,
    status = data ? Status.SUCCESS : error ? Status.ERROR : Status.LOADING,
  }: StaticQueryConstructorArgs<T> = {}) {
    this.status = status;
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
    this.status = Status.FETCHING;
  }
}

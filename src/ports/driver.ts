/* global process */
import { Driver } from 'domain/core/driver';
import { JpexInstance, Global } from 'jpex';

type Fetch = typeof window.fetch;

const makeQuery = <T>(t: T) => {
  const params = new URLSearchParams();
  Object.entries(t).forEach(([ key, value ]) => {
    if (Array.isArray(value)) {
      value.forEach((el, i) => {
        params.append(`${key}[]`, el);
      });
    } else {
      if (process.env.NODE_ENV !== 'production') {
        if (typeof value === 'object') {
          throw new Error(`driver: query param "${key}" is not a primitive`);
        }
      }
      params.append(key, value);
    }
  });
  return params.toString();
};

const makeUrl = (url: string, params?: { [key: string]: any }) => {
  if (!params || !Object.keys(params).length) {
    return url;
  }
  return Object
    .entries(params)
    .reduce((url, [ key, value ]) => {
      if (process.env.NODE_ENV !== 'production') {
        if (!url.includes(`:${key}`)) {
          throw new Error(`driver: param ":${key}" does not exist in url "${url}"`);
        }
      }
      return url.replace(`:${key}`, value);
    }, url);
};

export const makeDriver = (fetch: Global<'fetch', Fetch>): Driver => async({
  url: baseUrl,
  params,
  data,
  method,
}) => {
  const headers: Array<[ string, string ]> = [];
  const payload: RequestInit = {};
  let url = makeUrl(baseUrl, params);

  if (data) {
    if (method == null || method === 'GET') {
      url = `${url}?${makeQuery(data)}`;
    } else {
      payload.body = JSON.stringify(data);
      headers.push([ 'Content-Type', 'application/json' ]);
    }
  }
  if (method) {
    payload.method = method;
  }
  if (headers.length) {
    payload.headers = headers;
  }

  const response = await fetch(url, payload);

  if (!response.ok) {
    try {
      const json = await response.json();
      return Promise.reject(json);
    } catch(e) {
      const text = await response.text();
      return Promise.reject(text);
    }
  }

  return response.json();
};

export default (jpex: JpexInstance) => {
  jpex.factory<Driver>(makeDriver);
};

import React, { Suspense, useState, useRef } from 'react';
import { useAction, useQuery, Provider, Query, useContext } from '..';
import { after } from 'crosscutting/utils';
import { ErrorBoundary } from 'react-error-boundary';
import { Status } from '../types';

export default {
  title: 'respite',
};

export const basic = () => {
  const count = useRef(0);
  const Dumb = ({ query }: { query: Query<string> }) => {
    const value = query.data;
    const fetching = query.status === Status.FETCHING;

    return (
      <div>
        <span>{value}</span>
        <span>{fetching ? '(fetching)' : ''}</span>
      </div>
    );
  };
  const Smart = () => {
    const { cache, promises } = useContext();
    const [ index, setIndex ] = useState(0);

    const query = useQuery(() => {
      return new Promise<string>(res => {
        console.log(++count.current);
        setTimeout(() => {
          res(`${index}`);
        }, 3000);
      });
    }, [ 'test', index ]);

    return (
      <div>
        <div>
          <input type="number" value={index} onChange={e => setIndex(Number(e.target.value))}/>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Dumb query={query}/>
        </Suspense>
        <div>
          <pre>
            {JSON.stringify(cache, null, 2)}
            <br/>
            {JSON.stringify(Object.keys(promises.current), null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <Provider cacheTime={10000}>
      <Smart/>
    </Provider>
  );
};

export const parallel = () => {
  const count = useRef(0);
  const Dumb = ({ recess }: { recess: Query<string> }) => {
    const value = recess.data;
    const fetching = recess.status === Status.FETCHING;

    return (
      <div>
        <span>{value}</span>
        <span>{fetching ? '(fetching)' : ''}</span>
      </div>
    );
  };
  const Smart = () => {
    const [ index, setIndex ] = useState(0);
    const recess = useQuery(() => {
      return new Promise<string>(res => {
        console.log(++count.current);
        setTimeout(() => {
          res(`${index}`);
        }, 3000);
      });
    }, [ 'test', index ]);

    return (
      <div>
        <div>
          <input type="number" value={index} onChange={e => setIndex(Number(e.target.value))}/>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Dumb recess={recess}/>
          <Dumb recess={recess}/>
        </Suspense>
      </div>
    );
  };

  return (
    <Provider>
      <Smart/>
    </Provider>
  );
};

export const invalidate = () => {
  const count = useRef(0);
  const Dumb = ({ recess }: { recess: Query<string> }) => {
    const value = recess.data;
    const fetching = recess.status === Status.FETCHING;

    return (
      <div>
        <span>{value}</span>
        <span>{fetching ? '(fetching)' : ''}</span>
      </div>
    );
  };
  const Smart = () => {
    const [ index, setIndex ] = useState(0);
    const { cache, promises, subscribers } = useContext();
    const recess = useQuery(() => {
      return new Promise<string>(res => {
        console.log(++count.current);
        setTimeout(() => {
          res(`${index}`);
        }, 3000);
      });
    }, [ 'test', index ]);

    return (
      <div>
        <div>
          <input type="number" value={index} onChange={e => setIndex(Number(e.target.value))}/>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Dumb recess={recess}/>
          <div>
            <button onClick={() => recess.invalidate()}>Refresh</button>
            <button onClick={() => recess.reset()}>Reset</button>
          </div>
        </Suspense>
        <div>
          <pre>
            {JSON.stringify(cache, null, 2)}
            <br/>
            {JSON.stringify(Object.keys(promises.current), null, 2)}
            <br/>
            {JSON.stringify(subscribers.current, null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <Provider cacheTime={15000}>
      <Smart/>
    </Provider>
  );
};

export const withActionRecess = () => {
  const count = useRef(0);
  const Dumb = ({ recess }: { recess: Query<string> }) => {
    const value = recess.data;
    const fetching = recess.status === Status.FETCHING;

    return (
      <div>
        <span>{value}</span>
        <span>{fetching ? '(fetching)' : ''}</span>
      </div>
    );
  };
  const Smart = () => {
    const ref = useRef(0);
    const recess = useQuery(() => {
      return new Promise<string>(res => {
        console.log(++count.current);
        setTimeout(() => {
          res(`${ref.current}`);
        }, 3000);
      });
    }, [ 'test' ]);
    const [ onChange ] = useAction(async(e: any) => {
      ref.current = Number(e.target.value);
      await after(1000);
    }, [], recess);

    return (
      <div>
        <div>
          <input type="number" value={ref.current} onChange={onChange}/>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Dumb recess={recess}/>
        </Suspense>
      </div>
    );
  };

  return (
    <Provider>
      <Smart/>
    </Provider>
  );
};

export const withActionDeps = () => {
  const count = useRef(0);
  const Dumb = ({ recess }: { recess: Query<string> }) => {
    const value = recess.data;
    const fetching = recess.status === Status.FETCHING;

    return (
      <div>
        <span>{value}</span>
        <span>{fetching ? '(fetching)' : ''}</span>
      </div>
    );
  };
  const Smart = () => {
    const ref = useRef(0);
    const recess = useQuery(() => {
      return new Promise<string>(res => {
        console.log(++count.current);
        setTimeout(() => {
          res(`${ref.current}`);
        }, 3000);
      });
    }, [ 'test', 'foo' ]);
    const recess2 = useQuery(() => {
      return new Promise<string>(res => {
        console.log(++count.current);
        setTimeout(() => {
          res(`${ref.current}`);
        }, 3000);
      });
    }, [ 'test', 'bah' ]);
    const [ onChange ] = useAction(async(e: any) => {
      ref.current = Number(e.target.value);
      await after(1000);
    }, [], [ 'test', 'foo' ]);

    return (
      <div>
        <div>
          <input type="number" value={ref.current} onChange={onChange}/>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Dumb recess={recess}/>
          <Dumb recess={recess2}/>
        </Suspense>
      </div>
    );
  };

  return (
    <Provider>
      <Smart/>
    </Provider>
  );
};

export const withActionKey = () => {
  const count = useRef(0);
  const Dumb = ({ recess }: { recess: Query<string> }) => {
    const value = recess.data;
    const fetching = recess.status === Status.FETCHING;

    return (
      <div>
        <span>{value}</span>
        <span>{fetching ? '(fetching)' : ''}</span>
      </div>
    );
  };
  const Smart = () => {
    const ref = useRef(0);
    const recess = useQuery(() => {
      return new Promise<string>(res => {
        console.log(++count.current);
        setTimeout(() => {
          res(`${ref.current}`);
        }, 3000);
      });
    }, [ 'test', 'foo' ]);
    const recess2 = useQuery(() => {
      return new Promise<string>(res => {
        console.log(++count.current);
        setTimeout(() => {
          res(`${ref.current}`);
        }, 3000);
      });
    }, [ 'test', 'bah' ]);
    const [ onChange ] = useAction(async(e: any) => {
      ref.current = Number(e.target.value);
      await after(1000);
    }, [], 'test');

    return (
      <div>
        <div>
          <input type="number" value={ref.current} onChange={onChange}/>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Dumb recess={recess}/>
          <Dumb recess={recess2}/>
        </Suspense>
      </div>
    );
  };

  return (
    <Provider>
      <Smart/>
    </Provider>
  );
};

export const error = () => {
  const count = useRef(0);
  const Dumb = ({ recess }: { recess: Query<string> }) => {
    const value = recess.data;
    const fetching = recess.status === Status.FETCHING;

    return (
      <div>
        <span>{value}</span>
        <span>{fetching ? '(fetching)' : ''}</span>
      </div>
    );
  };
  const Smart = () => {
    const [ index, setIndex ] = useState(0);
    const recess = useQuery(() => {
      return new Promise<string>((res, rej) => {
        console.log(++count.current);
        setTimeout(() => {
          if (Math.random() > 0.5) {
            res(`${index}`);
          } else {
            rej(new Error('something went wrong'));
          }
        }, 500);
      });
    }, [ 'test', index ]);

    return (
      <div>
        <div>
          <input type="number" value={index} onChange={e => setIndex(Number(e.target.value))}/>
        </div>
        <ErrorBoundary
          onReset={() => {
            recess.invalidate({ exact: true });
          }}
          FallbackComponent={({ resetErrorBoundary }) => (
            <div>
              <div>it died</div>
              <div>
                <button onClick={resetErrorBoundary}>retry</button>
              </div>
            </div>
          )}
        >
          <Suspense fallback={<div>Loading...</div>}>
            <Dumb recess={recess}/>
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  };

  return (
    <Provider>
      <Smart/>
    </Provider>
  );
};

export const prefetch = () => {
  const Dumb = ({ query }: { query: Query<string> }) => {
    const value = query.data;
    const fetching = query.status === Status.FETCHING;

    return (
      <div>
        <span>{value}</span>
        <span>{fetching ? '(fetching)' : ''}</span>
      </div>
    );
  };
  const Smart = () => {
    const { cache, promises } = useContext();
    const [ show, setShow ] = useState(false);

    const query = useQuery(() => {
      return new Promise<string>(res => {
        setTimeout(() => {
          res('I am loaded');
        }, 2000);
      });
    }, [ 'test' ]);

    query.prefetch();

    return (
      <div>
        <div>
          <button onClick={() => setShow(true)}>Show</button>
        </div>
        <If condition={show}>
          <Suspense fallback={<div>Loading...</div>}>
            <Dumb query={query}/>
          </Suspense>
        </If>
        <div>
          <pre>
            {JSON.stringify(cache, null, 2)}
            <br/>
            {JSON.stringify(Object.keys(promises.current), null, 2)}
          </pre>
        </div>
      </div>
    );
  };

  return (
    <Provider cacheTime={10000}>
      <Smart/>
    </Provider>
  );
};

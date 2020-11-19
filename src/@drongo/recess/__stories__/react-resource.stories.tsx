import React, { useState, Suspense, createContext, useContext } from 'react';
import {
  useResource,
  Resource,
  Provider,
  useResourceContext,
} from '..';
import { ErrorBoundary } from 'react-error-boundary';

export default {
  title: 'react-resource',
};

type Person = {
  name: string,
  child: string,
}
const people = [
  {
    name: 'jim',
    children: [ 'flow', 'tina' ],
  },
  {
    name: 'bob',
    children: [ 'may', 'flower' ],
  },
  {
    name: 'hope',
    children: [ 'goeff', 'barry' ],
  },
];

let attempt = 0;
const fetchStuff = (index, childIndex) => new Promise<Person>((res) => {
  setTimeout(res, 1000);
}).then(() => {
  attempt++;
  console.log(attempt);
  if (attempt === 2) {
    throw new Error('something randomly went wrong');
  }
  const person = people[index];
  const child = person.children[childIndex];
  
  return {
    name: person.name,
    child: child,
  };
});

const Item = ({ resource }: { resource: Resource<Person> }) => {
  const {
    name,
    child,
  } = resource.data;

  return (
    <div>
      {name}{' '}{child}
      <span>
        {resource.isFetching && '(fetching...)'}
      </span>
    </div>
  );
};

export const Basic = () => {
  const [ id, setId ] = useState(0);
  const [ cid, setCid ] = useState(0);
  const resource = useResource(() => fetchStuff(id, cid), [ id, cid ]);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary
          onReset={() => {
            resource.invalidate();
          }}
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              <div>
                Something went wrong...
              </div>
              <div>
                <button onClick={resetErrorBoundary}>
                  Retry
                </button>
              </div>
            </div>
          )}
        >
          <Item resource={resource}/>
        </ErrorBoundary>
      </Suspense>
      <div>
        Index:
        <input
          type="number"
          value={id}
          onChange={(e) => {
            setId(Number(e.target.value));
            setCid(0);
          }}
        />
      </div>
      <div>
        Child:
        <input
          type="number"
          value={cid}
          onChange={(e) => {
            setCid(Number(e.target.value));
          }}
        />
      </div>
    </div>
  );
};

export const presetData = () => {
  const [ show, setShow ] = useState(false);
  const resource = useResource(() => fetchStuff(0, 0), []);

  return (
    <div>
      <Suspense fallback={<div>Loading</div>}>
        <ErrorBoundary
          onReset={() => {
            resource.invalidate();
          }}
          fallbackRender={({ resetErrorBoundary }) => (
            <div>
              <div>
                Something went wrong...
              </div>
              <div>
                <button onClick={resetErrorBoundary}>
                  Retry
                </button>
              </div>
            </div>
          )}
        >
          <div>
            <div>
              <button onClick={() => setShow(!show)}>Show item</button>
              <button onClick={() => {
                resource.data = {
                  name: 'test',
                  child: 'billybob',
                };
              }}>Set data</button>
              <button onClick={() => {
                resource.invalidate();
              }}>Refresh</button>
              {show && <Item resource={resource}/>}
            </div>
          </div>
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

const c = createContext<Resource>(void 0);
export const provider = () => {
  const Parent = () => {
    const [ id, setId ] = useState(0);
    const [ cid, setCid ] = useState(0);
    const resource = useResource(() => fetchStuff(id, cid), [ id, cid ]);

    return (
      <>
        <c.Provider value={resource}>
          <Child/>
        </c.Provider>
        <div>
          Index:
          <input
            type="number"
            value={id}
            onChange={(e) => {
              setId(Number(e.target.value));
              setCid(0);
            }}
          />
        </div>
        <div>
          Child:
          <input
            type="number"
            value={cid}
            onChange={(e) => {
              setCid(Number(e.target.value));
            }}
          />
        </div>
      </>
    );
  };

  const Child = () => {
    const resource = useContext(c);

    return (
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary
            onReset={resource.invalidate}
            fallbackRender={({ resetErrorBoundary }) => (
              <div>
                <div>
                  Something went wrong...
                </div>
                <div>
                  <button onClick={resetErrorBoundary}>
                    Retry
                  </button>
                </div>
              </div>
            )}
          >
            <Item resource={resource}/>
          </ErrorBoundary>
        </Suspense>
      </div>
    );
  };

  return <Parent/>;
};

import React, { Suspense } from 'react';
import { useQuery, ReactQueryConfigProvider, ReactQueryCacheProvider } from 'react-query';

const App = () => (
  <ReactQueryConfigProvider config={{}}>
    {/*without this provider your queries are just stored to the global cache...*/}
    <ReactQueryCacheProvider>
      {/*we have to wrap our smart component in a suspense,
      leaking the ui from our component*/}
      <Suspense fallback={<div>loading</div>}>
        <Smart id={1}/>
      </Suspense>
    </ReactQueryCacheProvider>
  </ReactQueryConfigProvider>
);

// if the id prop changes, react-query will create an entirely new query and the entire component will suspend
// if you want to refetch when a prop changes, it must not be part of the key and you have to manually trigger a refetch
const Smart = ({ id }) => {
  // react-query will immediately suspend this component and fetch data regardless of whether we actually need the query data
  // the only way around this is to pass in an enabled flag
  // this means the parent component needs more context about how its children are rendering
  const query = useQuery([ 'stuff', id ], () => fetch(`/api/${id}`), { suspense: true });

  return (
    <Dumb query={query}/>
  );
};

const Dumb = ({ query }) => {
  const { data } = query;

  return (<div>{data}</div>);
};

import React, { Suspense } from 'react';
import { useQuery, Provider as Respite } from '@drongo/respite';

const App = () => (
  <Respite>
    <Smart id={1}/>
  </Respite>
);

// if the id prop changes, it triggers a refetch rather than a brand new fresh query
const Smart = ({ id }) => {
  // the query is created but doesn't fetch until we need to
  // if the Dumb component decides not to use it, or wants to isolate how it
  // suspends, the Smart component doesn't need to know
  const query = useQuery(() => fetch(`/api/${id}`), [ 'stuff', id ]);

  return (
    <Suspense fallback={<div>loading</div>}>
      <Dumb query={query}/>
    </Suspense>
  );
};

const Dumb = ({ query }) => {
  // only now we're grabbing the data from the query will the suspense kick in
  // this means we can localise it or even just choose not to use it at all
  const { data } = query;

  return (<div>{data}</div>);
};

import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import { renderHook } from '@testing-library/react-hooks';
import { useId } from '..';

it('returns the id param', () => {
  const wrapper = ({ children }: any) => (
    <Router
      initialEntries={[ '/larder/peas' ]}
    >
      <Route path="/larder/:id">
        {children}
      </Route>
    </Router>
  );
  const { result } = renderHook(useId, {
    wrapper,
  });

  expect(result.current).toBe('peas');
});

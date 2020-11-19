describe('when data property is not accessed', () => {
  test.todo('does not fetch');
});

describe('when data property is accessed', () => {
  describe('while fetching', () => {
    test.todo('suspends the component');
  });
  describe('when fetch completes', () => {
    test.todo('renders the component');
  });
  describe('when fetch throws an error', () => {
    test.todo('enters an error state (falls back to error boundary');
    describe('when calling invalidate', () => {
      test.todo('fetches the data and suspends the component');
    });
  });
});

describe('when deps change', () => {
  test.todo('refetches the data');
  test.todo('does _not_ suspend the component');
  test.todo('sets isFetching to true');
  test.todo('renders the new data');
  describe('when deps have already been used before', () => {
    test.todo('uses the cached data');
    test.todo('does _not_ fetch the data');
  });
});

describe('when data property is written to', () => {
  test.todo('renders the component with the data');
  test.todo('does _not_ fetch any data');
  describe('when calling invalidate', () => {
    test.todo('fetches the data');
  });
});

describe('when invalidate is called', () => {
  test.todo('refetches all data for all deps');
  describe('when deps are passed in', () => {
    test.todo('only clears that one query');
  });
});

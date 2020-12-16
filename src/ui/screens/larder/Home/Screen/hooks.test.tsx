import { Provider as Respite } from '@drongo/respite';
import { act, renderHook } from '@testing-library/react-hooks';
import { after } from 'crosscutting/utils';
import { createMemoryHistory } from 'history';
import React, { useEffect } from 'react';
import { Provider as Jpex } from 'react-jpex';
import { Router } from 'react-router-dom';
import { useOnSubmit, useViewItem } from './hooks';

describe('useViewItem', () => {
  it('navigates to the history page', () => {
    const history = createMemoryHistory();

    renderHook(() => {
      const onClick = useViewItem();
      useEffect(() => {
        onClick('carrots');
      });
    }, {
      wrapper: Router,
      initialProps: {
        history,
      },
    });

    expect(history.location.pathname).toBe('/larder/carrots');
  });
});

describe('useOnSubmit', () => {
  it('submits the form', async() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const create = jest.fn((...args: any[]) => after(100, void 0));
    const search = '100g peas';
    const setSearch = jest.fn();

    const { result: { current: submit } } = renderHook(() => {
      return useOnSubmit(
        search,
        setSearch,
        create,
      );
    });

    await act(() => {
      return submit({ preventDefault: () => {} });
    });

    expect(create).toBeCalled();
    expect(create).toBeCalledWith({
      name: 'peas',
      quantity: 100,
      unit: 'g',
    });
  });
  it('sets the search field to the name', async() => {
    const create = jest.fn(() => after(100, void 0));
    const search = '100g peas';
    const setSearch = jest.fn();

    const { result: { current: submit } } = renderHook(() => {
      return useOnSubmit(
        search,
        setSearch,
        create,
      );
    });

    await act(() => {
      return submit({ preventDefault: () => {} });
    });

    expect(setSearch).toHaveBeenCalledWith('peas');
  });
  describe('when nothing was entered', () => {
    it('does nothing', async() => {
      const create = jest.fn(() => after(100, void 0));
      const search = '';
      const setSearch = jest.fn();
  
      const { result: { current: submit } } = renderHook(() => {
        return useOnSubmit(
          search,
          setSearch,
          create,
        );
      });
  
      await act(() => {
        return submit({ preventDefault: () => {} });
      });
  
      expect(create).not.toBeCalled();
    });
  });
});

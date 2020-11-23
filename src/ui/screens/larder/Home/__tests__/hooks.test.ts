import { renderHook, act } from '@testing-library/react-hooks';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider as Jpex } from 'react-jpex';
import { Create } from 'domain/core/stock';
import { useEffect } from 'react';
import { after } from 'crosscutting/utils';
import { useResource } from '@drongo/recess';
import { useOnClick, useOnSubmit } from '../hooks';

describe('useOnClick', () => {
  test('navigates to the history page', () => {
    const history = createMemoryHistory();

    renderHook(() => {
      const onClick = useOnClick();
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
  test('submits the form', async() => {
    const create = jest.fn(() => after(100, void 0));
    const search = '100g peas';
    const setSearch = jest.fn();

    const { result } = renderHook(() => {
      return useOnSubmit(
        search,
        setSearch,
        useResource<any>(() => {}, []),
      );
    }, {
      wrapper: Jpex,
      initialProps: {
        onMount: jpex => {
          jpex.constant<Create>(create);
        },
      },
    });

    await act(() => {
      return result.current[0]({ preventDefault: () => {} });
    });

    expect(create).toBeCalled();
    expect(create).toBeCalledWith({
      name: 'peas',
      quantity: 100,
      unit: 'g',
    });
  });
  test('sets submitting to true', async() => {
    const create = jest.fn(() => after(100, void 0));
    const search = '100g peas';
    const setSearch = jest.fn();

    const { result } = renderHook(() => {
      return useOnSubmit(
        search,
        setSearch,
        useResource<any>(() => {}, []),
      );
    }, {
      wrapper: Jpex,
      initialProps: {
        onMount: jpex => {
          jpex.constant<Create>(create);
        },
      },
    });

    expect(result.current[1]).toBe(false);

    act(() => {
      result.current[0]({ preventDefault: () => {} });
    });

    expect(result.current[1]).toBe(true);
  });
  test('sets the search field to the name', async() => {
    const create = jest.fn(() => after(100, void 0));
    const search = '100g peas';
    const setSearch = jest.fn();

    const { result } = renderHook(() => {
      return useOnSubmit(
        search,
        setSearch,
        useResource<any>(() => {}, []),
      );
    }, {
      wrapper: Jpex,
      initialProps: {
        onMount: jpex => {
          jpex.constant<Create>(create);
        },
      },
    });

    await act(() => {
      return result.current[0]({ preventDefault: () => {} });
    });

    expect(setSearch).toHaveBeenCalledWith('peas');
  });
  describe('when nothing was entered', () => {
    test('does nothing', async() => {
      const create = jest.fn(() => after(100, void 0));
      const search = '';
      const setSearch = jest.fn();
  
      const { result } = renderHook(() => {
        return useOnSubmit(
          search,
          setSearch,
          useResource<any>(() => {}, []),
        );
      }, {
        wrapper: Jpex,
        initialProps: {
          onMount: jpex => {
            jpex.constant<Create>(create);
          },
        },
      });
  
      await act(() => {
        return result.current[0]({ preventDefault: () => {} });
      });
  
      expect(create).not.toBeCalled();
    });
  });
});

import { renderHook, act } from '@testing-library/react-hooks';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider as Jpex } from 'react-jpex';
import { Provider as Respite } from '@drongo/respite';
import { Create } from 'domain/core/stock';
import React, { useEffect } from 'react';
import { after } from 'crosscutting/utils';
import { useOnClick, useOnSubmit } from '..';

describe('useOnClick', () => {
  it('navigates to the history page', () => {
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
  it('submits the form', async() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const create = jest.fn((...args: any[]) => after(100, void 0));
    const search = '100g peas';
    const setSearch = jest.fn();

    const wrapper = ({ children }: any) => (
      <Jpex onMount={jpex => jpex.constant<Create>(create)}>
        <Respite>
          {children}
        </Respite>
      </Jpex>
    );

    const { result } = renderHook(() => {
      return useOnSubmit(
        search,
        setSearch,
      );
    }, { wrapper });

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
  it('sets submitting to true', async() => {
    const create = jest.fn(() => after(100, void 0));
    const search = '100g peas';
    const setSearch = jest.fn();

    const wrapper = ({ children }: any) => (
      <Jpex onMount={jpex => jpex.constant<Create>(create)}>
        <Respite>
          {children}
        </Respite>
      </Jpex>
    );

    const { result } = renderHook(() => {
      return useOnSubmit(
        search,
        setSearch,
      );
    }, { wrapper });

    expect(result.current[1]).toBe(false);

    act(() => {
      result.current[0]({ preventDefault: () => {} });
    });

    expect(result.current[1]).toBe(true);
  });
  it('sets the search field to the name', async() => {
    const create = jest.fn(() => after(100, void 0));
    const search = '100g peas';
    const setSearch = jest.fn();

    const wrapper = ({ children }: any) => (
      <Jpex onMount={jpex => jpex.constant<Create>(create)}>
        <Respite>
          {children}
        </Respite>
      </Jpex>
    );

    const { result } = renderHook(() => {
      return useOnSubmit(
        search,
        setSearch,
      );
    }, { wrapper });

    await act(() => {
      return result.current[0]({ preventDefault: () => {} });
    });

    expect(setSearch).toHaveBeenCalledWith('peas');
  });
  describe('when nothing was entered', () => {
    it('does nothing', async() => {
      const create = jest.fn(() => after(100, void 0));
      const search = '';
      const setSearch = jest.fn();

      const wrapper = ({ children }: any) => (
        <Jpex onMount={jpex => jpex.constant<Create>(create)}>
          <Respite>
            {children}
          </Respite>
        </Jpex>
      );
  
      const { result } = renderHook(() => {
        return useOnSubmit(
          search,
          setSearch,
        );
      }, { wrapper });
  
      await act(() => {
        return result.current[0]({ preventDefault: () => {} });
      });
  
      expect(create).not.toBeCalled();
    });
  });
});

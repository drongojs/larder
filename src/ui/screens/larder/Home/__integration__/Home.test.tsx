import React from 'react';
import { render, act, cleanup, RenderResult } from '@testing-library/react';
import user from '@testing-library/user-event';
import Home from '../';
import { Wrapper, demoStock } from './setup';

afterEach(cleanup);

describe('when there are no stock items', () => {
  let ctx: RenderResult;
  beforeEach(async() => {
    const stock = [];
    await act(async() => {
      ctx = render(
        <Wrapper stock={stock}>
          <Home/>
        </Wrapper>
      );
    });
  });

  it('renders an empty list', async() => {
    await ctx.findByText('Nothing found');
  });

  describe('when I type into the search input and press enter', () => {
    beforeEach(async() => {
      const input = await ctx.findByTestId('stock-search-input');

      user.type(input, 'Peas 500g');
    });

    describe('and I press enter', () => {
      beforeEach(async() => {
        const input = await ctx.findByTestId('stock-search-input');
  
        user.type(input, '{enter}');
        await act(async() => {
        });
      });

      it('adds a new stock item', async() => {
        await ctx.findByText('Peas');
        await ctx.findByText('500g');
      });
    });
  });
});

describe('when there are stock items', () => {
  let ctx: RenderResult;
  let location: Location;
  beforeEach(async() => {
    const stock = demoStock;
    await act(async() => {
      ctx = render(
        <Wrapper
          stock={stock}
          onLocationChange={_location => location = _location}
        >
          <Home/>
        </Wrapper>
      );
    });
  });

  it('shows each item in a list', async() => {
    await ctx.findByText('Peas');
    await ctx.findByText('500g');

    await ctx.findByText('Chips');
    await ctx.findByText('1kg');
  });

  describe('when I click on a stock item', () => {
    beforeEach(async() => {
      const el = await ctx.findByText('Peas');
      user.click(el);
    });

    it('navigates to the item update page', async() => {
      expect(location.pathname).toBe('/larder/peas');
    });
  });
});

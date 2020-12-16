import React from 'react';
import { render, act, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import Home from './';
import { Wrapper, demoStock } from './__meta__/int-setup';

describe('when there are no stock items', () => {
  beforeEach(async() => {
    const stock = [];
    await act(async() => {
      render(
        <Wrapper stock={stock}>
          <Home/>
        </Wrapper>
      );
    });
  });

  it('renders an empty list', async() => {
    await screen.findByText('Nothing found');
  });

  describe('when I type into the search input and press enter', () => {
    beforeEach(async() => {
      const input = await screen.findByRole('textbox');

      user.type(input, 'Peas 500g');
    });

    describe('and I press enter', () => {
      beforeEach(async() => {
        const input = await screen.findByRole('textbox');
  
        user.type(input, '{enter}');
        await act(async() => {});
      });

      it('adds a new stock item', async() => {
        await screen.findByText('Peas');
        await screen.findByText('500g');
      });
    });
  });
});

describe('when there are stock items', () => {
  let location: Location;
  beforeEach(async() => {
    const stock = demoStock;
    await act(async() => {
      render(
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
    await screen.findByText('Peas');
    await screen.findByText('500g');

    await screen.findByText('Chips');
    await screen.findByText('1kg');
  });

  describe('when I click on a stock item', () => {
    beforeEach(async() => {
      const el = await screen.findByText('Peas');
      user.click(el);
    });

    it('navigates to the item update page', async() => {
      expect(location.pathname).toBe('/larder/peas');
    });
  });
});

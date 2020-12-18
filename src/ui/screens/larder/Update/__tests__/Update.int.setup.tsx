import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Stock } from 'domain/core';
import { Entity } from 'ports/entity';
import { IStockService } from 'ports/stock';
import React, { ReactNode } from 'react';
import { MemoryRouter, Route, Switch } from 'react-router';
import { Provider as Jpex } from 'react-jpex';
import { Provider as Respite } from '@respite/query';
import Update from '../';

global['SKIP_ANIMATIONS'] = true;

export const Wrapper = (props: {
  children: ReactNode,
}) => {
  class StockService extends Entity<Stock> implements IStockService {
    stock: Stock = {
      id: 'peas',
      name: 'Peas',
      categoryId: 'frozen',
      image: '',
      quantity: 500,
      unit: 'g',
    };
    search(): any {}
    async read() {
      return this.stock;
    }
    async update() {
      return this.stock;
    }
  }

  return (
    <Jpex
      inherit={false}
      onMount={jpex => {
        jpex.service(StockService);
      }}
    >
      <Respite>
        <MemoryRouter initialEntries={[ '/larder/peas' ]}>
          <Switch>
            <Route path="/larder/:id">
              {props.children}
            </Route>
            <Route path="/larder">
              {'/larder'}
            </Route>
          </Switch>
        </MemoryRouter>
      </Respite>
    </Jpex>
  );
};

export const mount = async() => {
  await act(async() => {
    render(
      <Wrapper>
        <Update/>
      </Wrapper>
    );
  });
};

export const getAmountField = () => {
  return screen.findByRole('textbox', { name: 'amount' });
};

export const typeIntoAmountField = async(value: string) => {
  const input = await getAmountField();
  userEvent.click(input);
  userEvent.type(input, value, { skipClick: true });
};

export const clickSubmit = async() => {
  const button = await screen.findByRole('button', { name: 'Ok' });
  await act(async() => userEvent.click(button));
};

export const clickCancel  = async() => {
  const button = await screen.findByRole('button', { name: 'Cancel' });
  userEvent.click(button);
};

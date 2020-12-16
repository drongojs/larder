import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Stock } from 'domain/core';
import { Entity } from 'ports/entity';
import { IStockService } from 'ports/stock';
import React, { ReactNode } from 'react';
import { MemoryRouter, Route, Switch } from 'react-router';
import { Provider as Jpex } from 'react-jpex';
import { Provider as Respite } from '@drongo/respite';
import Update from './';

global['SKIP_ANIMATIONS'] = true;

const Wrapper = (props: {
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

const mount = async() => {
  await act(async() => {
    render(
      <Wrapper>
        <Update/>
      </Wrapper>
    );
  });
};

const getAmountField = () => {
  return screen.findByRole('textbox', { name: 'amount' });
};

const typeIntoAmountField = async(value: string) => {
  const input = await getAmountField();
  userEvent.click(input);
  userEvent.type(input, value, { skipClick: true });
};

const clickSubmit = async() => {
  const button = await screen.findByRole('button', { name: 'Ok' });
  await act(async() => userEvent.click(button));
};

const clickCancel  = async() => {
  const button = await screen.findByRole('button', { name: 'Cancel' });
  userEvent.click(button);
};


it('shows the current amount for the stock item', async() => {
  // Arrange
  await mount();

  // Assert
  await screen.findByText('500g');
});

it('has an amount field', async() => {
  // Arrange
  await mount();

  // Assert
  await getAmountField();
});

describe('when I type a number into the amount field', () => {
  it('updates the current amount', async() => {
    // Arrange
    await mount();
    await typeIntoAmountField('100');

    // Assert
    await screen.findAllByDisplayValue('100');
    await screen.findByText('600g');
  });
  it('automatically scales up the unit', async() => {
    // Arrange
    await mount();
    await typeIntoAmountField('1000');

    // Assert
    await screen.findAllByDisplayValue('1000');
    await screen.findByText('1.5kg');
  });

  describe('when I press submit', () => {
    describe('and it succeeds', () => {
      it('takes me to /larder', async() => {
        // Arrange
        await mount();
        await typeIntoAmountField('100');
        await clickSubmit();

        // Assert
        await screen.findByText('/larder');
      });
    });
    describe('and it fails', () => {
      it.skip('shows an error message', async() => {
        // Arrange
        await act(async() => {
          render(
            <Wrapper>
              <Jpex
                onMount={jpex => {
                  const service = jpex.resolve<IStockService>();
                  service.update = async() => {
                    throw new Error('it went wrong');
                  };
                }}
              >
                <Update/>
              </Jpex>
            </Wrapper>
          );
        });
        await typeIntoAmountField('100');
        await clickSubmit();

        // Assert
        await screen.findByText('it went wrong');
      });
    });
  });
});

describe('when I press cancel', () => {
  it('takes me to /larder', async() => {
    await mount();
    await clickCancel();

    await screen.findByText('/larder');
  });
});

describe('when I type a number and unit into the amount field', () => {
  it('updates the current amount', async() => {
    await mount();
    await typeIntoAmountField('1kg');

    await screen.findByText('1.5kg');
  });
});

describe('when I dont type any amount', () => {
  describe('and I press submit', () => {
    it.skip('shows a required field error', async() => {
      await mount();
      await clickSubmit();

      await screen.findByText('required');
    });
  });
});

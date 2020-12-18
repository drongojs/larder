import { act, render, screen } from '@testing-library/react';
import { IStockService } from 'ports/stock';
import React from 'react';
import { Provider as Jpex } from 'react-jpex';
import {
  Wrapper,
  clickCancel,
  clickSubmit,
  getAmountField,
  mount,
  typeIntoAmountField,
} from './__tests__/Update.int.setup';
import Update from './';

it('shows the current amount for the stock item', async() => {
  await mount();

  await screen.findByText('500g');
});

it('has an amount field', async() => {
  await mount();

  await getAmountField();
});

describe('when I type a number into the amount field', () => {
  it('updates the current amount', async() => {
    await mount();
    await typeIntoAmountField('100');

    await screen.findAllByDisplayValue('100');
    await screen.findByText('600g');
  });
  it('automatically scales up the unit', async() => {
    await mount();
    await typeIntoAmountField('1000');

    await screen.findAllByDisplayValue('1000');
    await screen.findByText('1.5kg');
  });

  describe('when I press submit', () => {
    describe('and it succeeds', () => {
      it('takes me to /larder', async() => {
        await mount();
        await typeIntoAmountField('100');
        await clickSubmit();

        await screen.findByText('/larder');
      });
    });
    describe('and it fails', () => {
      it('shows an error message', async() => {
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
    it('shows a required field error', async() => {
      await mount();
      await clickSubmit();

      await screen.findByText('required');
    });
  });
});

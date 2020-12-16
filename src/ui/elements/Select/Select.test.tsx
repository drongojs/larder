import React, { useState } from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { Select, AddOption, Option } from './';
import userEvent from '@testing-library/user-event';
import { after } from 'crosscutting/utils';

const Wrapper = () => {
  const [ options, setOptions ] = useState(() => [ 'apple', 'banana', 'carrot' ]);
  const [ state, setState ] = useState('apple');
  return (
    <Select
      value={state}
      onChange={e => setState(e)}
    >
      {options.map(option => (
        <Option key={option} value={option}>{option}</Option>
      ))}
      <AddOption
        onClick={text => new Promise<void>(res => setTimeout(() => {
          setOptions([ ...options, text ]);
          setState(text);
          res();
        }, 50))}
        render={() => 'add'}
      />
    </Select>
  );
};

beforeEach(() => {
  render(<Wrapper/>);
});

it('renders an input', async() => {
  await screen.findByRole('textbox');
});

it('shows the current value', async() => {
  await screen.findByDisplayValue('apple');
});

it('does not show the dropdown menu', async() => {
  const items = screen.queryAllByRole('option');
  expect(items).toHaveLength(0);
});

describe('when I focus the input', () => {
  beforeEach(async() => {
    userEvent.click(await screen.findByRole('textbox'));
  });

  it('shows the dropdown menu', async() => {
    expect(await screen.findAllByRole('option')).toHaveLength(3);
  });

  describe('when I click a dropdown item', () => {
    beforeEach(async() => {
      userEvent.click(await screen.findByText('banana'));
    });

    it('sets the value', async() => {
      await screen.findByDisplayValue('banana');
    });
    it('closes the dropdown', async() => {
      await waitFor(() => screen.queryAllByRole('option').length === 0);
    });
  });

  describe('when I press down', () => {
    beforeEach(async() => {
      userEvent.type(await screen.findByRole('textbox'), '{arrowdown}{arrowdown}');
    });

    it('focuses the next dropdown item', async() => {
      const items = await screen.findAllByRole('option');
      
      expect(items[1].matches(':focus')).toBe(true);
    });

    describe('when I press up', () => {
      beforeEach(async() => {
        userEvent.type(await screen.findByRole('textbox'), '{arrowup}{arrowup}');
      });
      it('focuses the next dropdown item and then the input', async() => {
        const input = await screen.findByRole('textbox');

        expect(input.matches(':focus')).toBe(true);
      });
    });
  });


  describe('when I type in the input', () => {
    beforeEach(async() => {
      const input = await screen.findByRole('textbox');
      userEvent.type(input, 'car');
    });

    it('filters the dropdown items', async() => {
      expect(await screen.findAllByRole('option')).toHaveLength(2);
    });

    it('shows "add x', async() => {
      await screen.findByText('add');
    });
    describe('when I click add x', () => {
      beforeEach(async() => {
        const item = await screen.findByText('add');
        userEvent.click(item);
        await act(() => after(100));
      });

      it('adds a new item', async() => {
        await screen.findByDisplayValue('car');
      });
      it('closes the dropdown', async() => {
        const items = screen.queryAllByRole('option');
        expect(items).toHaveLength(0);
      });
    });
  });
});

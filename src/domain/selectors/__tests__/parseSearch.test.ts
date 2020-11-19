import { parseSearch } from '../';

test('parses a simple string', () => {
  const result = parseSearch('1kg peas');

  expect(result).toEqual({
    search: '1kg peas',
    name: 'peas',
    quantity: 1,
    unit: 'kg',
  });
});

test('parses a string with suffix text', () => {
  const result = parseSearch('1kg tinned mushy peas');

  expect(result).toEqual({
    search: '1kg tinned mushy peas',
    name: 'tinned mushy peas',
    quantity: 1,
    unit: 'kg',
  });
});

test('parses a string with prefix text', () => {
  const result = parseSearch('mushy peas 500g');

  expect(result).toEqual({
    search: 'mushy peas 500g',
    name: 'mushy peas',
    quantity: 500,
    unit: 'g',
  });
});

test('parses a string with no quantity or unit', () => {
  const result = parseSearch('mushy peas');

  expect(result).toEqual({
    search: 'mushy peas',
    name: 'mushy peas',
  });
});

test('parses a string with no unit', () => {
  const result = parseSearch('5 peas');

  expect(result).toEqual({
    search: '5 peas',
    name: 'peas',
    quantity: 5,
  });
});

test('parses a string with no name', () => {
  const result = parseSearch('50kg');

  expect(result).toEqual({
    search: '50kg',
    quantity: 50,
    unit: 'kg',
  });
});

test('parses a string with a decimal amount', () => {
  const result = parseSearch('0.5kg peas');

  expect(result).toEqual({
    search: '0.5kg peas',
    name: 'peas',
    quantity: 0.5,
    unit: 'kg',
  });
});

test('parses a string with a fractional amount', () => {
  const result = parseSearch('1/4kg peas');

  expect(result).toEqual({
    search: '1/4kg peas',
    name: 'peas',
    quantity: 0.25,
    unit: 'kg',
  });
});

test('parses a string with a quantity in the wrong place', () => {
  const result = parseSearch('500 mushy peas g');

  expect(result).toEqual({
    search: '500 mushy peas g',
    name: 'mushy peas g',
    quantity: 500,
  });
});

test('parses a string with multiple possible quantities', () => {
  const result = parseSearch('500g 400g peas 1kg');

  expect(result).toEqual({
    search: '500g 400g peas 1kg',
    name: '400g peas 1kg',
    quantity: 500,
    unit: 'g',
  });
});

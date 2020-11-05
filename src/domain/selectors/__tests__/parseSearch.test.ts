import test from 'ava';
import { parseSearch } from '../';

test('parses a simple string', (t) => {
  const result = parseSearch('1kg peas');

  t.deepEqual(result, {
    search: '1kg peas',
    name: 'peas',
    quantity: 1,
    unit: 'kg',
  });
});

test('parses a string with suffix text', (t) => {
  const result = parseSearch('1kg tinned mushy peas');

  t.deepEqual(result, {
    search: '1kg tinned mushy peas',
    name: 'tinned mushy peas',
    quantity: 1,
    unit: 'kg',
  });
});

test('parses a string with prefix text', (t) => {
  const result = parseSearch('mushy peas 500g');

  t.deepEqual(result, {
    search: 'mushy peas 500g',
    name: 'mushy peas',
    quantity: 500,
    unit: 'g',
  });
});

test('parses a string with no quantity or unit', (t) => {
  const result = parseSearch('mushy peas');

  // @ts-ignore
  t.deepEqual(result, {
    search: 'mushy peas',
    name: 'mushy peas',
  });
});

test('parses a string with no unit', (t) => {
  const result = parseSearch('5 peas');

  // @ts-ignore
  t.deepEqual(result, {
    search: '5 peas',
    name: 'peas',
    quantity: 5,
  });
});

test('parses a string with no name', (t) => {
  const result = parseSearch('50kg');

  // @ts-ignore
  t.deepEqual(result, {
    search: '50kg',
    quantity: 50,
    unit: 'kg',
  });
});

test.failing('parses a string with a decimal amount', (t) => {
  const result = parseSearch('0.5kg peas');

  t.deepEqual(result, {
    search: '0.5kg peas',
    name: 'peas',
    quantity: 0.5,
    unit: 'kg',
  });
});

test.failing('parses a string with a fractional amount', (t) => {
  const result = parseSearch('1/4 kg peas');

  t.deepEqual(result, {
    search: '1/4 kg peas',
    name: 'peas',
    quantity: 0.25,
    unit: 'kg',
  });
});

test('parses a string with space-separated quantity', (t) => {
  const result = parseSearch('500 g mushy peas');

  t.deepEqual(result, {
    search: '500 g mushy peas',
    name: 'mushy peas',
    quantity: 500,
    unit: 'g',
  });
});

test.failing('parses a string with a quantity in the wrong place', (t) => {
  const result = parseSearch('500 mushy peas g');

  // @ts-ignore
  t.deepEqual(result, {
    search: '500 g mushy peas g',
    name: 'mushy peas g',
    quantity: 500,
  });
});

test.failing('parses a string with an invalid unit', (t) => {
  const result = parseSearch('5xx peas');

  // @ts-ignore
  t.deepEqual(result, {
    search: '5xx peas',
    name: 'peas',
    quantity: 5,
  });
});

test.failing('parses a string with multiple possible quantities', (t) => {
  const result = parseSearch('500g 400g peas 1kg');

  t.deepEqual(result, {
    search: '500g 400g peas 1kg',
    name: '400g peas 1kg',
    quantity: 500,
    unit: 'g',
  });
});

import test from 'ava';
import { formatQuantity } from '../';

test('formats a quantity', (t) => {
  t.is(formatQuantity(50), '50');
});

test('formats a quantity and unit to "best"', (t) => {
  t.is(formatQuantity(50, 'g'), '50g');
  t.is(formatQuantity(1000, 'g'), '1kg');
  t.is(formatQuantity(0.5, 'kg'), '500g');
});

test('formats a quantity to a specific unit', (t) => {
  t.is(formatQuantity(500, 'g', 'kg'), '0.5kg');
  t.is(formatQuantity(2, 'kg', 'g'), '2000g');
});

test('formats a quantity to the same unit', (t) => {
  t.is(formatQuantity(1000, 'g', 'g'), '1000g');
});

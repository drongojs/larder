import { formatQuantity } from '../';

test('formats a quantity', () => {
  expect(formatQuantity(50)).toBe('50');
});

test('formats a quantity and unit to "best"', () => {
  expect(formatQuantity(50, 'g')).toBe('50g');
  expect(formatQuantity(1000, 'g')).toBe('1kg');
  expect(formatQuantity(0.5, 'kg')).toBe('500g');
});

test('formats a quantity to a specific unit', () => {
  expect(formatQuantity(500, 'g', 'kg')).toBe('0.5kg');
  expect(formatQuantity(2, 'kg', 'g')).toBe('2000g');
});

test('formats a quantity to the same unit', () => {
  expect(formatQuantity(1000, 'g', 'g')).toBe('1000g');
});

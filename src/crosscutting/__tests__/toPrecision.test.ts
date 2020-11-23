import { toPrecision } from '../utils';

test('returns a number to a given precision', () => {
  expect(toPrecision(1.234321, 0)).toBe(1);
  expect(toPrecision(1.234321, 2)).toBe(1.23);
  expect(toPrecision(1.999, 2)).toBe(2);
});

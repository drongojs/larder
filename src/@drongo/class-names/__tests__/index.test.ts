import { makeGetClassNames } from '../';

test('returns a function', () => {
  expect(makeGetClassNames({})).toBeInstanceOf(Function);
});

describe('when there are no modifiers', () => {
  test('returns default class names', () => {
    const getClassNames = makeGetClassNames({
      root: {
        default: 'd',
        red: 'r',
      },
    });
    const result = getClassNames();

    expect(result.root).toBe('d');
  });
});

describe('when a modifier does not match', () => {
  test('returns default class names', () => {
    const getClassNames = makeGetClassNames({
      root: {
        default: 'd',
        red: 'r',
      },
    });
    const result = getClassNames({
      red: false,
    });

    expect(result.root).toBe('d');
  });
});

describe('when modifier matches', () => {
  test('returns default + modifier class names', () => {
    const getClassNames = makeGetClassNames({
      root: {
        default: 'd',
        red: 'r',
      },
    });
    const result = getClassNames({
      red: true,
    });

    expect(result.root).toBe('d r');
  });
});

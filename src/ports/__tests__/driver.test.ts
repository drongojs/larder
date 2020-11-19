import { makeDriver } from '../driver';

const setup = () => {
  const data = {};
  const response = {
    ok: true,
    json: jest.fn(() => Promise.resolve(data)),
    text: jest.fn(() => Promise.resolve('')),
  };
  const fetch = jest.fn().mockReturnValue(Promise.resolve(response));
  const driver = makeDriver(fetch);

  return {
    data,
    response,
    fetch,
    driver,
  };
};

describe('get', () => {

  test('sends a request to the url', async() => {
    const { fetch, driver } = setup();
    const url = 'https://google.com';

    await driver({ url });

    expect(fetch.mock.calls[0][0]).toBe(url);
  });
  test('appends data as query params', async() => {
    const { fetch, driver } = setup();
    const url = 'https://google.com';
    const data = { foo: 'bah' };

    await driver({ url, data });

    expect(fetch.mock.calls[0][0]).toBe('https://google.com?foo=bah');
  });
  test('inserts params into url placeholders', async() => {
    const { fetch, driver } = setup();
    const url = 'https://google.com/:type/:id';
    const params = {
      type: 'test',
      id: 44,
    };

    await driver({ url, params });

    expect(fetch.mock.calls[0][0]).toBe('https://google.com/test/44');
  });
  test('appends array data as query params', async() => {
    const { fetch, driver } = setup();
    const url = 'https://google.com';
    const data = { foo: [ 'bah' ] };

    await driver({ url, data });

    expect(fetch.mock.calls[0][0]).toBe('https://google.com?foo%5B%5D=bah');
  });
  test('returns response json', async() => {
    const { driver, data } = setup();
    const url = 'https://google.com';

    const result = await driver({ url, data });

    expect(result).toBe(data);
  });
  describe('when request fails', () => {
    test('returns response text', async() => {
      const { driver, response, data } = setup();
      const url = 'https://google.com';
      response.ok = false;

      try {
        await driver({ url });
        throw new Error('should not resolve');
      } catch (e) {
        expect(e).toEqual(data);
      }
    });
  });
});

describe('post', () => {
  test('sends content type header', async() => {
    const { driver, fetch } = setup();

    await driver({
      url: 'https://google.com',
      method: 'POST',
      data: {
        foo: 'bah',
      },
    });

    const header = fetch.mock.calls[0][1].headers[0];
    expect(header).toEqual([ 'Content-Type', 'application/json' ]);
  });
  test('sends body content', async() => {
    const { driver, fetch } = setup();

    await driver({
      url: 'https://google.com',
      method: 'POST',
      data: {
        foo: 'bah',
      },
    });

    const body = fetch.mock.calls[0][1].body;
    expect(body).toBe('{"foo":"bah"}');
  });
});

import { rest } from 'msw';
import { categories } from './categories';
import { Stock } from 'domain/core';
import convert from 'convert-units';

const stock: Stock[] = [
  {
    id: 'peas',
    categoryId: 'frozen',
    quantity: 500,
    unit: 'g',
    name: 'Peas',
    image: 'http://lorempixel.com/100/100/food/1',
  },
  {
    id: 'chips',
    categoryId: 'frozen',
    quantity: 1,
    unit: 'kg',
    name: 'Chips',
    image: 'http://lorempixel.com/100/100/food/1',
  },
];

const getOne = rest.get('/api/stock/item/:id', (req, res, ctx) => {
  const { id } = req.params;
  const s = stock.find(s => s.id === id);

  return res(
    ctx.delay(500),
    ctx.status(s ? 200 : 404),
    s ? ctx.json(s) : ctx.json({ message: 'not found' }),
  );
});

const getAll = rest.get('/api/stock/items', (req, res, ctx) => {
  const search = req.url.searchParams.get('q');

  let filtered = stock;

  if (search) {
    filtered = filtered.filter(stock => {
      const category = categories.find(c => c.id === stock?.categoryId);
      if (stock?.name.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      if (category?.name.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      return false;
    });
  }

  return res(
    ctx.delay(500),
    ctx.status(filtered ? 200 : 404),
    ctx.json(filtered),
  );
});

const post = rest.post<any>('/api/stock/items', (req, res, ctx) => {
  let {
    categoryId = '',
    image = 'http://lorempixel.com/100/100/food/1',
    name = 'Unknown',
    quantity = 1,
    unit = null,
  } = req.body;

  let item = stock.find(s => s.name.toLowerCase() === name.toLowerCase());

  if (item == null) {
    item = {
      id: name.toLowerCase(),
      name,
      unit,
      quantity,
      categoryId,
      image,
    };
    stock.push(item);
  } else {
    if (!unit) {
      unit = item.unit;
    }
    if (unit !== item.unit) {
      quantity = convert(quantity).from(unit).to(item.unit as any);
    }

    quantity += item.quantity;

    item.quantity = quantity;
  }

  return res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json(item),
  );
});

const patch = rest.patch<any>('/api/stock/item/:id', (req, res, ctx) => {
  const { id } = req.params;
  const {
    categoryId,
    name,
    quantity,
    unit,
    image,
  } = req.body;

  const item = stock.find(s => s.id === id);
  if (item == null) {
    return res(
      ctx.status(404),
    );
  }

  item.categoryId = categoryId ?? item.categoryId;
  item.name = name ?? item.name;
  item.unit = unit ?? item.unit;
  item.quantity = quantity ?? item.quantity;
  item.image = image ?? item.image;

  return res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json(item),
  );
});

const deleteOne = rest.delete('/api/stock/item/:id', (req, res, ctx) => {
  const { id } = req.params;
  const item = stock.find(s => s.id === id);
  if (item == null) {
    return res(ctx.status(404));
  }
  const i = stock.indexOf(item);
  stock.splice(i, 1);

  return res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json({}),
  );
});

export default [
  deleteOne,
  getAll,
  getOne,
  patch,
  post,
];

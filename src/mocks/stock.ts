import { rest } from 'msw';
import { categories } from './categories';
import { ingredients } from './ingredients';

const stock = [
  {
    type: 'larder' as const,
    id: 'peas',
    category: 'frozen',
    quantity: 500,
  },
  {
    type: 'larder' as const,
    id: 'chips',
    category: 'frozen',
    quantity: 1,
  },
];

const getOne = rest.get('/api/stock/:type/item/:id', (req, res, ctx) => {
  const { type, id } = req.params;
  const s = stock.find((s) => s.type === type && s.id === id);

  return res(
    ctx.delay(500),
    ctx.status(s ? 200 : 404),
    s ? ctx.json(s) : ctx.json({ message: 'not found' }),
  );
});

const getAll = rest.get('/api/stock/:type/items', (req, res, ctx) => {
  const { type } = req.params;
  const search = req.url.searchParams.get('q');

  let filtered = stock.filter((s) => s.type === type);

  if (search) {
    filtered = filtered.filter((stock) => {
      const ingredient = ingredients.find((i) => i.id === stock.id);
      const category = categories.find((c) => c.id === ingredient?.category);
      if (ingredient?.name.toLowerCase().includes(search.toLowerCase())) {
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

const post = rest.post<any>('/api/stock/:type/items', (req, res, ctx) => {
  const { type } = req.params;
  const {
    name,
    quantity = 1,
    unit,
  } = req.body;

  let ingredient = ingredients.find((i) => i.name.toLowerCase() === name.toLowerCase());
  if (ingredient == null) {
    ingredient = {
      id: name.toLowerCase(),
      name,
      unit,
      category: '',
    };
    ingredients.push(ingredient);
  }
  const item = {
    type,
    id: ingredient.id,
    category: ingredient.category,
    quantity,
  };

  stock.push(item);

  return res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json(item),
  );
});

const patch = rest.patch<any>('/api/stock/:type/item/:id', (req, res, ctx) => {
  const { id, type } = req.params;
  const {
    category,
    name,
    quantity,
    unit,
  } = req.body;

  const item = stock.find((s) => s.type === type && s.id === id);
  if (item == null) {
    return res(
      ctx.status(404),
    );
  }
  const ingredient = ingredients.find((i) => i.id === item.id);
  if (ingredient == null) {
    return res(
      ctx.status(404),
    );
  }

  ingredient.category = category ?? ingredient.category;
  ingredient.name = name ?? ingredient.name;
  ingredient.unit = unit ?? ingredient.unit;
  item.category = ingredient.category;
  item.quantity = quantity ?? item.quantity;

  return res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json(item),
  );
});

const deleteOne = rest.delete('/api/stock/:type/item/:id', (req, res, ctx) => {
  const { type, id } = req.params;
  const item = stock.find((s) => s.type === type && s.id === id);
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

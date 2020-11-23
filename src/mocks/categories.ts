import { rest } from 'msw';

export const categories = [
  {
    id: 'frozen',
    name: 'Frozen',
    icon: 'ac_unit',
  },
  {
    id: 'tins',
    name: 'Tinned',
    icon: 'delete_outline',
  },
  {
    id: 'veg',
    name: 'Fruit / Veg',
    icon: 'grass',
  },
];

const getAll = rest.get('/api/categories', (req, res, ctx) => {
  return res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json(categories),
  );
});

const getOne = rest.get('/api/category/:id', (req, res, ctx) => {
  const { id } = req.params;
  const category = categories.find(c => c.id === id);
  
  return res(
    ctx.delay(500),
    ctx.status(category ? 200 : 404),
    category ? ctx.json(category) : ctx.json({ message: 'not found' }),
  );
});

const post = rest.post<any>('/api/categories', (req, res, ctx) => {
  const args = req.body;
  const category = {
    id: args.name.toLowerCase(),
    icon: null,
    ...args,
  };
  categories.push(category);

  return res(
    ctx.delay(500),
    ctx.status(200),
    ctx.json(category),
  );
});

export default [ getAll, getOne, post ];

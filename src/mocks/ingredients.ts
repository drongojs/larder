import { rest } from 'msw';

export const ingredients = [
  {
    id: 'peas',
    category: 'frozen',
    name: 'Peas',
    unit: 'g',
  },
  {
    id: 'chips',
    category: 'frozen',
    name: 'Chips',
    unit: 'kg',
  },
];

const getOne = rest.get('/api/ingredient/:id', (req, res, ctx) => {
  const { id } = req.params;
  const ingredient = ingredients.find((i) => i.id === id);
  
  return res(
    ctx.delay(500),
    ctx.status(ingredient ? 200 : 404),
    ingredient ? ctx.json(ingredient) : ctx.json({ message: 'not found' }),
  );
});

export default [ getOne ];

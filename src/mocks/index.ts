import { setupWorker } from 'msw';
import categories from './categories';
import ingredients from './ingredients';
import stock from './stock';

const worker = setupWorker(
  ...categories,
  ...ingredients,
  ...stock,
);

worker.start();

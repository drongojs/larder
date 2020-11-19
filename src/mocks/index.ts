import { setupWorker } from 'msw';
import categories from './categories';
import stock from './stock';

const worker = setupWorker(
  ...categories,
  ...stock,
);

worker.start();

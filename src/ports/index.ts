import { Jpex } from 'jpex';
import driver from './driver';
import categories from './categories';
import stock from './stock';

export default (jpex: Jpex) => {
  driver(jpex);
  categories(jpex);
  stock(jpex);
};

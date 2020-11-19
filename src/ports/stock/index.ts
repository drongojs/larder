import { Jpex } from 'jpex';
import create from './create';
import kill from './delete';
import read from './read';
import search from './search';
import update from './update';

export default (jpex: Jpex) => {
  create(jpex);
  kill(jpex);
  read(jpex);
  search(jpex);
  update(jpex);
};

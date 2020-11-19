import { Jpex } from 'jpex';
import create from './create';
import read from './read';

export default (jpex: Jpex) => {
  create(jpex);
  read(jpex);
};

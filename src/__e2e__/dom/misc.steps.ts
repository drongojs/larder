/* eslint-disable no-invalid-this */
import { When } from '@cucumber/cucumber';
import { World } from '../world';

When('I wait {int}', async function(this: World, int: number) {
  return new Promise(res => setTimeout(res, int));
});

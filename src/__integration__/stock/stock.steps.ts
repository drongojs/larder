/* eslint-disable no-invalid-this */
import { Given } from '@cucumber/cucumber';
import { World } from '../world';
import { after } from 'crosscutting/utils';

Given('I have {string} in stock', async function(this: World, search: string) {
  await this.driver.get(`${this.base}/iframe.html?id=larder-setup--add-to-stock&search=${search}`);
  await after(1000);
});

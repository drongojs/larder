/* eslint-disable no-invalid-this */
import { Given } from '@cucumber/cucumber';
import { World } from '../world';

Given('I have {string} in stock', function(this: World, search: string) {
  return this.driver.get(`${this.base}/iframe.html?id=larder-setup--add-to-stock&search=${search}`);
});

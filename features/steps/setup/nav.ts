import { Given } from '@cucumber/cucumber';
import { World } from '../world';

Given('I am on {string}', function(this: World, url: string) {
  return this.driver.get(`http://localhost:8080${url}`);
});

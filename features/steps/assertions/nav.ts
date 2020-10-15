import { Then } from '@cucumber/cucumber';
import { World } from '../world';
import { expect } from 'chai';

Then('I should be on {string}', async function(this: World, url: string) {
  const current = await this.driver.getCurrentUrl();

  expect(current).to.equal(`http://localhost:8080${url}`);
});

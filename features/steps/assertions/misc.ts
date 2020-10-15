import { Then } from '@cucumber/cucumber';
import { World } from '../world';
import { By } from 'selenium-webdriver';
import { expect } from 'chai';

Then('I should have a list of {int} item(s)', async function(this: World, int: number) {
  const ul = await this.driver.findElement(By.tagName('ul'));
  const lis = await ul.findElements(By.tagName('li'));
  const src = await ul.getAttribute('innerHTML');
  console.log(src)

  expect(lis).to.have.length(int);
});

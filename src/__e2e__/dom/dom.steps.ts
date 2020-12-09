/* eslint-disable no-invalid-this */
import { When, Then } from '@cucumber/cucumber';
import { World } from '../world';
import { By, until, Key } from 'selenium-webdriver';
import { expect } from 'chai';
import { after } from 'crosscutting/utils';

const getSelector = (x: string) => {
  switch (x[0]) {
  case '#':
    return By.id(x.substr(1));
  case '.':
    return By.className(x.substr(1));
  case '<':
    return By.tagName(x.replace(/[<>]/g, ''));
  default:
    return By.xpath(`//*[contains(text(), '${x}')]`);
  }
};

When('I click on {string}', async function(this: World, id: string) {
  const selector = getSelector(id);
  await this.driver.wait(until.elementLocated(selector));
  const element = await this.driver.findElement(selector);
  await element.click();
  await after(1000);
});

When('I focus on {string}', async function(this: World, id: string) {
  const selector = getSelector(id);
  await this.driver.wait(until.elementLocated(selector));
  const element = await (await this.driver).findElement(selector);
  await element.click();
});

When('I type {string}', async function(this: World, text: string) {
  const input = await (await this.driver).switchTo().activeElement();
  return input.sendKeys(text);
});

When('I press enter', async function(this: World) {
  (await (await this.driver).switchTo().activeElement()).sendKeys(Key.ENTER);
  await after(1000);
});

// eslint-disable-next-line max-len
Then('I should have {int} {string} element(s)', async function(this: World, int: number, id: string) {
  const selector = getSelector(id);
  const elements = await this.driver.findElements(selector);

  expect(elements).to.have.length(int);
});

Then('I should see {string}', async function(this: World, test: string) {
  const selector = getSelector(test);
  const elements = await this.driver.findElements(selector);

  expect(elements).to.have.length.above(0);
});

// eslint-disable-next-line max-len
Then('{string} should have a {string} attribute of {string}', async function(this: World, test: string, key: string, value: string) {
  const selector = getSelector(test);
  const element = await this.driver.findElement(selector);
  const attribute = await element.getAttribute(key);

  expect(attribute).to.equal(value);
});

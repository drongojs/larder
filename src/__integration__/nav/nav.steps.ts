/* eslint-disable no-invalid-this */
import { Given, Then } from '@cucumber/cucumber';
import { World } from '../world';
import { expect } from 'chai';
import { By, until } from 'selenium-webdriver';

Given('I am on {string}', function(this: World, url: string) {
  return this.driver.get(`${this.base}/iframe.html?id=routes--${url.substr(1).replace(/\//g, '-')}`);
});

Then('I should be on {string}', async function(this: World, url: string) {
  const selector = By.id('int-current-path');
  await this.driver.wait(until.elementLocated(selector));
  const element = await this.driver.findElement(selector);

  const current = await element.getAttribute('innerHTML');

  expect(current).to.equal(url);
});

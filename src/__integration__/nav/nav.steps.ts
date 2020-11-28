/* eslint-disable no-invalid-this */
import { Given, Then } from '@cucumber/cucumber';
import { World } from '../world';
import { expect } from 'chai';
import { By, until } from 'selenium-webdriver';
import { after } from 'crosscutting/utils';

Given('I am on {string}', async function(this: World, url: string) {
  await this.driver.get(`${this.base}/iframe.html?id=app--routes&url=${encodeURIComponent(url)}`);
  await after(1000);
});

Then('I should be on {string}', async function(this: World, url: string) {
  const selector = By.id('int-current-path');
  await this.driver.wait(until.elementLocated(selector));
  const element = await this.driver.findElement(selector);

  const current = await element.getAttribute('innerHTML');

  expect(current).to.equal(url);
});

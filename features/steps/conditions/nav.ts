import { When } from '@cucumber/cucumber';
import { World } from '../world';
import { By, until, Key } from 'selenium-webdriver';

const getSelector = (x: string) => {
  switch (x[0]) {
  case '#':
    return By.id(x.substr(1));
  default:
    return By.xpath(`//*[contains(text(), '${x}')]`)
  }
};

When('I click on {string}', async function(this: World, id: string) {
  const selector = getSelector(id);
  await this.driver.wait(until.elementLocated(selector));
  const element = await this.driver.findElement(selector);
  return element.click();
});

When('I focus on {string}', async function(this: World, id: string) {
  const selector = getSelector(id);
  await this.driver.wait(until.elementLocated(selector));
  const element = await (await this.driver).findElement(selector);
  element.click();
});

When('I type {string}', async function(this: World, text: string) {
  const input = await (await this.driver).switchTo().activeElement();
  return input.sendKeys(text);
});

When('I press enter', async function(this: World) {
  (await (await this.driver).switchTo().activeElement()).sendKeys(Key.ENTER);
});

When('I wait {int}', async function(this: World, int: number) {
  return new Promise((res) => setTimeout(res, int));
});

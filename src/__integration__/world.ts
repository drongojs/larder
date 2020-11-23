/* eslint-disable no-invalid-this */
import { setWorldConstructor, After } from '@cucumber/cucumber';
import {
  Builder,
  ThenableWebDriver,
} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export class World {
  driver: ThenableWebDriver;
  base: string;

  constructor() {
    this.base = 'http://localhost:6006';
    // this.base = resolve('storybook-static');
    this.driver = new Builder()
      .forBrowser('chrome')
      .setChromeOptions(new chrome
        .Options()
        .windowSize({ width: 300, height: 500 })
        // .headless()
      )
      .build();
  }
}

setWorldConstructor(World);

After(function(this: World) {
  return this.driver.quit();
});

import { setWorldConstructor, After } from '@cucumber/cucumber';
import {
  Builder,
  ThenableWebDriver,
} from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

export class World {
  driver: ThenableWebDriver;

  constructor() {
    this.driver = new Builder()
      .forBrowser('chrome')
      // .setChromeOptions(new chrome.Options().headless())
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

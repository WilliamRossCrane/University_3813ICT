import { browser, by, element } from "protractor";

export class AppPage {
  navigateTo(url) {
    return browser.get(url);
  }

  clickaButton(btn) {
    btn.click();
  }
  getTitleText() {
    return element(by.css("app-root h1")).getText();
  }
}

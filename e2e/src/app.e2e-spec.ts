import { AppPage } from "./app.po";
import { browser, logging, element, by } from "protractor";

describe("workspace-project App", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it("should display welcome message", () => {
    page.navigateTo("/");
    expect(page.getTitleText()).toEqual("Welcome to assignment1angular!");
  });

  it("should log in and navigate to account page", () => {
    page.navigateTo("/login");
    browser.waitForAngularEnabled(false);

    let email = element(by.id("inputEmail"));
    let password = element(by.id("inputPassword"));
    let submitButton = element(by.id("submitButton"));

    email.sendKeys("a-user@mail.com");
    password.sendKeys("123a");
    page.clickaButton(submitButton);
    browser.driver.sleep(1000);

    expect(email.getAttribute("value")).toEqual("a-user@mail.com");
    expect(password.getAttribute("value")).toEqual("123a");
    submitButton.click().then(() => {
      browser.waitForAngular();
      expect(browser.driver.getCurrentUrl()).toMatch("/account");
    });
  });

  it("should not create new user", () => {
    page.navigateTo("/register");
    browser.waitForAngularEnabled(false);

    let email = element(by.id("login"));
    let username = element(by.id("username"));
    let password = element(by.id("password"));
    let submitButton = element(by.id("submit"));

    email.sendKeys("");
    username.sendKeys("");
    password.sendKeys("");

    expect(email).toBeNull();
    expect(username).toBeNull();
  });

  it("should create a new group", () => {
    page.navigateTo("/group");
    browser.waitForAngularEnabled(false);

    let groupname = element(by.name("groupname"));
    let assist1 = element(by.name("assist1"));
    let submitButton = element(by.name("submit"));

    groupname.sendKeys("testing group e2e");
    assist1.sendKeys("Super Admin A");
    page.clickaButton(submitButton);

    let group_name_exist = element.all(by.className("user-link"));
    expect(group_name_exist.get(0).getText()).toEqual("testing group e2e");
  });

  it("should not create a new group", () => {
    page.navigateTo("/group");
    browser.waitForAngularEnabled(false);

    let groupname = element(by.name("groupname"));
    let assist1 = element(by.name("assist1"));
    let assist2 = element(by.name("assist2"));
    let submitButton = element(by.name("submit"));

    groupname.sendKeys("");
    assist1.sendKeys("");
    assist2.sendKeys("");

    page.clickaButton(submitButton);

    let group_name_exist = element.all(by.className("user-link"));
    expect(page.clickaButton(submitButton)).toThrowError(
      "Assistances cannot be the same person"
    );
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser
      .manage()
      .logs()
      .get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE
      } as logging.Entry)
    );
  });
});

import { TestBed } from "@angular/core/testing";

import { LoginServiceService } from "./login-service.service";
// import { HttpClient } from "selenium-webdriver/http";
// import { HttpClient } from "@angular/common/http";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("LoginServiceService", () => {
  let loginService: LoginServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginServiceService],
      imports: [HttpClientTestingModule]
    });

    loginService = TestBed.get(LoginServiceService);
    console.log(loginService);
  });

  it("should be created", () => {
    const service: LoginServiceService = TestBed.get(LoginServiceService);
    expect(loginService).toBeTruthy();
  });

  it("should return a collection of user", () => {
    const admin = {
      email: "a-user@mail.com",
      password: "123a",
      username: "Super Admin A",
      image: "",
      isGroupAdmin: true,
      isSuperAdmin: true
    };
    let response;
    spyOn(loginService, "retrieveUser");

    loginService.retrieveUser().subscribe(res => {
      response = res;
    });
    // expect(response).toBeUndefined();
    expect(response[0]).toEqual(admin);
  });

  it("should return a list of group", () => {
    let response;
    loginService.getGroups().subscribe(res => {
      response = res;
    });

    expect(response).toBeUndefined();
  });

  it("should not get channel", () => {
    let response;
    loginService
      .getChannel("notevenachannel", "notevenagroup")
      .subscribe(res => {
        response = res;
      });

    expect(response).toBeUndefined();
  });

  it("should grand super", () => {
    let response;
    loginService.grandSuper("a-user@mail.com").subscribe(res => {
      response = res;
    });

    expect(response).toBeTruthy();
  });
});

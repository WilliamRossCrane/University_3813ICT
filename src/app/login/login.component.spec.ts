import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { Route, Router, Data } from "@angular/router";
import { LoginServiceService } from "../services/login-service.service";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

fdescribe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        FormsModule,
        BrowserModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  describe("testing login", async () => {
    it("should create", async(() => {
      expect(component).toBeTruthy();
    }));

    it("form should be valid", async(() => {
      spyOn(component, "logIn");

      let button = fixture.debugElement.nativeElement.querySelector("button");

      component.email = "a-user@mail.com";
      component.password = "123a";
      button.click();

      expect(component.email).toEqual("a-user@mail.com");
      expect(component.password).toEqual("123a");
      expect(component.logIn).toHaveBeenCalledTimes(1);
    }));

    it("form should be invalid", async(() => {
      spyOn(component, "logIn");

      const button = fixture.debugElement.nativeElement.querySelector("button");

      component.email = "";
      component.password = "";
      button.click();

      expect(component.email).toEqual("");
      expect(component.password).toEqual("");
      expect(component.logIn).toHaveBeenCalledTimes(1);
    }));
  });
});

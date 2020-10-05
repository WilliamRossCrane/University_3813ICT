import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { RegisterComponent } from "./register.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("RegisterComponent", () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [
        FormsModule,
        BrowserModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("form should be invalid", () => {
    spyOn(component, "createAccount");

    const button = fixture.debugElement.nativeElement.querySelector("button");

    component.usernameRegister = "";
    component.emailRegister = "";
    component.passwordRegister = "";

    expect(component.createAccount).toHaveBeenCalledTimes(0);
  });

  it("form should be invalid 2", () => {
    spyOn(component, "createAccount");

    const button = fixture.debugElement.nativeElement.querySelector("button");

    component.usernameRegister = "sample username";
    component.emailRegister = "sample@mail.com";
    component.passwordRegister = "123sample";
    component.groupadmin = false;
    component.superadmin = false;
    component.imageRegister = "example.png";

    expect(component.createAccount).toHaveBeenCalledTimes(0);
  });
});

import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { GroupComponent } from "./group.component";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("GroupComponent", () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupComponent],
      imports: [
        FormsModule,
        BrowserModule,
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create new group", () => {
    spyOn(component, "createGroup");

    const button = fixture.debugElement.nativeElement.querySelector("button");

    component.session = { isGroupAdmin: true };
    component.groupname = "jasmine testing group";
    component.assist1 = "jasmine test";
    component.assist2 = "";
    console.log("TEST TETETTETETE");

    // button.click();
    expect(component.createGroup("jasmine admin")).toBeTruthy();
  });

  it("invalid create new group", () => {
    spyOn(component, "createGroup");

    const button = fixture.debugElement.nativeElement.querySelector("button");
    fixture.detectChanges();
    component.session = { isGroupAdmin: true };
    component.groupname = "";
    component.assist1 = "";
    component.assist2 = "";
    // button.click();
    expect(component.createGroup("")).toBeFalsy();
  });
});

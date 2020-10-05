// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import "zone.js/dist/zone-testing";
// import "zone.js/dist/proxy.js";
// import "zone.js/dist/jasmine-patch";
// import "zone.js/dist/async-test";
// import "zone.js/dist/sync-test";
import { getTestBed } from "@angular/core/testing";
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
// Then we find all the tests.
const context = require.context("./", true, /login-service.service\.spec\.ts$/);
// const context = require.context("./", true, /login.component\.spec\.ts$/);
// And load the modules.

console.log("TEST TEST TEST TEST TEST");

context.keys().map(context);

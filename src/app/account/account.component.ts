import { Component, OnInit } from "@angular/core";
import { LoginServiceService } from "../services/login-service.service";

@Component({
  selector: "app-account",
  templateUrl: "./account.component.html",
  styleUrls: ["./account.component.css"]
})
export class AccountComponent implements OnInit {
  protected user;

  groups = [];

  constructor(private loginService: LoginServiceService) {}

  ngOnInit() {
    if (typeof Storage !== undefined) {
      this.user = JSON.parse(sessionStorage.getItem("sessionUser"));
    }

    this.loginService.getGroups().subscribe(data => {
      this.groups = data;
    });
  }
}

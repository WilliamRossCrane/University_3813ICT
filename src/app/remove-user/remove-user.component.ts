import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoginServiceService } from "../services/login-service.service";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-remove-user",
  templateUrl: "./remove-user.component.html",
  styleUrls: ["./remove-user.component.css"]
})
export class RemoveUserComponent implements OnInit {
  users = [];
  session = JSON.parse(sessionStorage.getItem("sessionUser"));

  constructor(
    private router: Router,
    private loginService: LoginServiceService
  ) {}

  ngOnInit() {
    this.loginService.retrieveUser().subscribe(data => {
      this.users = data;
    });
  }

  // remove a user with their email passed
  removeUser(email: string) {
    console.log(email);
    if (email !== "a-user@mail.com") {
      this.loginService.removeUser(email).subscribe(data => {
        // this.router.navigateByUrl("/account");

        this.loginService.retrieveUser().subscribe(data => {
          this.users = data;
        });
        alert(email + " is removed!!!");
      }),
        (error: HttpErrorResponse) => {
          alert("Error" + error);
        };
    } else {
      alert("Cannot remove super admin");
    }
  }

  // grand super role to user
  grandSuper(email: string) {
    this.loginService.grandSuper(email).subscribe(data => {
      if (email == "a-user@mail.com") {
        alert("User is a super admin");
      } else {
        this.loginService.retrieveUser().subscribe(data => {
          this.users = data;
        });
        alert("Permission Granted to " + email);
      }
    });
  }
}

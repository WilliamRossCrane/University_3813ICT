import { Component, OnInit } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Route, Router, Data } from "@angular/router";
import { LoginServiceService } from "../services/login-service.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  email = "";
  password = "";
  title = "Login";
  // data = sessionStorage.getItem("sessionUser");

  // For karma testing
  logInForm: FormGroup;
  constructor(
    private router: Router,
    private loginService: LoginServiceService
  ) {}

  ngOnInit() {}

  // Log In function called when the
  // 'Sign In' button is clicked
  logIn() {
    console.log(this.email);
    console.log(this.password);

    this.loginService.logIn(this.email, this.password).subscribe(data => {
      console.log(data[0]);

      if (data == false) {
        alert("Invalid username or password");
        this.email = "";
        this.password = "";
      } else {
        const dataJSON = JSON.stringify(data[0]);
        sessionStorage.setItem("sessionUser", dataJSON);
        localStorage.setItem("localUser", dataJSON);
        this.router.navigateByUrl("/account");
      }
    }),
      (error: HttpErrorResponse) => {
        alert("Error: " + error);
      };
  }
}

import { Component, OnInit, ɵConsole } from "@angular/core";
import { Router } from "@angular/router";
import { LoginServiceService } from "../services/login-service.service";
import { saveAs } from "file-saver";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  emailRegister = "";
  usernameRegister = "";
  passwordRegister = "";
  imageRegister = "";
  groupadmin: boolean = false;
  superadmin: boolean = false;

  selectedfile: File = null;
  imagepath = "";
  private data;

  constructor(
    private router: Router,
    private loginService: LoginServiceService
  ) {}

  ngOnInit() {}

  // FIle input upload
  onFileSelected(event) {
    console.log(event.target.files[0]);
    this.selectedfile = <File>event.target.files[0];
    console.log(this.selectedfile.name + " HRERE REJBJKA");
    this.imageRegister = this.selectedfile.name;
    console.log(this.imageRegister);
  }

  // Create new account
  createAccount() {
    console.log(this.imageRegister + " ajkbdjkabsjd");
    if (
      this.emailRegister === "" ||
      this.usernameRegister === "" ||
      this.passwordRegister === ""
    ) {
      alert("Email, Username and Password cannot be blank");
    } else {
      this.loginService
        .createAccountService(
          this.emailRegister,
          this.usernameRegister,
          this.groupadmin,
          this.superadmin,
          this.passwordRegister,
          this.selectedfile.name
        )
        .subscribe(data => {
          if (data == false) {
            alert("Email or Username is already taken");
            this.emailRegister = "";
            this.usernameRegister = "";
            this.passwordRegister = "";
          } else {
            this.router.navigateByUrl("/remove_user");
            alert("User has been registered!!!");
          }
        });
    }
  }

  // upload function
  imageUpload() {
    const fd = new FormData();

    fd.append("image", this.selectedfile, this.selectedfile.name);

    this.loginService.imageupload(fd).subscribe(res => {
      this.imagepath = res.data.filename;
    });
  }
}

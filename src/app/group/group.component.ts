import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { LoginServiceService } from "../services/login-service.service";
import { HttpErrorResponse } from "@angular/common/http";
import { SocketService } from "../services/socket.service";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"]
})
export class GroupComponent implements OnInit {
  @Output() click = new EventEmitter();
  groupname = "";
  assist1 = "";
  assist2 = "";
  // retrieve current session
  session = JSON.parse(sessionStorage.getItem("sessionUser"));
  groups = [];
  users = [];
  channelName = "";

  selectedUser = "";
  selectedGroup = "";
  selectedUserChannel = "";
  selectedChannel = "";

  constructor(
    private router: Router,
    private loginService: LoginServiceService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    console.log("FROM GROUP COMPONENT");
    this.click.emit();
    this.loginService.getGroups().subscribe(data => {
      console.log(data);
      this.groups = data;
    });

    this.loginService.retrieveUser().subscribe(data => {
      this.users = data;
    });

    this.socketService.initSocket();
  }

  // function is called when 'create group'
  // button is clicked
  createGroup(groupadmin: string) {
    if (this.groupname !== "" && this.assist1 !== "") {
      if (this.assist1 == this.assist2) {
        alert("Assistances cannot be the same person");
      } else {
        this.loginService
          .createGroups(this.groupname, groupadmin, this.assist1, this.assist2)
          .subscribe(data => {
            console.log(data);
            if (data === false) {
              alert("Group name already exist");
              this.groupname = "";
            } else {
              alert(this.groupname + " is successfully created");
              this.groupname = "";
              this.assist1 = "";
              this.assist2 = "";
              this.loginService.getGroups().subscribe(data => {
                this.groups = data;
                console.log(data);
              });
            }
          });
      }
    } else {
      alert("Please check all the requiments");
    }
  }

  // function is called when 'add' button
  // for member section is clicked
  addMember(groupn: string, obID: string) {
    // console.log(this.user_email);

    this.loginService
      .addMember(this.selectedUser, groupn, obID)
      .subscribe(data => {
        if (data === false) {
          alert("User is already in that group");
        } else {
          this.loginService.getGroups().subscribe(data => {
            this.groups = data;
            console.log(data);
          });

          alert(this.selectedUser + " is added to " + groupn);
          this.selectedUser = "";
        }
      });
  }

  // function is called when 'remove group name'
  // is clicked
  removeGroup(groupname: string) {
    if (confirm("Are you sure to delete " + groupname)) {
      this.loginService.removeGroup(groupname).subscribe(data => {
        this.loginService.getGroups().subscribe(data => {
          this.groups = data;
        });
        alert(groupname + " has been removed");
      });

      // this.router.navigateByUrl("/account");
    }
  }

  // function is called when 'remove member' button
  // is clicked next to each member
  removeMember(membername: string, groupname: string) {
    if (
      confirm("Are you sure to remove " + membername + " from " + groupname) &&
      membername !== ""
    ) {
      this.loginService.removeMember(membername, groupname).subscribe(data => {
        if (data.confirmation == false) {
          alert("Cannot remove the group admin");
        } else {
          this.loginService.getGroups().subscribe(data => {
            this.groups = data;
            console.log(data);
          });
          alert(membername + " has been removed from " + groupname);
        }
      });
    }
  }

  // function is called when 'create channel' button
  // is clicked when the channel is defined
  createChannel(groupname: string, membername: string) {
    console.log(groupname);
    console.log(membername);
    if (this.channelName === "") {
      alert("Channel name cannot be blank!!!");
    } else {
      this.loginService
        .createChannel(this.channelName, groupname, membername)
        .subscribe(data => {
          if (data == false) {
            alert("Channel name existed");
          } else {
            this.loginService.getGroups().subscribe(data => {
              this.groups = data;
              console.log(data);
            });

            alert(this.channelName + " is created!!");
            this.channelName = "";
          }
        });
    }
  }

  goToChannel(groupname, channelname) {
    this.socketService.joinChannel(groupname + channelname);
  }
}

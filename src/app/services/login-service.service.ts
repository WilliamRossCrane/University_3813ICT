import { Injectable, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";

interface User {
  email: string;
  type: number;
  valid: boolean;
}

@Injectable({
  providedIn: "root"
})
export class LoginServiceService {
  backend = "http://localhost:3000";
  isLoggedIn = false;
  constructor(private http: HttpClient) {}

  // Route for logging in
  logIn(email: string, password: string) {
    return this.http.post<any>(this.backend + "/api/auth", {
      email: email,
      password: password
    });
  }

  // Route for create new user
  createAccountService(
    email: string,
    username: string,
    isGroupAdmin: boolean,
    isSuperAdmin: boolean,
    password: string,
    imageregister: string
  ) {
    return this.http.post<any>(this.backend + "/api/register", {
      email: email,
      username: username,
      isGroupAdmin: isGroupAdmin,
      isSuperAdmin: isSuperAdmin,
      password: password,
      imageregister: imageregister
    });
  }

  // Testing image upload route
  imageupload(fd) {
    return this.http.post<any>(this.backend + "/imageupload", fd);
  }

  // Retrieve all users
  retrieveUser() {
    return this.http.get<any>(this.backend + "/getusers");
  }

  // Remove user route
  removeUser(email: string) {
    return this.http.post<any>(this.backend + "/api/delete", {
      email: email
    });
  }

  // Retrieve all groups
  getGroups() {
    return this.http.get<any>(this.backend + "/groups");
  }

  // create group with parameters
  createGroups(
    groupname: string,
    groupadmin: string,
    assist1: string,
    assist2: string
  ) {
    return this.http.post<any>(this.backend + "/groups", {
      groupname: groupname,
      groupadmin: groupadmin,
      assist1: assist1,
      assist2: assist2
    });
  }

  // add new member to a group
  addMember(username: string, groupname: string, obID: string) {
    return this.http.post<any>(this.backend + "/addmember", {
      username: username,
      groupname: groupname,
      obID: obID
    });
  }

  // remove a specific group
  removeGroup(groupname: string) {
    return this.http.post<any>(this.backend + "/removegroup", {
      groupname: groupname
    });
  }

  // remove a member from a group
  removeMember(membername: string, groupname: string) {
    return this.http.post<any>(this.backend + "/removemember", {
      membername: membername,
      groupname: groupname
    });
  }

  // create new channel
  createChannel(channelname: string, groupname: string, member: string) {
    return this.http.post<any>(this.backend + "/channels", {
      channelname: channelname,
      groupname: groupname,
      member: member
    });
  }

  // add non-existed user to channel
  addUserToChannel(channelname: string, groupname: string, member: string) {
    return this.http.post<any>(this.backend + "/addUserToChannel", {
      channelname: channelname,
      groupname: groupname,
      member: member
    });
  }

  // retrieve a specific channel
  getChannel(channelname: string, groupname: string) {
    return this.http.post<any>(this.backend + "/channel", {
      channelname: channelname,
      groupname: groupname
    });
  }

  // retrieve group by its name
  getGroupByName(groupname: string) {
    return this.http.post<any>(this.backend + "/getgroupbyname", {
      groupname: groupname
    });
  }

  // remove a user in a group
  removeUserChannel(member: string, groupname: string, channelname: string) {
    return this.http.post<any>(this.backend + "/removeuserchannel", {
      member: member,
      groupname: groupname,
      channelname: channelname
    });
  }

  // remove a channel
  removeChannel(groupname: string, channelname: string) {
    return this.http.post<any>(this.backend + "/removechannel", {
      groupname: groupname,
      channelname: channelname
    });
  }

  // passing email to grand
  // super admin role
  grandSuper(email: string) {
    return this.http.post<any>(this.backend + "/grandsuper", {
      email: email
    });
  }
}

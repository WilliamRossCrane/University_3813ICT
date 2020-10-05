import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";
import { registerLocaleData } from "@angular/common";
const SERVER_URL = "http://localhost:3000";
@Injectable({
  providedIn: "root"
})
export class SocketService {
  private socket;
  url = "http://localhost:3000";
  constructor() {}

  // initialise of socket
  public initSocket(): void {
    this.socket = io(SERVER_URL);
  }

  // message sending from angular side
  public send(
    group: string,
    channel: string,
    message: string,
    username: string,
    image: string,
    sendingImage: string
  ): void {
    this.socket.emit("message", {
      group: group,
      channel: channel,
      message: message,
      username: username,
      image: image,
      sendingImage: sendingImage
    });
  }

  // retrieving message from server
  public getMessage(next) {
    this.socket.on("message", message => next(message));
  }

  public notice(next) {}

  // Send to socket.io
  // Join the channel with group name and channel name
  public joinChannel(groupandchannel) {
    this.socket.emit("joinChannel", groupandchannel);
  }

  // retrieve join message
  public joinedMessage(next) {
    this.socket.on("notice", result => next(result));
  }

  // retrieve leave message
  public leaveChannel(groupandchannel) {
    this.socket.emit("leaveChannel", groupandchannel);
  }
}

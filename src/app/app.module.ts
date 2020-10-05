import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { AccountComponent } from "./account/account.component";
import { RegisterComponent } from "./register/register.component";
import { RemoveUserComponent } from "./remove-user/remove-user.component";
import { GroupComponent } from "./group/group.component";
import { ChannelDetailsComponent } from "./channel-details/channel-details.component";

import { SocketService } from "../app/services/socket.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AccountComponent,
    RegisterComponent,
    RemoveUserComponent,
    GroupComponent,
    ChannelDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}

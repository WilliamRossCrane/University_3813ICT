import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AccountComponent } from "./account/account.component";
import { RegisterComponent } from "./register/register.component";
import { RemoveUserComponent } from "./remove-user/remove-user.component";
import { GroupComponent } from "./group/group.component";
import { ChannelDetailsComponent } from "./channel-details/channel-details.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "account", component: AccountComponent },
  { path: "register", component: RegisterComponent },
  { path: "remove_user", component: RemoveUserComponent },
  { path: "group", component: GroupComponent },
  { path: "channel/:gname/:cname", component: ChannelDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

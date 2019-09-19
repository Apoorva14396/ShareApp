import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HttpClientModule } from "@angular/common/http";
import { FriendRoutingModule } from "./friend-routing.module";
import { AdminModule } from "../admin/admin.module";
import { SharedModule } from "../shared/shared.module";
import { FrienddashboardComponent } from "./frienddashboard/frienddashboard.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FriendsearchComponent } from "./friendsearch/friendsearch.component";
import { HeaderComponent } from "./header/header.component";
import { NotificationComponent } from "./notification/notification.component";

@NgModule({
  declarations: [
    FrienddashboardComponent,
    FriendsearchComponent,
    HeaderComponent,
    NotificationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FriendRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [],
  bootstrap: [FrienddashboardComponent]
})
export class FriendModule {}

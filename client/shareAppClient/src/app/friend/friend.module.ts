import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HttpClientModule } from "@angular/common/http";
import { FriendRoutingModule } from "./friend-routing.module";
import { AdminModule } from "../admin/admin.module";
import { SharedModule } from "../shared/shared.module";
import { FrienddashboardComponent } from "./frienddashboard/frienddashboard.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { FriendrequestComponent } from "./friendrequest/friendrequest.component";
import { FriendsearchComponent } from './friendsearch/friendsearch.component';

@NgModule({
  declarations: [FrienddashboardComponent, FriendrequestComponent, FriendsearchComponent],
  imports: [
    CommonModule,
    SharedModule,
    FriendRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [FriendrequestComponent],
  bootstrap: [FrienddashboardComponent]
})
export class FriendModule {}

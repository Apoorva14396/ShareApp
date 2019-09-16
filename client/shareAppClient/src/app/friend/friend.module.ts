import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { HttpClientModule } from "@angular/common/http";
import { FriendRoutingModule } from "./friend-routing.module";
import { AdminModule } from "../admin/admin.module";
import { SharedModule } from "../shared/shared.module";
import { FrienddashboardComponent } from "./frienddashboard/frienddashboard.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [FrienddashboardComponent],
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

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FriendRoutingModule } from "./friend-routing.module";
import { AdminModule } from "../admin/admin.module";
import { DashboardComponent } from "../admin/dashboard/dashboard.component";
import { SharedModule } from "../shared/shared.module";
@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, FriendRoutingModule, AdminModule, SharedModule],
  exports: [FriendRoutingModule, DashboardComponent, AdminModule],
  bootstrap: [DashboardComponent]
})
export class FriendModule {}

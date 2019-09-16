import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FrienddashboardComponent } from "./frienddashboard/frienddashboard.component";
const routes: Routes = [
  {
    path: "",
    component: FrienddashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendRoutingModule {}

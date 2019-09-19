import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// import { FriendModule } from "./friend.module";
import { FrienddashboardComponent } from "./frienddashboard/frienddashboard.component";
import { FriendsearchComponent } from "./friendsearch/friendsearch.component";

import { NotificationComponent } from "./notification/notification.component";
const routes: Routes = [
  {
    path: "",
    component: FrienddashboardComponent
  },

  {
    path: "search",
    component: FriendsearchComponent
  },
  {
    path: "notification",
    component: NotificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendRoutingModule {}

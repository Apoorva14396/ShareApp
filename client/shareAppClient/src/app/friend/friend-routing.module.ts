import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// import { FriendModule } from "./friend.module";
import { FrienddashboardComponent } from "./frienddashboard/frienddashboard.component";
import { FriendrequestComponent } from "./friendrequest/friendrequest.component";
import { FriendsearchComponent } from "./friendsearch/friendsearch.component";
const routes: Routes = [
  {
    path: "",
    component: FrienddashboardComponent
  },
  {
    path: "request",
    component: FriendrequestComponent
  },
  {
    path: "search",
    component: FriendsearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FriendRoutingModule {}

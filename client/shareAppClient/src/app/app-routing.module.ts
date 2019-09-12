import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "admin", loadChildren: "./admin/admin.module#AdminModule" },
  { path: "user", loadChildren: "./user/user.module#UserModule" },
  { path: "login", loadChildren: "./login/login.module#LoginModule" },
  {
    path: "friend",
    loadChildren: "./friend/friend.module#FriendModule"
  },
  {
    path: "file-sharing",
    loadChildren: "./file-sharing/file-sharing.module#FileSharingModule"
  }
  // {
  //   path: "shared",
  //   loadChildren: "./shared-file/shared-file.module#SharedFileModule"
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

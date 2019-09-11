import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "admin", loadChildren: "./admin/admin.module#AdminModule" },
  { path: "user", loadChildren: "./user/user.module#UserModule" },
  { path: "login", loadChildren: "./login/login.module#LoginModule" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

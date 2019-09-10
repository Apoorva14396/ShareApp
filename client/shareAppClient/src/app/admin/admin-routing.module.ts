import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  { path: "login", loadChildren: "../login/login.module#LoginModule" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

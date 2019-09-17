import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { TermsComponent } from "./terms/terms.component";
import { UsermanagementComponent } from "./usermanagement/usermanagement.component";
import { AuthGuard } from "../auth.guard";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "about",
    component: AboutusComponent
  },

  {
    path: "terms",
    component: TermsComponent
  },
  {
    path: "management",
    component: UsermanagementComponent
  },
  {
    path: "login",
    loadChildren: "../login/login.module#LoginModule"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}

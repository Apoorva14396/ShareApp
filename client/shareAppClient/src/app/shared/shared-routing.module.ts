import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "../shared/dashboard/dashboard.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "aboutss",
    component: AboutusComponent
  },

  {
    path: "footer",
    component: FooterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule {}

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "../shared/dashboard/dashboard.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { FileSharingModule } from "../file-sharing/file-sharing.module";
import { AuthGuard } from "../auth.guard";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent
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

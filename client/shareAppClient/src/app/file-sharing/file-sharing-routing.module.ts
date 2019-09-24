import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: "photo",
    component: FileUploadComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileSharingRoutingModule {}

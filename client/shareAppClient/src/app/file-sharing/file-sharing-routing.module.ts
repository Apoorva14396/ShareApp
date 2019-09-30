import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { MyDriveComponent } from "./my-drive/my-drive.component";
const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: "photo",
    component: FileUploadComponent
  },
  {
    path: "uploaded",
    component: MyDriveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileSharingRoutingModule {}

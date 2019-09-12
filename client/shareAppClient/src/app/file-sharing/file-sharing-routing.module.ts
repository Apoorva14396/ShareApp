import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { WelcomeComponent } from "./welcome/welcome.component";
import { UploadPhotoComponent } from "./upload-photo/upload-photo.component";

const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent
  },
  {
    path: "photo",
    component: UploadPhotoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileSharingRoutingModule {}

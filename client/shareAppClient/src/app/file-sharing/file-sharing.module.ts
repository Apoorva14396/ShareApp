import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FileSharingRoutingModule } from "./file-sharing-routing.module";
import { SharedModule } from "../shared/shared.module";
import { WelcomeComponent } from "./welcome/welcome.component";
import { UploadPhotoComponent } from "./upload-photo/upload-photo.component";

@NgModule({
  declarations: [WelcomeComponent, UploadPhotoComponent],
  imports: [CommonModule, FileSharingRoutingModule, SharedModule],
  exports: [UploadPhotoComponent],
  bootstrap: [WelcomeComponent]
})
export class FileSharingModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { FileSharingRoutingModule } from "./file-sharing-routing.module";
import { SharedModule } from "../shared/shared.module";
import { UploadPhotoComponent } from "./upload-photo/upload-photo.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeaderComponent } from "./header/header.component";

@NgModule({
  declarations: [UploadPhotoComponent, DashboardComponent, HeaderComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FileSharingRoutingModule,
    SharedModule
  ],
  exports: [UploadPhotoComponent],
  bootstrap: [DashboardComponent]
})
export class FileSharingModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { FileSharingRoutingModule } from "./file-sharing-routing.module";
import { SharedModule } from "../shared/shared.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { HeaderComponent } from "./header/header.component";
import { FileUploadComponent } from "./file-upload/file-upload.component";
import { FileSelectDirective } from "ng2-file-upload";
import { TokenInterceptorService } from "../token-interceptor.service";
import { MyDriveComponent } from "./my-drive/my-drive.component";

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    FileUploadComponent,
    FileSelectDirective,
    MyDriveComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FileSharingRoutingModule,
    SharedModule
  ],
  exports: [FileUploadComponent, MyDriveComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [DashboardComponent]
})
export class FileSharingModule {}

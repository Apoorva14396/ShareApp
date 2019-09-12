import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./login/login.module";
import { AdminModule } from "./admin/admin.module";
import { UserModule } from "./user/user.module";
import { SharedModule } from "./shared/shared.module";
import { FileSharingModule } from "./file-sharing/file-sharing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    AdminModule,
    UserModule,
    SharedModule,
    FileSharingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

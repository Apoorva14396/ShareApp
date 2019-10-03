import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgxPaginationModule } from "ngx-pagination";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./login/login.module";
import { AdminModule } from "./admin/admin.module";
import { UserModule } from "./user/user.module";
import { SharedModule } from "./shared/shared.module";
import { FileSharingModule } from "./file-sharing/file-sharing.module";
import { FriendModule } from "./friend/friend.module";
import { AngularFontAwesomeModule } from "angular-font-awesome";
import { AuthService } from "./auth.service";
import { NameService } from "./name.service";
import { AuthGuard } from "./auth.guard";
import { TokenInterceptorService } from "./token-interceptor.service";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    AdminModule,
    UserModule,
    SharedModule,
    FileSharingModule,
    FriendModule,
    AngularFontAwesomeModule,
    NgxPaginationModule
  ],
  providers: [
    AuthService,
    NameService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LoginRoutingModule } from "./login-routing.module";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { ErrorComponent } from "./error/error.component";
import { AdminModule } from "../admin/admin.module";
import { SharedModule } from "../shared/shared.module";
@NgModule({
  declarations: [RegisterComponent, LoginComponent, ErrorComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    LoginRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RegisterComponent,
    AdminModule,
    LoginComponent,
    SharedModule
  ]
})
export class LoginModule {}

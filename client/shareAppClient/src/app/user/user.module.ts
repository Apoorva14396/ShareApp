import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { UserRoutingModule } from "./user-routing.module";
import { SharedModule } from "../shared/shared.module";
// import { DashboardComponent } from "../shared/dashboard/dashboard.component";
// import { FooterComponent } from "../shared/footer/footer.component";

@NgModule({
  declarations: [],
  imports: [CommonModule, UserRoutingModule, SharedModule],
  exports: [],
  bootstrap: []
})
export class UserModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [DashboardComponent, FooterComponent],
  imports: [CommonModule, AdminRoutingModule],
  exports: [DashboardComponent],
  bootstrap: [DashboardComponent]
})
export class AdminModule {}

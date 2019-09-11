import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FooterComponent } from "./footer/footer.component";
import { AboutusComponent } from "./aboutus/aboutus.component";

@NgModule({
  declarations: [DashboardComponent, FooterComponent, AboutusComponent],
  imports: [CommonModule, AdminRoutingModule],
  exports: [DashboardComponent, AboutusComponent],
  bootstrap: [DashboardComponent]
})
export class AdminModule {}

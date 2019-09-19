import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AdminRoutingModule } from "./admin-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { FooterComponent } from "./footer/footer.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { TermsComponent } from "./terms/terms.component";
import { UsermanagementComponent } from "./usermanagement/usermanagement.component";
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    DashboardComponent,
    FooterComponent,
    AboutusComponent,
    TermsComponent,
    UsermanagementComponent,
    HeaderComponent
  ],
  imports: [CommonModule, AdminRoutingModule],
  exports: [
    DashboardComponent,
    AboutusComponent,
    TermsComponent,
    UsermanagementComponent
  ],
  bootstrap: [DashboardComponent]
})
export class AdminModule {}

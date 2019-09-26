import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedRoutingModule } from "./shared-routing.module";
import { DashboardComponent } from "../shared/dashboard/dashboard.component";
import { FooterComponent } from "../shared/footer/footer.component";
import { HeaderComponent } from "./header/header.component";
import { ReactiveFormsModule } from "@angular/forms";
@NgModule({
  declarations: [DashboardComponent, FooterComponent, HeaderComponent],
  imports: [CommonModule, SharedRoutingModule, ReactiveFormsModule],
  exports: [
    DashboardComponent,
    FooterComponent,
    SharedRoutingModule,
    ReactiveFormsModule
  ],
  bootstrap: [DashboardComponent]
})
export class SharedModule {}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedRoutingModule } from "./shared-routing.module";
import { DashboardComponent } from "../shared/dashboard/dashboard.component";
import { FooterComponent } from "../shared/footer/footer.component";

@NgModule({
  declarations: [DashboardComponent, FooterComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [DashboardComponent, FooterComponent, SharedRoutingModule],
  bootstrap: [DashboardComponent]
})
export class SharedModule {}

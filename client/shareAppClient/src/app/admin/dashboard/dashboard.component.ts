import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { AuthService } from "../../auth.service";
import { NameService } from "../../name.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  username: string;

  constructor(private router: Router, private authService: AuthService) {}

  newfunc() {
    this.username = localStorage.getItem("key");
  }
  ngOnInit() {
    this.newfunc();
  }
}

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
  useremail: string;
  constructor(
    private router: Router,
    private authService: AuthService,
    private nameService: NameService
  ) {}
  logOut() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
  newfunc() {
    this.username = JSON.stringify(localStorage.getItem("key"));
    this.useremail = JSON.stringify(localStorage.getItem("key1"));
  }
  ngOnInit() {
    this.newfunc();
  }
}

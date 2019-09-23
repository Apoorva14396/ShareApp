import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  username: string;
  useremail: string;
  constructor(private router: Router, private authService: AuthService) {}
  newfunc() {
    this.username = localStorage.getItem("key");
    this.useremail = JSON.stringify(localStorage.getItem("key1"));
  }
  logOut() {
    this.router.navigateByUrl("/login");
  }
  ngOnInit() {
    this.authService.logout();
    this.newfunc();
  }
}

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
@Component({
  selector: "app-frienddashboard",
  templateUrl: "./frienddashboard.component.html",
  styleUrls: ["./frienddashboard.component.css"]
})
export class FrienddashboardComponent implements OnInit {
  username: string;
  constructor(private router: Router, private authService: AuthService) {}
  newfunc() {
    this.username = localStorage.getItem("key");
  }
  ngOnInit() {
    this.newfunc();
  }
  logout() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}

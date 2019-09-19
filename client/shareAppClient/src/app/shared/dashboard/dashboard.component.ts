import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { HttpClient } from "@angular/common/http";

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
    private http: HttpClient
  ) {}
  logOut() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
  newfunc() {
    this.username = localStorage.getItem("key");
    // this.useremail = JSON.stringify(localStorage.getItem("key1"));
  }
  ngOnInit() {
    this.newfunc();
    this.http.get("http://localhost:3000/user/dashboard").subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
        if (err.status === 401) {
          this.router.navigate(["/login"]);
        }
      }
    );
  }
}

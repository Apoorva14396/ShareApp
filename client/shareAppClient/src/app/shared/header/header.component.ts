import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { NameService } from "../../name.service";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
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
    this.username = localStorage.getItem("key");
    this.useremail = JSON.stringify(localStorage.getItem("key1"));
  }
  ngOnInit() {
    this.newfunc();
  }
}

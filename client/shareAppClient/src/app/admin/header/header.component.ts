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
    this.router.navigateByUrl("/login");
    this.authService.logout();
  }
  newfunc() {
    this.username = localStorage.getItem("key");
  }
  ngOnInit() {
    this.newfunc();
  }
}

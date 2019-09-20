import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-usermanagement",
  templateUrl: "./usermanagement.component.html",
  styleUrls: ["./usermanagement.component.css"]
})
export class UsermanagementComponent implements OnInit {
  pending: any = [];
  users: any;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.http.get("http://localhost:3000/users").subscribe(
      data => {
        console.log(data);
        this.users = data;
        console.log(this.users);
      },
      err => {
        console.log("err", err);
      }
    );
  }
  logout() {
    this.router.navigateByUrl("/");
  }
}

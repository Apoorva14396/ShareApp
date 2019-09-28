import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-usermanagement",
  templateUrl: "./usermanagement.component.html",
  styleUrls: ["./usermanagement.component.css"]
})
export class UsermanagementComponent implements OnInit {
  users: any = [];
  obj: any;
  pending: any = [];
  message: any;
  userblocked = false;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.http.get("http://localhost:3001/users").subscribe(
      data => {
        console.log(data);
        this.users = data;
      },
      err => {
        console.log("err", err);
      }
    );
  }
  blockUser(obj) {
    console.log(typeof obj);
    this.http.post("http://localhost:3001/blockUser", { email: obj }).subscribe(
      data => {
        console.log(data);
        this.userblocked = true;
      },
      err => {
        console.log("err", err);
      }
    );
  }
  unblockUser(obj) {
    this.http
      .post("http://localhost:3001/unblockUser", { email: obj })
      .subscribe(
        data => {
          console.log(data);
          this.userblocked = false;
        },
        err => {
          console.log("err", err);
        }
      );
  }
  onClick(obj) {
    this.blockUser(obj);
  }
  onClick1(obj) {
    this.unblockUser(obj);
  }
  logout() {
    this.router.navigateByUrl("/");
  }
}

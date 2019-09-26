import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-usermanagement",
  templateUrl: "./usermanagement.component.html",
  styleUrls: ["./usermanagement.component.css"]
})
export class UsermanagementComponent implements OnInit {
  users: any = [];
  obj: any;
  pending: any = [];
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
    console.log(obj);
    this.http.post("http://localhost:3001/blockUser", obj).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log("err", err);
      }
    );
  }
  unblockUser(obj) {
    this.http.post("http://localhost:3001/unblockUser", obj).subscribe(
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
  onClick(obj) {
    //console.log(obj);
    this.blockUser(obj);
  }
  onClick1(obj) {
    // console.log(obj);
    this.unblockUser(obj);
  }
  logout() {
    this.router.navigateByUrl("/");
  }
}

import { Component, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";

import { FormBuilder, FormGroup } from "@angular/forms";

import { HttpClient } from "@angular/common/http";
import { FileSelectDirective } from "ng2-file-upload";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  username: string;
  useremail: string;
  profileImg: null;
  imageURL = null;
  message: string;
  users: any = [];
  imagePath: any;
  imgURL: any;
  dob: Date;
  image = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) {}
  logOut() {
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  ngOnInit() {
    this.http.get("http://localhost:3001/user/dashboard").subscribe(
      data => {
        console.log(data);
        this.username = data["name"];
        this.useremail = data["email"];
        this.profileImg = data["image"];
        this.http
          .get("http://localhost:3001/image/" + this.profileImg)
          .subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log(err.url);
              this.imageURL = err.url;
              this.image = true;
            }
          );
      },
      err => {
        console.log(err);
      }
    );
  }
}

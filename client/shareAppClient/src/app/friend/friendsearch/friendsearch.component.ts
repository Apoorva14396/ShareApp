import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-friendsearch",
  templateUrl: "./friendsearch.component.html",
  styleUrls: ["./friendsearch.component.css"]
})
export class FriendsearchComponent implements OnInit {
  reqAlready = null;
  formvalue: any;
  obj: any;
  searchForm: FormGroup;
  isPresent: any;
  username: String;
  user: any;
  name: any;
  set = false;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      email: ["", Validators.required]
    });
    this.newfunc();
  }
  newfunc() {
    this.username = localStorage.getItem("key");
    this.name = this.username;
  }
  details(obj) {
    this.formvalue = obj;
    console.log(this.formvalue);
    this.http
      .post("http://localhost:3000/searchUser", this.formvalue)
      .subscribe(
        data => {
          this.isPresent = true;
        },
        err => {
          console.log(err);
        }
      );
  }
  sendReq(obj) {
    this.formvalue = obj;
    console.log(this.formvalue);
    this.http
      .post("http://localhost:3000/requestAlready", this.formvalue)
      .subscribe(
        data => {
          console.log("data", data);
          this.reqAlready = data;
          setTimeout(() => {
            this.reqAlready = null;
          }, 3000);
        },
        err => {
          console.log("err", err);
          this.reqAlready = err.error;
          setTimeout(() => {
            this.reqAlready = null;
          }, 3000);
        }
      );
  }

  onSubmit() {
    this.details(this.searchForm.value);
  }

  onClick() {
    this.set = true;
    this.sendReq(this.searchForm.value);
    // this.receiveReq(this.searchForm.value);
  }

  logout() {
    this.router.navigateByUrl("/");
  }
}

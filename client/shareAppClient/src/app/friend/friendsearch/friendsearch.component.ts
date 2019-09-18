import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { NameService } from "../../name.service";

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
  useremail: any;
  user: any;
  name: any;
  email: any;
  set = false;
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    private nameService: NameService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.searchForm = this.fb.group({
      email: ["", Validators.required],
      senderemail: ["", Validators.required]
    });
    this.newfunc();
  }
  newfunc() {
    this.username = localStorage.getItem("key");
    this.name = this.username;
    this.useremail = localStorage.getItem("key1");
    this.email = this.useremail;
    this.searchForm.controls["senderemail"].setValue(this.email);
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
    const id = localStorage.getItem("id");
    this.http
      .post("http://localhost:3000/requestAlready", {
        formvalue: this.formvalue,
        id: id
      })
      .subscribe(
        data => {
          console.log("data", data["message"]);
          // todo
          this.reqAlready = data["message"];
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

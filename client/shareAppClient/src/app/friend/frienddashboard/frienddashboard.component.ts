import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { NameService } from "../../name.service";

@Component({
  selector: "app-frienddashboard",
  templateUrl: "./frienddashboard.component.html",
  styleUrls: ["./frienddashboard.component.css"]
})
export class FrienddashboardComponent implements OnInit {
  formvalue: any;
  obj: any;
  searchForm: FormGroup;
  isPresent: any;
  username: String;
  user: any;
  name: any;

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
      sendername: ["", Validators.required]
    });
    this.newfunc();
  }
  newfunc() {
    this.username = localStorage.getItem("key");
    this.name = this.username;
    this.searchForm.controls["sendername"].setValue(this.name);
  }
  details(obj) {
    this.formvalue = obj;
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

  onSubmit() {
    this.details(this.searchForm.value);
  }

  sendReq(obj) {
    this.formvalue = obj;
    this.http
      .post("http://localhost:3000/sendRequest", this.formvalue)
      .subscribe(
        data => {
          console.log("Hii there from Form");
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
  }
  onClick() {
    this.sendReq(this.searchForm.value);
  }
  logout() {
    this.router.navigateByUrl("/");
  }
}

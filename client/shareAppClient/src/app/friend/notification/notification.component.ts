import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"]
})
export class NotificationComponent implements OnInit {
  reqAlready = null;
  notificationForm: FormGroup;
  isPresent: any;
  username: String;
  useremail: any;
  user: any;
  name: any;
  email: any;
  set = false;
  formvalue: any;
  id: any;
  obj: any;
  private pending = [];
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.notificationForm = this.fb.group({});
    this.notify();
  }

  notify() {
    // this.formvalue = obj;
    this.http.get("http://localhost:3000/notification").subscribe(
      data => {
        // console.log("data", data);
        this.pending = data["pendingrequest"];
        //console.log(this.pending);
        for (let p of this.pending) {
          this.pending.push(p.email);
          console.log("p", p);
        }
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

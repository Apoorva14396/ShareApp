import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"]
})
export class NotificationComponent implements OnInit {
  pending: any = [];
  reqAlready = null;
  isPresent: any;
  user: any;
  name: any;
  email: any;
  obj: any;
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.notify();
  }

  notify() {
    this.http.get("http://localhost:3000/notification").subscribe(
      data => {
        console.log(data);
        this.pending = Object.values(data);
        console.log(this.pending);
      },
      err => {
        console.log("err", err);
      }
    );
  }
  acceptRequest(obj) {
    console.log(obj);

    this.http.post("http://localhost:3000/accept", obj).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log("err", err);
      }
    );
  }
  rejectRequest(obj) {
    console.log(obj);
    this.http.post("http://localhost:3000/reject", obj).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log("err", err);
      }
    );
  }
  logout() {
    this.router.navigateByUrl("/");
  }
  onClick(obj) {
    console.log(obj);
    this.acceptRequest(obj);
  }
  onClick1(obj) {
    console.log(obj);
    this.rejectRequest(obj);
  }
}

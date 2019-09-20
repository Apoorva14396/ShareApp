import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-friendlist",
  templateUrl: "./friendlist.component.html",
  styleUrls: ["./friendlist.component.css"]
})
export class FriendlistComponent implements OnInit {
  pending: any = [];
  user: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getFriends();
  }
  getFriends() {
    this.http.get("http://localhost:3000/friends").subscribe(
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
  logout() {
    this.router.navigateByUrl("/");
  }
}

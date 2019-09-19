import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";
// import { AdminService } from "../admin.service";
@Component({
  selector: "app-usermanagement",
  templateUrl: "./usermanagement.component.html",
  styleUrls: ["./usermanagement.component.css"]
})
export class UsermanagementComponent implements OnInit {
  userStatus = false;
  users: any = [];
  constructor() {}

  ngOnInit() {}
}

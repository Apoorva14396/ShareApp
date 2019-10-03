import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";

import { FormBuilder, FormGroup } from "@angular/forms";

import { HttpClient } from "@angular/common/http";
import { FileSelectDirective } from "ng2-file-upload";
import { NgxPaginationModule } from "ngx-pagination";
@Component({
  selector: "app-my-drive",
  templateUrl: "./my-drive.component.html",
  styleUrls: ["./my-drive.component.css"]
})
export class MyDriveComponent implements OnInit {
  username: string;
  useremail: string;
  profileImg: null;
  imageURL = null;
  message: string;
  users: any = [];
  imagePath: any = [];
  imgURL: any;
  dob: Date;
  image = false;
  pending: any = [];
  user: any;
  formvalue: any;
  images;
  file;
  currentFileToSend;
  receiversList: any = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("http://localhost:3001/fetchFiles").subscribe(
      data => {
        console.log(data);
        this.imagePath = data;
      },
      err => {
        console.log(err);
      }
    );

    this.http.get("http://localhost:3001/friends").subscribe(
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
  send(obj) {
    var list = document.querySelectorAll(".friend");
    console.log(list);
    for (let i = 0; i < list.length; i++) {
      if (list[i]["checked"] === true) {
        this.receiversList.push(list[i]["value"]);
      }
    }
    console.log(this.receiversList);
    this.formvalue = obj;
    this.http
      .post("http://localhost:3001/sendFile", {
        list: this.receiversList,
        value: this.currentFileToSend
      })
      .subscribe(
        data => {
          console.log(data);
        },
        err => {
          console.log(err);
        }
      );
  }
  setName(fileName) {
    this.currentFileToSend = fileName;
    console.log(this.currentFileToSend);
  }
  send1() {}
}

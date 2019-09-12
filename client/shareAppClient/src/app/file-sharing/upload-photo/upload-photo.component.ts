import { Component, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-upload-photo",
  templateUrl: "./upload-photo.component.html",
  styleUrls: ["./upload-photo.component.css"]
})
export class UploadPhotoComponent implements OnInit {
  picload: any;

  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit() {}
  details(data1) {
    this.picload = data1;
    this.http.post("http://localhost:3000/uploads", this.picload).subscribe(
      data => {},
      err => {
        console.log(err);
      }
    );
  }
}

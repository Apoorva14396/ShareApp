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
  selectedFile = null;
  constructor(private http: HttpClient, private route: Router) {}

  ngOnInit() {}
  onFileSelected(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];
  }
  onUpload() {}
  details(data1) {
    console.log("hiiiii");

    this.picload = data1;
    console.log(data1);
    this.http.get("http://localhost:3000/uploads").subscribe(
      data => {},
      err => {
        console.log(err);
      }
    );
    this.http.post("http://localhost:3000/upload", this.picload).subscribe(
      data => {
        console.log("hello");
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
}

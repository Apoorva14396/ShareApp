import { Component, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-file-upload",
  templateUrl: "./file-upload.component.html",
  styleUrls: ["./file-upload.component.css"]
})
export class FileUploadComponent implements OnInit {
  title = "fileUpload";
  singleUpload = false;
  multipleUpload = false;
  images;
  multipleImages = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {}

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log(this.images);
    }
  }

  selectMultipleImage(event) {
    if (event.target.files.length > 0) {
      this.multipleImages = event.target.files;
    }
  }

  onSubmit() {
    this.singleUpload = true;
    const formData = new FormData();
    formData.append("file", this.images);

    this.http
      .post<any>("http://localhost:3000/file", formData)
      .subscribe(res => console.log(res), err => console.log(err));
  }

  onMultipleSubmit() {
    this.multipleUpload = true;
    const formData = new FormData();
    for (let img of this.multipleImages) {
      formData.append("files", img);
      console.log();
    }

    this.http
      .post<any>("http://localhost:3000/multipleFiles", formData)
      .subscribe(res => console.log(res), err => console.log(err));
  }
}

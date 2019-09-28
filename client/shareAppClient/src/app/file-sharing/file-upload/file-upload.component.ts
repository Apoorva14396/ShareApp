import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
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
  formvalue: any;
  searchForm: FormGroup;
  multipleImages = [];
  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    {
      this.searchForm = this.fb.group({
        email: ["", Validators.required]
      });
    }
  }

  selectImage(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.images = file;
      console.log(this.images);
      console.log(this.images.name);
    }
  }

  selectMultipleImage(event) {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      this.multipleImages = files;
      console.log(this.multipleImages);
    }
  }

  onSubmit() {
    this.singleUpload = true;
    const formData = new FormData();
    formData.append("file", this.images);

    this.http.post<any>("http://localhost:3001/file", formData).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

  onMultipleSubmit() {
    this.multipleUpload = true;
    const formData = new FormData();
    for (let img of this.multipleImages) {
      formData.append("files", img);
    }
    this.http
      .post<any>("http://localhost:3001/multipleFiles", formData)
      .subscribe(res => console.log(res), err => console.log(err));
  }
  send(obj) {
    this.formvalue = obj;
    this.http.post("http://localhost:3001/sendFile", this.formvalue).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  onSave() {
    this.send(this.searchForm.value);
  }
}

import { Component, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FileSelectDirective } from "ng2-file-upload";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  formval: any;
  submitted = false;
  registrationForm: FormGroup;
  detailsobj: any = [];
  data1: any;
  username: string;
  useremail: string;
  profilePicture: FormGroup;
  profileImg: any;
  message: string;
  users: any = [];
  imagePath: any;
  imgURL: any;
  selectedFile = null;

  preview(event) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile.length === 0) return;
    var reader = new FileReader();
    this.imagePath = event.target.files;
    reader.readAsDataURL(this.selectedFile);
    reader.onload = _event => {
      this.imgURL = reader.result;
    };
  }
  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ["", Validators.required],
      dob: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      image: [""]
    });
  }
  details(data1) {
    console.log(data1);
    const fd = new FormData();
    fd.append("name", data1.name);
    fd.append("email", data1.email);
    fd.append("dob", data1.dob);
    fd.append("password", data1.password);
    fd.append("image", this.selectedFile, this.selectedFile.name);

    console.log(fd.get("image"));

    this.http.post("http://localhost:3001/register", fd).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }
  onSubmit() {
    if (this.registrationForm.invalid) {
      alert("invalid details");
      return this.router.navigateByUrl("");
    }
    this.submitted = true;
    alert("added");
    this.details(this.registrationForm.value);
    this.router.navigateByUrl("");
  }
}

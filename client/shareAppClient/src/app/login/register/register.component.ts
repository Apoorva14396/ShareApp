import { Component, OnInit } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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
  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ["", Validators.required],
      dob: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
      // ,photo: ["", Validators.required]
    });
  }
  details(data1) {
    this.formval = data1;
    this.http.post("http://localhost:3000/register", this.formval).subscribe(
      data => {
        this.detailsobj = data;
        console.log(this.detailsobj);
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
    // console.log(this.registrationForm);
    this.router.navigateByUrl("");
  }
}

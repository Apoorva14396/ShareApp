import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  loginForm: FormGroup;
  detailsobj: any = [];
  formval: any;
  submitted = false;
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  myForm(data1) {
    this.formval = data1;
    console.log(this.formval);
    this.http.post("http://localhost:3000/login", this.formval).subscribe(
      data => {
        this.detailsobj = data;
        console.log(data);
        console.log(this.detailsobj.role);
        if (this.detailsobj.role === "admin") {
          this.router.navigate(["admin", "dashboard"]);
        } else if (this.detailsobj.role === "user") {
          this.router.navigate(["user", "dashboard"]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  onSubmit() {
    this.myForm(this.loginForm.value);
    if (this.loginForm.invalid) {
      alert("invalid details ");
      this.router.navigate(["/error"]);
    } else {
      this.submitted = true;
      // this.router.navigate(["/register"]);
    }
    this.submitted = true;
  }
}

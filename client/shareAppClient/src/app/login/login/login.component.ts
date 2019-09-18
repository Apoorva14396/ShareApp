import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthService } from "../../auth.service";
import { NameService } from "../../name.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private nameService: NameService
  ) {}
  loginForm: FormGroup;
  detailsobj: any = [];
  formval: any;
  submitted = false;
  userName: any;
  username: any;
  emailName: any;
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
  }

  myForm(data1) {
    this.formval = data1;

    // console.log(this.formval);
    this.http.post("http://localhost:3000/login", this.formval).subscribe(
      data => {
        this.detailsobj = data;
        console.log(data);
        console.log(this.detailsobj.role);
        console.log(this.detailsobj.email);
        this.emailName = this.detailsobj.email;
        this.userName = this.detailsobj.name;
        this.nameService.fetchName(this.userName);
        this.nameService.fetchEmail(this.emailName);
        this.authService.isAuthenticated();
        localStorage.setItem("key", this.userName);
        localStorage.setItem("key1", this.emailName);
        localStorage.setItem("id", this.detailsobj.id);
        if (this.detailsobj.role === "admin" && this.loginForm.valid) {
          this.router.navigate(["admin", "dashboard"]);
        } else if (this.detailsobj.role === "user" && this.loginForm.valid) {
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
    // console.log(this.loginForm.value);
    this.authService.isAuthenticated();
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

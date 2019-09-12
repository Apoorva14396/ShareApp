import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isAuthenticated() {
    return localStorage.setItem("ACCESS_VALUE", "accessvalue");
  }
  login() {
    return !!localStorage.getItem("ACCESS_VALUE");
  }
  logout() {
    return localStorage.removeItem("ACCESS_VALUE");
  }
}

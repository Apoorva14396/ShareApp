import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NameService {
  name;
  email;
  fetchName(user) {
    this.name = user;
    console.log(this.name);
  }
  fetchEmail(user) {
    this.email = user;
    console.log(this.email);
  }
  constructor() {}
}

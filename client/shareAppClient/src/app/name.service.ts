import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class NameService {
  name;
  fetchName(user) {
    this.name = JSON.parse(user);
    console.log(this.name);
  }

  constructor() {}
}

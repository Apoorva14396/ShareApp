import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-receivedfiles",
  templateUrl: "./receivedfiles.component.html",
  styleUrls: ["./receivedfiles.component.css"]
})
export class ReceivedfilesComponent implements OnInit {
  imagePath: any = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("http://localhost:3001/receivedFiles").subscribe(
      data => {
        console.log(data);
        this.imagePath = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}

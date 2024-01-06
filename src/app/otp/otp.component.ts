import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  user: any = localStorage.getItem("currentUser");
  constructor() { }

  ngOnInit() {
  }

}

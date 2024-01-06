import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Driver, ResponseBody, Account } from '../_models/schemes';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: Account
  driver: Driver;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    //if (!this.user) {
    //  this.router.navigate(['/login']);
    //}

    this.userProfile();
    this.driverProfile();
  }
  logout() {
    this.authService.logout().subscribe(
      (response) => {
        localStorage.removeItem('currentUser');
        this.user = null;
        this.router.navigate(['/']);
      },
      (error) => {
        this.toastr.error('Có lỗi xảy ra. Vui lòng thử la sau!', 'Lỗi');
      }
    );
  }

  driverProfile() {
    this.vehicleService.driverProfile().toPromise().then(
      (response: ResponseBody) => {
        this.driver = response.detail;
      },
      error => {
        this.toastr.error(`Lỗi khi lấy danh sách`);
      })
  }
  userProfile() {
    this.vehicleService.userProfile().toPromise().then(
      (response: ResponseBody) => {
        this.user = response.detail;
      },
      error => {
        this.toastr.error(`Lỗi khi lấy danh sách`);
      })
  }

}

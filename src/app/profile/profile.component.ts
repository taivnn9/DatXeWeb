import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Driver, ResponseBody } from '../_models/schemes';
import { BookingStatus } from '../_models/enum';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user : any = localStorage.getItem("currentUser");
  profile: Driver;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {
    if (!this.user){
      this.router.navigate(['/login']);
    }
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
        if (response.status == 200) {
          this.profile = response.detail;
        }else {
          this.router.navigate(['/']);
        }
      },
      error => {
        this.toastr.error(`Lỗi khi lấy danh sách`);
      })
  }

}

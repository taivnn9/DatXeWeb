import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Booking, ResponseBody, Account, BookingStatus, BookingType, Address, HomeCare } from '../_models/schemes';
import { VehicleService } from '../services/vehicle.service';
import { BookingService } from '../services/booking.service';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html'
})
export class MeComponent implements OnInit {

  user: Account


  bookings: Booking[] = [];
  homecares: HomeCare[] = [];

  booking: Booking = new Booking();
  showSuccess: boolean = false;


  displayPopupValue: string = 'none'
  displayPopupTile: string = 'Chi tiết chuyến đi'



  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private bookingService: BookingService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit() {

    this.userProfile();
    this.loadAllBookingHistory()
    this.loadAllHomeCareHistory()
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

  loadAllBookingHistory() {
    this.bookingService.getConsumerBookingHistory().toPromise().then(
      (response: ResponseBody) => {
        this.bookings = response.detail;
        this.bookings.sort((a, b) => a.status - b.status);

      },
      error => {
        this.toastr.error(`Lỗi khi lấy danh sách lịch sử chuyến đi`);
      })
  }
  loadAllHomeCareHistory() {
    this.bookingService.getConsumerHomeCareHistory().toPromise().then(
      (response: ResponseBody) => {
        this.homecares = response.detail;
        this.homecares.sort((a, b) => a.status - b.status);

      },
      error => {
        this.toastr.error(`Lỗi khi lấy danh sách lịch sử chăm sóc tại nhà`);
      })
  }


  onOpenPopup(item: Booking) {
    console.log(item)
  }

  
  GetStatusText(value: number) {
    return BookingStatus[value];
  }
  GetImageUrl(imageId: string) {
    return `${environment.apiUrl}/image/${imageId}`
  }
  ParseAddress(address: Address) {
    try { return `${address.city} - ${address.district} - ${address.ward} ` }
    catch {
      return ``
    }

  }

  //GetAccountInfo(id: string, fieldName: string) {
  //  try {
  //    if (fieldName == 'all') {
  //      if (id != '') {
  //        return `${this.accounts.get(id).name} - ${this.accounts.get(id).phoneNumber}`
  //      } else {
  //        return ``
  //      }

  //    }
  //    return this.accounts.get(id)[fieldName]
  //  } catch {
  //    return ``
  //  }
  //}
  
}

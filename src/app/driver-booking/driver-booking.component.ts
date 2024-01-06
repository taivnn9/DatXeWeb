import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../services/booking.service';
import { Address, Booking, Driver, DriverStatus, ResponseBody } from '../_models/schemes';
import { BookingStatus } from '../_models/enum';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.prod';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-driver-booking',
  templateUrl: './driver-booking.component.html',
  styleUrls: ['./driver-booking.component.css'],
  providers: []
})
export class DriverBookingComponent implements OnInit {

  driver: Driver = new Driver()
  bookings: Booking[] = [];
  booking: Booking = new Booking();
  showSuccess: boolean = false;


  displayPopupValue: string = 'none'
  displayPopupTile: string = 'Chi tiết chuyến đi'

  btnActionText: string = 'Đang đón khách'
  constructor(
    private toastr: ToastrService,
    private bookingService: BookingService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.loadAllBookingHistory();
    this.driverProfile();
  }
  
  driverProfile() {
    this.vehicleService.driverProfile().toPromise().then(
      (response: ResponseBody) => {
        this.driver = response.detail;
      },
      error => {
        this.toastr.error(`Lỗi khi lấy thông tin tài xế`);
      })
  }

  loadAllBookingHistory() {
    this.bookingService.getProviderBookingHistory().toPromise().then(
      (response: ResponseBody) => {
        this.bookings = response.detail;
        this.bookings.sort((a, b) => a.status - b.status);

        },
      error => {
        this.toastr.error(`Lỗi khi lấy danh sách lịch sử chuyến đi`);
      })
  }

  onOpenPopup(item: Booking) {
    this.displayPopupValue = 'block'
    this.booking = item
  }
  onClosePopup() {
    this.displayPopupValue = 'none'
  }

  providerConfirmation(booking: any) {
    this.bookingService.providerConfirmation(booking).toPromise().then(
      (response: ResponseBody) => {
        if (response.status == 200) {
          this.toastr.success(`Nhận chuyến thành công`);
        }
      },
      error => {
        this.toastr.error(`Lỗi khi đặt chuyến`);
      })
  }

  providerAction(booking: Booking) {
    switch (booking.status) {
      case 2:
        this.providerOnWay(booking);
        break;
      case 3:
        this.providerAreServing(booking);
        break;
      case 4:
        this.finished(booking);
        break;
    }
  }

  providerOnWay(booking: any) {
    this.bookingService.providerOnWay(booking).toPromise().then(
      (response: ResponseBody) => {
        if (response.status == 200) {
          this.loadAllBookingHistory();
          this.toastr.success(`Đã chuyển trạng thái sang Đang đón khách`, `Thành công`);

          this.btnActionText= 'Đang chở khách'
        }
      },
      error => {
        this.toastr.error(`Thử lại sau`, `Thất bại`);
      })
  }

  providerAreServing(booking: any) {
    this.bookingService.providerAreServing(booking).toPromise().then(
      (response: ResponseBody) => {
        if (response.status == 200) {
          this.loadAllBookingHistory();
          this.toastr.success(`Đã chuyển trạng thái sang Đang trở khách`, `Thành công`);

          this.btnActionText = 'Khách xuống xe/ Hoàn thành'
        }
      },
      error => {
        this.toastr.error(`Thử lại sau`, `Thất bại`);
      })
  }

  finished(booking: any) {
    this.bookingService.finished(booking).toPromise().then(
      (response: ResponseBody) => {
        if (response.status == 200) {
          this.loadAllBookingHistory();
          this.toastr.success(`Hoàn tất chuyến đi thành công`, `Thành công`);
          this.onClosePopup()
          this.btnActionText = 'Đang đón khách'
        }
      },
      error => {
        this.toastr.error(`Thử lại sau`, `Thất bại`);
      })
  }



  GetStatusText(value: number) {
    return BookingStatus[value];
  }
  GetDriverStatusText(value: number) {
    return DriverStatus[value];
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

}

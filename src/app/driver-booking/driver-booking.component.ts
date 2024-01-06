import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../services/booking.service';
import { Booking, ResponseBody } from '../_models/schemes';
import { BookingStatus } from '../_models/enum';

@Component({
  selector: 'app-driver-booking',
  templateUrl: './driver-booking.component.html',
  styleUrls: ['./driver-booking.component.css'],
  providers: []
})
export class DriverBookingComponent implements OnInit {
  user : any = localStorage.getItem("currentUser");
  availableBookings: Booking[];
  historyBookings: Booking[];
  listBookingInTrip: Booking[]
  selectedBooking: Booking;
  showSuccess: boolean = false;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private bookingService: BookingService
  ) { }

  ngOnInit(): void {
    //this.loadAllBookingAvailable();
    this.loadAllBookingHistory();
  }

  logout() {
    this.authService.logout().subscribe(
      (response) => {
        localStorage.removeItem('currentUser');
        this.user = null;
      },
      (error) => {
        this.toastr.error('Có lỗi xảy ra khi tải dữ liệu', 'Lỗi');
      }
    );
  }

  loadAllBookingAvailable() {
    this.bookingService.getAllBookingAvailable().toPromise().then(
      (response: ResponseBody) => {
        this.availableBookings = response.detail;
      },
      error => {
        this.toastr.error(`Lỗi khi lấy danh sách`);
      })
  }

  loadAllBookingHistory() {
    this.bookingService.getAllBookingHistory().toPromise().then(
      (response: ResponseBody) => {
        this.historyBookings = response.detail;
        this.historyBookings.sort((a, b) => a.status - b.status);
        this.listBookingInTrip = this.historyBookings.filter(obj => obj.status == BookingStatus.ProviderConfirmation || obj.status == BookingStatus.ProviderOnWay || obj.status == BookingStatus.ProviderAreServing);
      },
      error => {
        this.toastr.error(`Lỗi khi lấy danh sách`);
      })
  }

  showBookingDetails(booking: any) {
    this.selectedBooking = booking; // Lưu booking được chọn
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

  providerOnWay(booking: any) {
    this.bookingService.providerOnWay(booking).toPromise().then(
      (response: ResponseBody) => {
        if (response.status == 200) {
          this.loadAllBookingHistory();
          this.toastr.success(`Chuyển trạng thái`, `Thành công`);
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
          this.toastr.success(`Chuyển trạng thái`, `Thành công`);
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
          this.toastr.success(`Chuyển trạng thái`, `Thành công`);
        }
      },
      error => {
        this.toastr.error(`Thử lại sau`, `Thất bại`);
      })
  }

}

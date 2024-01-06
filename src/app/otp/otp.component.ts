import { Component, OnInit } from '@angular/core';
import { Booking, BookingType, BookingStatus, Address, Vehicle, Equipment, Medic, ResponseBody } from '../_models/schemes';

import { ToastrService } from 'ngx-toastr';
//import { environment } from '@environments/environment';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {
  loading = false;
  currentBooking: Booking = new Booking();

  vehicles: Vehicle[];
  equipments: Equipment[];
  medic: Medic[]

  constructor(
    private bookingService: BookingService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllVehicleAvailable()
    this.getAllEquipmentAvailable()
    this.getAllMedicAvailable()

  }

  getAllVehicleAvailable() {
    this.bookingService.getAllVehicleAvailable().toPromise().then(
      (response: ResponseBody) => {
        this.vehicles = response.detail;
        //this.historyBookings.sort((a, b) => a.status - b.status);
        //this.listBookingInTrip = this.historyBookings.filter(obj => obj.status == BookingStatus.ProviderConfirmation || obj.status == BookingStatus.ProviderOnWay || obj.status == BookingStatus.ProviderAreServing);
      },
      error => {
        this.toastr.error(`Lỗi khi lấy danh sách phương tiện`);
      })
  }
  getAllEquipmentAvailable() {
    this.bookingService.getAllEquipmentAvailable().toPromise().then(
      (response: ResponseBody) => {
        this.equipments = response.detail;
        //this.historyBookings.sort((a, b) => a.status - b.status);
        //this.listBookingInTrip = this.historyBookings.filter(obj => obj.status == BookingStatus.ProviderConfirmation || obj.status == BookingStatus.ProviderOnWay || obj.status == BookingStatus.ProviderAreServing);
      },
      error => {
        this.toastr.error(`Lỗi khi lấy danh sách thiết bị`);
      })
  }
  getAllMedicAvailable() {
    this.bookingService.getAllMedicAvailable().toPromise().then(
      (response: ResponseBody) => {
        this.medic = response.detail;
        //this.historyBookings.sort((a, b) => a.status - b.status);
        //this.listBookingInTrip = this.historyBookings.filter(obj => obj.status == BookingStatus.ProviderConfirmation || obj.status == BookingStatus.ProviderOnWay || obj.status == BookingStatus.ProviderAreServing);
      },
      error => {
        this.toastr.error(`Lỗi khi lấy danh sách nhân viên y tế`);
      })
  }
  GetTypeList() {
    let map = this.bookingService.enumToMap(BookingType);
    return map
  }
  GetStatusList() {
    let map = this.bookingService.enumToMap(BookingStatus);
    return map
  }
  GetStatusText(value: number) {
    return BookingStatus[value];
  }
  GetImageUrl(imageId: string) {
    //return `${environment.apiUrl_Prod}/image/${imageId}`
  }
  ParseAddress(address: Address) {
    try { return `${address.street} ${address.city} ${address.state} ` }
    catch {
      return ``
    }

  }
  
  ClickItemAction(event: any, field: string, id: string,) {

    if (event.target.checked) {
      // Pushing the object into array
      this.currentBooking[field].push(id);

    } else {
      //let removeIndex = this.currentBooking.equipmentIds.findIndex(itm => itm.order === data);
      let removeIndex = this.currentBooking[field].indexOf(id, 0);

      if (removeIndex !== -1)
        this.currentBooking[field].splice(removeIndex, 1);
    }
  }

  SubmitBooking() {
    console.log(this.currentBooking)
  }
}

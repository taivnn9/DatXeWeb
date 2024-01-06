import { Component, OnInit } from '@angular/core';
import { Booking, BookingType, BookingStatus, Address, Vehicle, Equipment, Medic, ResponseBody, TinhThanh, PhuongXa, QuanHuyen } from '../_models/schemes';

import { ToastrService } from 'ngx-toastr';
//import { environment } from '@environments/environment';
import { BookingService } from '../services/booking.service';
import { environment } from '../../environments/environment.prod';

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
  medics: Medic[]

  diaGioiHanhChinhVN: any

  selectedCityFrom: any = null
  selectedDistrictFrom: any = null
  selectedWardFrom:  any = null

  selectedCityTo: any = null
  selectedDistrictTo: any = null
  selectedWardTo: any = null




  displayPopupValue: string = 'none'
  displayPopupTile: string = 'none'
  displayValue: any


  constructor(
    private bookingService: BookingService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllVehicleAvailable()
    this.getAllEquipmentAvailable()
    this.getAllMedicAvailable()
    this.DiaGioiHanhChinhVN()
  }
  onOpenPopup(type: string, selectedValue: any) {
    this.displayPopupValue = 'block'
    if (type == 'vehicle') {
      this.displayValue = selectedValue.vehicleImages
      this.displayPopupTile = 'phương tiện'
    } else {
      this.displayValue = selectedValue.equipmentImages
      this.displayPopupTile = 'trang thiết bị'
    }
    
  }
  onClosePopup() {
      this.displayPopupValue = 'none'
  }
  
  GetImageUrl(imageId: string) {
    return `${environment.apiUrl}/image/${imageId}`
  }
  DiaGioiHanhChinhVN() {
    this.bookingService.DiaGioiHanhChinhVN().toPromise().then(
      (response) => {
        this.diaGioiHanhChinhVN = response;
      })
  }
  onChange(type: string) {
    if (type == 'from') {

      console.log(this.selectedCityFrom)
      this.selectedDistrictFrom = null
      this.selectedWardFrom = null
    } else {

      console.log(this.selectedCityTo)
      this.selectedDistrictTo = null
      this.selectedWardTo = null
    }
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
        this.medics = response.detail;
        //this.historyBookings.sort((a, b) => a.status - b.status);
        //this.listBookingInTrip = this.historyBookings.filter(obj => obj.status == BookingStatus.ProviderConfirmation || obj.status == BookingStatus.ProviderOnWay || obj.status == BookingStatus.ProviderAreServing);
      },
      error => {
        this.toastr.error(`Lỗi khi lấy danh sách nhân viên y tế`);
      })
  }

  //onChange(id: string, source: string, field: string) {

  //  if (field == 'state') {
  //    this.currentBooking[source][field] = this.diaGioiHanhChinhVN.find(x => x.Id == id).Name

      
  //  } else if (field == 'city') {

  //    this.currentBooking[source][field] = this.quanHuyenMap.get(source).find(x => x.MA_QUAN == id).TEN_QUAN
  //    // update Quan Huyen map
  //    this.bookingService.LoadDMPhuongXa(id).toPromise().then(
  //      (response: any) => {
  //        this.phuongXaMap.set(source, response)
  //      },
  //      error => {
  //        this.toastr.error(`Lỗi khi lấy danh sách phường xã theo quận huyện ${id}`);
  //      })
  //  } else if (field == 'street') {
  //    this.currentBooking[source][field] = this.phuongXaMap.get(source).find(x => x.MA_XA == id).TEN_DAY_DU
  //  }
  //}
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

  GetItemsFromMap(mapName) {

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

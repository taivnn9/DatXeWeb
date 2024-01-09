import { Component, OnInit } from '@angular/core';
import { Booking, BookingType, BookingStatus, Address, Vehicle, Equipment, Medic, ResponseBody, TinhThanh, PhuongXa, QuanHuyen } from '../_models/schemes';

import { ToastrService } from 'ngx-toastr';
//import { environment } from '@environments/environment';
import { BookingService } from '../services/booking.service';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-booking',
  templateUrl: './vehicle-booking.component.html'
})
export class VehicleBookingComponent implements OnInit {
  loading = false;
  currentBooking: Booking = new Booking();
  imageObject: any[] = [];
  vehicles: Vehicle[];
  equipments: Equipment[];
  medics: Medic[]

  diaGioiHanhChinhVN: any

  selectedCityFrom: any = null
  selectedDistrictFrom: any = null
  selectedWardFrom: any = null

  selectedCityTo: any = null
  selectedDistrictTo: any = null
  selectedWardTo: any = null

  displayButtonTitle: string = 'Ước tính chi phí'


  displayPopupValue: string = 'none'
  displayPopupTile: string = 'none'


  constructor(
    private router: Router,
    private bookingService: BookingService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllVehicleAvailable()
    this.getAllEquipmentAvailable()
    this.getAllMedicAvailable()
    this.DiaGioiHanhChinhVN()
  }
  onOpenPopup(type: string, selectedValue: any) {
    this.imageObject = []
    

    if (type == 'vehicle') {
      this.openVehicleImages(selectedValue)
    } else {
      this.openEquipmentImages(selectedValue)
    }

    this.displayPopupValue = 'block'
  }
  openVehicleImages(vehicle: Vehicle) {
    vehicle.vehicleImages.forEach(x => {
      const imageUrl = this.GetImageUrl(x)
      this.imageObject.push({
        image: imageUrl,
        thumbImage: imageUrl,
        title: imageUrl
      })
    })
    this.displayPopupTile = `phương tiện ${vehicle.name}`
  }

  openEquipmentImages(equipment: Equipment) {
    equipment.equipmentImages.forEach(x => {
      const imageUrl = this.GetImageUrl(x)
      this.imageObject.push({
        image: imageUrl,
        thumbImage: imageUrl,
        title: imageUrl
      })
      this.imageObject.push({
        image: imageUrl,
        thumbImage: imageUrl,
        title: imageUrl
      })
      this.imageObject.push({
        image: imageUrl,
        thumbImage: imageUrl,
        title: imageUrl
      })
      this.imageObject.push({
        image: imageUrl,
        thumbImage: imageUrl,
        title: imageUrl
      })
      this.imageObject.push({
        image: imageUrl,
        thumbImage: imageUrl,
        title: imageUrl
      })
    })
    this.displayPopupTile = `trang thiết bị ${equipment.name}`
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
        this.equipments = response.detail.filter(x => x.unit == 'Theo xe');
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
        this.medics = response.detail.filter(x => x.unit == 'Theo xe');
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
    if (this.currentBooking.id == undefined || this.currentBooking.id == '') {
      this.RegistrationBooking()
    } else if (this.currentBooking.status == 0) {
      this.ConfimationBooking()
    } else if (this.currentBooking.status == 1) {
      // goto manage history
      this.router.navigate(['/profile']);
    }
  }
  ConfimationBooking() {
    this.bookingService.consumerConfirmation(this.currentBooking).toPromise().then(
      (response: ResponseBody) => {
        this.currentBooking = response.detail;
        this.loading = false
        this.toastr.success(`Đặt dịch vụ thành công, tổng đài viên sẽ liên hệ đến quý khách sớm nhất`);
        this.displayButtonTitle = 'Quản lý dịch vụ đang đặt'
      },
      error => {
        this.toastr.error(`Có lỗi khi xác nhận đặt dịch vụ`);
        this.loading = false
      })
  }
  RegistrationBooking() {
    this.loading = true
    console.log(this.currentBooking)
    let exceptions = []

    if (this.selectedCityFrom == null || this.selectedCityTo == null) {
      exceptions.push("Tỉnh/thành phố đang để trống")
    }
    if (this.selectedDistrictFrom == null || this.selectedDistrictTo == null) {
      exceptions.push("Quận/huyện đang để trống")
    }
    if (this.selectedWardFrom == null || this.selectedWardTo == null) {
      exceptions.push("Xã/phường đang để trống")
    }

    if (this.currentBooking.carId == "") {
      exceptions.push("Loại phương tiện đang để trống")
    }
    if (this.currentBooking.startTime == "") {
      exceptions.push("Ngày đặt xe đang để trống")
    }

    if (exceptions.length > 0) {
      this.toastr.error(`Có lỗi nhập liệu, vui lòng điền các trường bắt buộc`);
      exceptions.forEach(err => {
        this.toastr.error(err);
      })
      this.loading = false
    } else {
      this.currentBooking.fromLocation.city = this.selectedCityFrom.Name
      this.currentBooking.fromLocation.district = this.selectedDistrictFrom.Name
      this.currentBooking.fromLocation.ward = this.selectedWardFrom.Name

      this.currentBooking.toLocation.city = this.selectedCityTo.Name
      this.currentBooking.toLocation.district = this.selectedDistrictTo.Name
      this.currentBooking.toLocation.ward = this.selectedWardTo.Name

      this.currentBooking.endTime = "2025-11-11"


      this.bookingService.consumerRegistration(this.currentBooking).toPromise().then(
        (response: ResponseBody) => {
          this.currentBooking = response.detail;
          this.loading = false
          this.displayButtonTitle = 'Xác nhận đặt dịch vụ'
          this.toastr.success(`Đăng ký đặt dịch vụ thành công, vui lòng xác nhận đặt dịch vụ`);
        },
        error => {
          this.toastr.error(`Có lỗi khi đặt dịch vụ`);
          this.loading = false
        })

      console.log(this.currentBooking)
    }
  }
  getYesterdayDate(): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const year = yesterday.getFullYear();
    const month = (yesterday.getMonth() + 1).toString().padStart(2, '0');
    const day = yesterday.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  isActiveTab: string = 'Paris'

  openCity(id: string) {
    this.isActiveTab = id
    console.log(this.isActiveTab)
  }

  getStyle(id: string) {
    'display:' + ( this.isActiveTab === id ? 'block' : 'none')
  }
}

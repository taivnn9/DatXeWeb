import { Component, OnInit } from '@angular/core';
import { Booking, BookingType, BookingStatus, Address, Vehicle, Equipment, Medic, ResponseBody, TinhThanh, PhuongXa, QuanHuyen, HomeCare, RentalDetail, Image } from '../_models/schemes';

import { ToastrService } from 'ngx-toastr';
//import { environment } from '@environments/environment';
import { BookingService } from '../services/booking.service';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homecare-booking',
  templateUrl: './homecare-booking.component.html',
  styleUrls: ['./homecare-booking.component.css']
})
export class HomeCareBookingComponent implements OnInit {
  loading = false;
  currentBooking: HomeCare = new HomeCare();

  diaGioiHanhChinhVN: any = [];
  equipments: Equipment[] = [];
  equipmentsDaily: Equipment[] = [];
  medics: Medic[] = [];
  imageObject: any[] = [];

  selectedEquipments: RentalDetail[] = [];
  selectedEquipmentsDaily: RentalDetail[] = [];
  selectedMedics: RentalDetail[] = [];

  selectedCity: any = null
  selectedDistrict: any = null
  selectedWard: any = null
  selectedStreet: string = null


  displayButtonTitle: string = 'Ước tính chi phí'


  displayPopupValue: string = 'none'
  displayPopupTile: string = 'none'
  displayValue: any


  constructor(
    private router: Router,
    private bookingService: BookingService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.getAllEquipmentAvailable()
    this.getAllMedicAvailable()
    this.DiaGioiHanhChinhVN()
  }
  onOpenPopup(type: string, selectedValue: Equipment) {


    this.displayPopupValue = 'block'
    this.imageObject = []

    this.displayValue = selectedValue.equipmentImages
    selectedValue.equipmentImages.forEach(x => {
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
    })

    this.displayPopupTile = `trang thiết bị ${selectedValue.name}`


  }
  onClosePopup() {
    this.displayPopupValue = 'none'
  }
  GetFirstImage(arr: string[]) {
    if (arr.length > 0) {
      return this.GetImageUrl(arr[0])
    } else {
      return "https://source.unsplash.com/250x250?girl"
    }
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
  onChange() {

    console.log(this.selectedCity)
    this.selectedDistrict = null
    this.selectedWard = null

  }

  getAllEquipmentAvailable() {
    this.bookingService.getAllEquipmentAvailable().toPromise().then(
      (response: ResponseBody) => {
        const all = response.detail;
        this.equipmentsDaily = all.filter(x => x.unit == 'Theo ngày')
        this.equipmentsDaily.forEach(x => {
          this.selectedEquipmentsDaily.push(
            new RentalDetail(x.id)
          )
        })

        this.equipments = all.filter(x => x.unit != 'Theo ngày' && x.unit != 'Theo xe')
        this.equipments.forEach(x => {
          this.selectedEquipments.push(
            new RentalDetail(x.id)
          )
        })

      },
      error => {
        this.toastr.error(`Lỗi khi lấy danh sách thiết bị`);
      })
  }
  getAllMedicAvailable() {
    this.bookingService.getAllMedicAvailable().toPromise().then(
      (response: ResponseBody) => {
        this.medics = response.detail.filter(x => x.unit != 'Theo xe');
        this.medics.forEach(x => {
          this.selectedMedics.push(
            new RentalDetail(x.id)
          )
        })
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
    this.bookingService.consumerConfirmationHomeCare(this.currentBooking).toPromise().then(
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

    if (this.selectedCity == null) {
      exceptions.push("Tỉnh/thành phố đang để trống")
    }
    if (this.selectedDistrict == null) {
      exceptions.push("Quận/huyện đang để trống")
    }
    if (this.selectedWard == null) {
      exceptions.push("Xã/phường đang để trống")
    }
    if (this.selectedStreet == null) {
      exceptions.push("Số nhà/tên đường đang để trống")
    }

    if (this.currentBooking.startTime == "") {
      exceptions.push("Ngày đặt đang để trống")
    }

    if (exceptions.length > 0) {
      this.toastr.error(`Có lỗi nhập liệu, vui lòng điền các trường bắt buộc`);
      exceptions.forEach(err => {
        this.toastr.error(err);
      })
      this.loading = false
    } else {
      this.currentBooking.location.city = this.selectedCity.Name
      this.currentBooking.location.district = this.selectedDistrict.Name
      this.currentBooking.location.ward = this.selectedWard.Name
      this.currentBooking.location.street = this.selectedStreet

      this.currentBooking.dailyEquipmentIds = this.selectedEquipmentsDaily.filter(x => x.count > 0)
      this.currentBooking.equipmentIds = this.selectedEquipments.filter(x => x.count > 0)
      this.currentBooking.dailyMedicIds = this.selectedMedics.filter(x => x.count > 0)

      this.bookingService.consumerRegistrationHomeCare(this.currentBooking).toPromise().then(
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

}

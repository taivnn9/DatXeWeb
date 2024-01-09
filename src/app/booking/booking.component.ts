import { Component, OnInit } from '@angular/core';
import { Booking, BookingType, BookingStatus, Address, Vehicle, Equipment, Medic, ResponseBody, TinhThanh, PhuongXa, QuanHuyen } from '../_models/schemes';

import { ToastrService } from 'ngx-toastr';
//import { environment } from '@environments/environment';
import { BookingService } from '../services/booking.service';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  loading = false;
  activeTab: string = ''

  constructor(
    private router: Router,
    private bookingService: BookingService,
    private toastr: ToastrService
  ) {
    this.activeTab = router.url.includes('homecare-booking') ? 'homecare-booking' : 'vehicle-booking'
  }

  ngOnInit() {
  }

  
}

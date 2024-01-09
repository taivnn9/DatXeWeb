import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { any } from 'codelyzer/util/function';
import { HomeCare, ResponseBody } from '../_models/schemes';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) { }

  DiaGioiHanhChinhVN() {
    return this.http.get(`https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json`); 
  }



  getAllVehicleAvailable() {
    return this.http.get(`${environment.apiUrl}/vehicles`);
  }

  getAllEquipmentAvailable() {
    return this.http.get(`${environment.apiUrl}/equipments`);
  }
  getAllMedicAvailable() {
    return this.http.get(`${environment.apiUrl}/medics`);
  }

  getAllBookingAvailable() {
    return this.http.get(`${environment.apiUrl}/booking/provider/avaiable`);
  }

  getConsumerBookingHistory() {
    return this.http.get(`${environment.apiUrl}/booking/consumer/history`);
  }
  getProviderBookingHistory() {
    return this.http.get(`${environment.apiUrl}/booking/provider/history`);
  }

  consumerRegistration(booking: any) {
    return this.http.post<any>(`${environment.apiUrl}/booking/consumer/registration`, booking)
      .pipe(map(res => {
        return res;
      }));
  }

  consumerConfirmation(booking: any) {
    return this.http.post<any>(`${environment.apiUrl}/booking/consumer/confirmation?id=${booking.id}`, {})
      .pipe(map(res => {
        return res;
      }));
  }

  providerConfirmation(booking: any) {
    return this.http.post<any>(`${environment.apiUrl}/booking/provider/confirmation?id=${booking.id}`, {})
      .pipe(map(res => {
        return res;
      }));
  }

  providerOnWay(booking: any) {
    return this.http.post<any>(`${environment.apiUrl}/booking/provider/onway?id=${booking.id}`, {})
      .pipe(map(res => {
        return res;
      }));
  }

  providerAreServing(booking: any) {
    return this.http.post<any>(`${environment.apiUrl}/booking/provider/serving?id=${booking.id}`, {})
      .pipe(map(res => {
        return res;
      }));
  }

  finished(booking: any) {
    return this.http.post<any>(`${environment.apiUrl}/booking/provider/finished?id=${booking.id}`, {})
      .pipe(map(res => {
        return res;
      }));
  }


  enumToMap(enumeration: any) {
    let converted = new Array()

    Object.keys(enumeration).map(key => {
      if (typeof enumeration[key] === "number")
        converted.push({
          id: enumeration[key],
          name: key,
        });
    });

    return converted
  }


  getConsumerHomeCareHistory() {
    return this.http.get(`${environment.apiUrl}/homecare/consumer/history`);
  }
  consumerRegistrationHomeCare(homecare: HomeCare) {
    return this.http.post(`${environment.apiUrl}/homecare/consumer/registration`, homecare)
      .pipe(map(res => {
        return res;
      }));
  }

  consumerConfirmationHomeCare(homecare: HomeCare) {
    return this.http.post(`${environment.apiUrl}/homecare/consumer/confirmation?id=${homecare.id}`, {})
      .pipe(map(res => {
        return res;
      }));
  }

}

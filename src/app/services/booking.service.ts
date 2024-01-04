import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { any } from 'codelyzer/util/function';
import { ResponseBody } from '../_models/schemes';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) { }

  getAllBookingAvailable() {
    return this.http.get(`${environment.apiUrl}/booking/provider/avaiable`);
  }

  getAllBookingHistory() {
    return this.http.get(`${environment.apiUrl}/booking/provider/history`);
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

}

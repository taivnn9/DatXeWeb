import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  constructor(private http: HttpClient) { }

  vehicle(vehicle: any) {
    return this.http.post<any>(`${environment.apiUrl}/vehicle`, vehicle)
      .pipe(map(res => {
        return res;
      }));
  }

  becomeDriver(vehicle: any) {
    return this.http.post<any>(`${environment.apiUrl}/become-driver`, vehicle)
      .pipe(map(res => {
        return res;
      }));
  }

  uploadFile(formData: any) {
    return this.http.post<any>(`${environment.apiUrl}/image`, formData).pipe(
      map(res => {
        return res;
      })
    );
  }

  driverProfile() {
    return this.http.get(`${environment.apiUrl}/driver-profile`);
  }
  userProfile() {
    return this.http.get(`${environment.apiUrl}/me`);
  }
}

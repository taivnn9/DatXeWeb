import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  constructor(private http: HttpClient) { }

  vehicle(vehicle: any) {
    const token: any = localStorage.getItem("currentUser");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    const options = {
      headers: headers
    };
    return this.http.post<any>(`${environment.apiUrl}/vehicle`, vehicle, options)
      .pipe(map(res => {
        return res;
      }));
  }

  becomeDriver(vehicle: any) {
    const token: any = localStorage.getItem("currentUser");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    const options = {
      headers: headers
    };
    return this.http.post<any>(`${environment.apiUrl}/become-driver`, vehicle, options)
      .pipe(map(res => {
        return res;
      }));
  }

  uploadFile(formData: any) {
    const token: any = localStorage.getItem("currentUser");
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
    });

    const options = {
      headers: headers
    };
    return this.http.post<any>(`${environment.apiUrl}/image`, formData, options).pipe(
      map(res => {
        return res;
      })
    );
  }
}

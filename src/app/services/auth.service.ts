import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { any } from 'codelyzer/util/function';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post<any>(`${environment.apiUrl}/login`, { "phoneNumber": user.phoneNumber, "secret": user.secret, "otp": user.otp})
      .pipe(map(res => {
        console.log(res.detail);
        if (res && res.detail) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', res.detail);
          // this.currentUserSubject.next(res);
        }

        return res;
      }));
  }

  logout() {
    const token: any = localStorage.getItem("currentUser");
    console.log(token);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    });

    const options = {
      headers: headers
    };
    return this.http.post(`${environment.apiUrl}/logout`, {}, options)
      .pipe(map(res => {
        return res;
      }));
  }

  getOtp(user: any) {
    return this.http.post<any>(`${environment.apiUrl}/get-otp`, { "phoneNumber": user.phoneNumber, "secret": user.secret, "otp": user.otp})
      .pipe(map(res => {
        return res;
      }));
  }

  register(user: any) {
    return this.http.post<any>(`${environment.apiUrl}/register`, { "phoneNumber": user.phoneNumber, "secret": user.secret, "otp": user.otp})
      .pipe(map(res => {
        return res;
      }));
  }

  updatePw(user: any) {
    return this.http.post<any>(`${environment.apiUrl}/update-pw`, { "phoneNumber": user.phoneNumber, "secret": user.secret, "otp": user.otp})
      .pipe(map(res => {
        return res;
      }));
  }

  public get currentAccountValue(): any {
    return localStorage.getItem("currentUser");
  }

}

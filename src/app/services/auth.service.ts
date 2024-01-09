import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  getToken() {
    const token = localStorage.getItem("currentUser");
    let helper = new JwtHelperService()
    if (token == null || helper.isTokenExpired(token)) {
      return null 
    } else {
      return token
    }
    
  }
  setToken(token: string) {
    localStorage.setItem('currentUser', token);
  }
  removeToken() {
    localStorage.removeItem('currentUser')
  }
  login(user: any) {
    return this.http.post<any>(`${environment.apiUrl}/login`, { "phoneNumber": user.phoneNumber, "secret": user.secret, "otp": user.otp})
      .pipe(map(res => {

        if (res && res.detail) {
          this.setToken(res.detail)
        }

        return res;
      }));
  }

  logout() {
    this.removeToken();
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



}

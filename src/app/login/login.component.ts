import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from '../services/auth.service';
import { FormBuilder} from '@angular/forms';
import { ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  phoneNumber: any;
  formGroup: FormGroup;
  resetPassword: boolean = false;
  register: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.formGroup = formBuilder.group({
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{10}")]),
      secret: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      otp: new FormControl(null)
    });
  }

  ngOnInit() {
  }

  registerAcount() {
    if (this.formGroup.valid) {
      const user: any = {
        phoneNumber: this.formGroup.value.phoneNumber,
        secret: this.formGroup.value.secret,
        otp: this.formGroup.value.otp
      };
      this.authService.register(user).subscribe(
        (response) => {
          if(response.status == 200) {
            this.register = false;
            this.toastr.success('Thành công', 'Đăng ký');
          }
        },
          (error) => {
            this.toastr.error('Đăng ký thất bại', 'Đăng ký');
        })
    }
  }

  login() {
    if (this.formGroup.valid) {
      const user: any = {
        phoneNumber: this.formGroup.value.phoneNumber,
        secret: this.formGroup.value.secret,
        otp: this.formGroup.value.otp ? this.formGroup.value.otp : "string"
      };
      this.authService.login(user).subscribe(
        (response) => {
          if(response.status == 200) {
            this.router.navigate(['/']);
          }
        },
        (error) => {
          this.toastr.error('Tài khoản hoặc mật khẩu không chính xác', 'Đăng nhập');
        }
      );
    }
  }

  getOtp() {
    const user: any = {
      phoneNumber: this.formGroup.value.phoneNumber,
      secret: "strings",
      otp: "string"
    };
    this.authService.getOtp(user).subscribe(res => {
      const response: any = res;
      if (response.status == 200) {
        this.formGroup.get("otp").setValue(response.detail.content);
        this.toastr.success('Thành công', 'Lấy OTP');
      }else {
        this.toastr.error('Thất bại', 'Lấy OTP');
      }
    })
  }

  changeRegister() {
    this.register = true;
    this.resetPassword = false;
    // this.formGroup.get('otp').valueChanges.subscribe((value) => {
    //   if (this.register) {
    //     this.formGroup.get('otp').setValidators([Validators.required]);
    //   } else {
    //     this.formGroup.get('otp').clearValidators();
    //   }
    //   this.formGroup.get('otp').updateValueAndValidity();
    // });
  }

  changeForgotPassword() {
    this.resetPassword = true;
    this.register = false;
  }
  forgotPassword() {
    const user: any = {
      phoneNumber: this.formGroup.value.phoneNumber,
      secret: this.formGroup.value.secret,
      otp: this.formGroup.value.otp
    };
    this.authService.updatePw(user).subscribe(res => {
      const response: any = res;
      if (response.status == 200) {
        this.resetPassword = false;
        this.toastr.success('Thành công', 'Đổi mật khẩu');
      }else {
        this.toastr.error('Thất bại', 'Đổi mật khẩu');
      }
    })
  }
}

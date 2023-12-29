import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user : any = localStorage.getItem("currentUser");
  formGroup: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.formGroup = formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      plate: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      email: new FormControl(null),
      class: new FormControl(null),
      typeOwner: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit() {
  }
  logout() {
    this.authService.logout().subscribe(
      (response) => {
        localStorage.removeItem('currentUser');
        this.user = null;
      },
      (error) => {
        this.toastr.error('Có lỗi xảy ra khi tải dữ liệu', 'Lỗi');
      }
    );
  }

}

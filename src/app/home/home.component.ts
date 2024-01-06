import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthService]
})
export class HomeComponent implements OnInit {
  user: any = localStorage.getItem("currentUser");
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  logout() {
    this.authService.logout().subscribe(
      (response) => {
        localStorage.removeItem('currentUser');
        this.user = null;
        this.router.navigate(['/'])
      },
      (error) => {
        this.toastr.error('Có lỗi xảy ra khi tải dữ liệu', 'Lỗi');
      }
    );
  }
  login() {
    this.router.navigate(['/login'])
  }

}

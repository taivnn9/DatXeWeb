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
  user: string = null;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.user = this.authService.getToken()
  }

  ngOnInit() {
    
  }
  logout() {
    this.authService.removeToken();
    this.user = null;
    this.toastr.success('Đăng xuất thành công');
    location.reload()
  }
  login() {
    this.router.navigate(['/login'])
  }

}

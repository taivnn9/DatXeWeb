import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { ToastrService} from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [AuthService]
})
export class HeaderComponent implements OnInit {

  user : any = localStorage.getItem("currentUser");
  constructor(
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) {
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

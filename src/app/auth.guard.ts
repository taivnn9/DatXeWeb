import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from './services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authenticationService.currentAccountValue;
    if (currentUser == null) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
    // else {
    //
    //   // check if route is restricted by role
    //   if (route.data.roles && route.data.roles.indexOf(currentUser.roles) === -1) {
    //     // role not authorised so redirect to home page
    //     this.router.navigate(['/']);
    //     return false;
    //   }

      // authorised so return true
      return true;
    // }


  }
}

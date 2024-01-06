import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { OtpComponent } from './otp/otp.component';
import { DriverBookingComponent } from './driver-booking/driver-booking.component';
import { AuthGuard } from './auth.guard';
import { MeComponent } from './profile/me.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'become-driver', component: RegisterComponent, canActivate: [AuthGuard] },
          { path: 'driver', component: DriverBookingComponent, canActivate: [AuthGuard] },
          { path: 'me', component: MeComponent, canActivate: [AuthGuard] },
          { path: '', component: MeComponent, canActivate: [AuthGuard] }
        ]
      },
      
      { path: '', component: OtpComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

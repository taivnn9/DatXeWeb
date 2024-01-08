import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { DriverComponent } from './profile/driver.component';
import { AuthGuard } from './auth.guard';
import { MeComponent } from './profile/me.component';
import { VehicleBookingComponent } from './booking/vehicle-booking.component';
import { HomeCareBookingComponent } from './booking/homecare-booking.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        children: [
          { path: 'become-driver', component: RegisterComponent, canActivate: [AuthGuard] },
          { path: 'driver', component: DriverComponent, canActivate: [AuthGuard] },
          { path: 'me', component: MeComponent, canActivate: [AuthGuard] },
          { path: '', component: MeComponent, canActivate: [AuthGuard] }
        ]
      },
      
      {
        path: '', component: BookingComponent, children: [
          { path: '', component: VehicleBookingComponent },
          { path: 'vehicle-booking', component: VehicleBookingComponent },
          { path: 'homecare-booking', component: HomeCareBookingComponent },
        ]
      }
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

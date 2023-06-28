import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddmovieComponent } from './addmovie/addmovie.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminroleGuard } from './adminrole.guard';
import { AuthGuard } from './auth.guard';
import { CustomerroleGuard } from './customerrole.guard';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutGuard } from './logout.guard';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { RegistrationComponent } from './registration/registration.component';
import { ResetpwdComponent } from './resetpwd/resetpwd.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { ViewmoviesComponent } from './viewmovies/viewmovies.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:"login",component:LoginComponent},
  {path:"logout",component:LoginComponent,canActivate:[LogoutGuard]},
  {path:"registerUser",component:RegistrationComponent},
  {path:"adminhome",component:AdminhomeComponent,canActivate:[AuthGuard,AdminroleGuard]},
  {path:"userhome",component:UserhomeComponent,canActivate:[AuthGuard,CustomerroleGuard]},
  {path:"forgotpwd",component:ForgotpwdComponent},
  {path:'resetpwd/:id',component:ResetpwdComponent},
  {path:'viewmovies',component:ViewmoviesComponent,canActivate:[AuthGuard]},
  {path:'viewTickets/:id',component:ViewTicketsComponent,canActivate:[AuthGuard,AdminroleGuard]},
  {path:'addmovie',component:AddmovieComponent,canActivate:[AuthGuard,AdminroleGuard]},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'profile',component:MyprofileComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

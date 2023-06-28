import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerroleGuard implements CanActivate {
  constructor(private authService: UserService,private router:Router) { }
  canActivate(){
      if(this.authService.hasRoleUser()){
        return true;
      }else{
        alert("Not Allowed. Only For User");
        //this.router.navigate(['/home']);  
        return false;
      }
  }

}

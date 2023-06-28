import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminroleGuard implements CanActivate {
  constructor(private authService: UserService,private router:Router) { }
  uri=this.router.url;
  canActivate(){    
   if(this.authService.hasRoleAdmin()){
      return true;
    }else{    
       alert("Not Allowed. Only For Admin");
       //this.router.navigate(['/home']);  
      return false;
    }
   
  }
  
}


   
    /*  return this.authService.hasroleAdminInPub$.pipe(
        tap(hasRoleAdmin=>{
          if(!hasRoleAdmin){
            this.router.navigate(['uri']);
          }
        })
      );
  }
  
}*/

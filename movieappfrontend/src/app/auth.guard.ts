import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: UserService,private router:Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
       return this.authService.isLoggedInPub$.pipe(
        tap(isLoggedIn =>{
          if(!isLoggedIn){
            this.router.navigate(['/login']);
            }
            return isLoggedIn;
        })
      );
  }
  
}

  /*  if(this.authService.isLoggedIn()){
        return true;
       }else{
        this.router.navigate(['/login']);
        return false;
       }
     
      }
    }*/

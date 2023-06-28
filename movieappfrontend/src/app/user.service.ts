import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data: any;
  role:String;
  role1=sessionStorage.getItem('role');
  private isLoggedIn$=new BehaviorSubject<boolean>(false);
  isLoggedInPub$=this.isLoggedIn$.asObservable();
 
 
  constructor(private http:HttpClient,private router:Router) {
    const token=sessionStorage.getItem('token');
    this.isLoggedIn$.next(!!token);
    
   }

  public userRegistration(user:User):Observable<any>{
    return this.http.post<any>(`http://localhost:9090/auth/v1/addUser`,user);
    //return this.http.post<User>('https://jo2cjhhwi4.execute-api.us-west-2.amazonaws.com/userappdeploy/userapp',user);
  }
  
  public loginUser(user:User):Observable<any>{
    return this.http.post<any>('http://localhost:9090/auth/v1/login',user)
    //return this.http.post<any>('https://jo2cjhhwi4.execute-api.us-west-2.amazonaws.com/userappdeploy/userlogin',user);
  }

  public forgotpwd(email:String):Observable<any>{
    return this.http.get<any>(`http://localhost:9090/auth/v1/forgotPassword/${email}`);
    //return this.http.get<any>(`https://jo2cjhhwi4.execute-api.us-west-2.amazonaws.com/userappdeploy/userapp/${email}`);
  }

  public getUserById(id:number | any):Observable<User>{
    return this.http.get<User>(`http://localhost:9090/auth/v1/getById/${id}`);
    //return this.http.get<User>(`https://jo2cjhhwi4.execute-api.us-west-2.amazonaws.com/userappdeploy/${id}`);
  }

  public verifyUser(userId:number,ans:String):Observable<any>{
    return this.http.get<any>(`http://localhost:9090/auth/v1/match/${userId}/${ans}`);
   // return this.http.get<any>(`http://54.244.195.19:5002/auth/v1/match/${userId}/${ans}`);
  }

  public updateUser(userId:number,user:User):Observable<any>
  {
    return this.http.put<any>(`http://localhost:9090/auth/v1/updateps/${userId}`,user);
    //return this.http.put<any>(`https://jo2cjhhwi4.execute-api.us-west-2.amazonaws.com/userappdeploy/${userId}`,user);
  }

  login(user:User){
    return this.loginUser(user).pipe(
      tap((response:any)=>{
        this.isLoggedIn$.next(true);
        sessionStorage.setItem('token',response.jwtToken);
      })
    )

  }

  getToken(){
    return localStorage.getItem('token');
  }

  isLoggedIn(){
    return localStorage.getItem('token') != null;
  }

  logout(){
    localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(['/login']);
    return true;
  }

  validatingRole(){
    console.log(this.role);
    return this.role==this.role1;
  }

  hasRoleAdmin(){
    return this.role=="Admin";
  }

  hasRoleUser(){
    return this.role=="Customer";
  }

}

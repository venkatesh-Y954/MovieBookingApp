import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subject, take, takeUntil } from 'rxjs';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    hide=true;
    error='';
    selrole:String | any;
    
    user=new User;
    userRole1=[
      {id:1,name:"Customer"},
      {id:2,name:"Admin"}
    ];
    
    constructor(private router:Router,private userService:UserService) { };

    ngOnInit(): void {
 
    }
    form:FormGroup;

   loginUser(){
     this.userService.loginUser(this.user).subscribe(data=>{
         //console.log(this.user.userRole);
         //console.log(data.userId);
         this.userService.role=this.user.userRole;      
         sessionStorage.setItem('token',data.jwtToken);
         sessionStorage.setItem('id',data.userId);
         sessionStorage.setItem('role',data.role);
         //console.log(sessionStorage.getItem('role'));
         this.router.navigate(['/home'])       
     },error=>{
      this.error="Invalid credentials";
     });
    
  }
   

  registerUser(){
    this.router.navigate(['/registerUser']);
  }


  forgotpassword(){
     this.router.navigate(['/forgotpwd']);
  }





}


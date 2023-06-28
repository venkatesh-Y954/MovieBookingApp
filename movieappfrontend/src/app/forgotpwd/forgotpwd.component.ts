import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent implements OnInit{
     user=new User;

     constructor(private router:Router,private service:UserService){}

     ngOnInit(){
      
     }

     resetpwd(email:String | any){
      this.service.forgotpwd(email).subscribe(data=>{
        console.log(data);
        this.router.navigate(['/resetpwd',data]);
      },error=>{
        console.log("user not found");
      })

     }
}

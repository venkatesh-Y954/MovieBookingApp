import { Location } from '@angular/common';
import { Component, OnInit } from  '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit{
   user=new User;
   role=localStorage.getItem('role');
   id:number;
 
  constructor(private service:UserService,private router:Router,
              private location: Location){}
  ngOnInit(): void {
    var x=sessionStorage.getItem("id");
    console.log(x);
    if(x==null || x=="")
       alert("user id not found")
     else{
       var y=parseInt(x,10);
     this.id=y;
     }
     //this.id=this.lg.guid;
     console.log(this.id);
     this.service.getUserById(this.id).subscribe(data=>{
        this.user=data;
     })
     
  }
  back(){   
    this.location.back();  
  }
   
}

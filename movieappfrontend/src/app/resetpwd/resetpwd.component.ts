import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.css']
})
export class ResetpwdComponent implements OnInit{
  id:number | any;
  user=new User;
  user1=new User;
  user2=new User;
 // answer:String | any;
  pwd:String | any;
  display=false;
  toDisplay=true;
  msg='';
  qns1=[
    {id:1,name:"Which is your favorite city?"},
    {id:2,name:"What is your birth place?"},
    {id:3,name:"What is your favorite Movie?"}
  ]

  constructor(
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private service:UserService){}

  ngOnInit(){
    this.id=this.activatedRoute.snapshot.params['id'];
    this.service.getUserById(this.id).subscribe(data=>{
      this.user=data;
    })

    
  }

  getMatch(userId:number,ans:String){
    /*this.service.getUserById(userId).subscribe(data=>{
        this.user2=data;    
        alert("ans matched proceed") 
        this.toDisplay=!this.toDisplay;
        this.display=!this.display;     
    },error=>{
      alert("ans not matched proceed");
    })*/
    this.service.verifyUser(userId,ans).subscribe(data=>{
      console.log(data);
      this.msg=data;
      alert("Ans matched proceed");
      this.toDisplay=!this.toDisplay;
      this.display=!this.display;
    },error=>{
      alert("ans not matched try again");
    })
  }
  save(){
    if(this.pwd==this.user1.password){
    this.service.updateUser(this.id,this.user1).subscribe(data=>{
      console.log(data);
      alert("Password Changed Successfully");
      this.router.navigate(['/login']);
    },error=>{
       alert("passwrod not changed try again");
    });
  }else{
    alert("password not matched try again");
    this.pwd='';
    this.user1.password='';
  }
  }
}

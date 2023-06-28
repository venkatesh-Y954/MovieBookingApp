import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit{

  user= new User();
  form: FormGroup | any;
  hide=true;
  pwd: string |any;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  userRole1=[
    {id:1,name:"Customer"}
  ];
  constructor(private router:Router,private userService:UserService,private fb:FormBuilder){}

  qns1=[
    {id:1,name:"Which is your favorite city?"},
    {id:2,name:"What is your fav food?"},
    {id:3,name:"What is your birth place?"}
  ]
  

  ngOnInit(): void {
      this.form = this.fb.group({
        username:['',[Validators.required,Validators.minLength(5)]],
        password:['',
        [
          Validators.required,
          Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
        ]
        ],
        confirmpwd:['',
        [
          Validators.required
          //Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
        ]],
        email:['',
        [
          Validators.required,
          Validators.pattern(this.emailPattern)
        ]],
        userRole:['',Validators.required],
        question:['',Validators.required],
        ans:['',Validators.required]
      });
  }

  registerUser(){
    // if(this.pwd==this.user.password){
    this.userService.userRegistration(this.form.value).subscribe(data=>{
      console.log(data);
      alert("User Registered Successfully");
      this.router.navigate(['/login']);
    },error=>{
      console.log(error);
    }
    );
  //}

  }

  validatePassword(form:FormGroup){
    if(form.controls['password'].value !== form.controls['confirmpwd'].value){
      form.controls['confirmpwd'].setErrors({passwordMismatch:true});
    }else{
      form.controls['confirmpwd'].setErrors(null);
    }
  }

}
/*export class RegistrationComponent implements OnInit{
  public checkError = (controlName: string, errorName: string) => {
    return this.registrationForm.controls[controlName].hasError(errorName);
  }
    form: FormGroup;
    hide = true;
    user=new User;
    display:false;
    role="Customer";
    error:'';
    public registrationForm: FormGroup;
    
    userRole1=[
      {id:1,name:"Customer"}
    ];
    qns1=[
      {id:1,name:"Which is your favorite city?"},
      {id:2,name:"What is your birth place?"},
      {id:3,name:"What is your favorite Movie?"}
    ]
    //qsn="which is your fav city";
    

    constructor(private router:Router,private userService:UserService){}
  ngOnInit(): void {
    /*this.form = new FormGroup({
      username: new FormControl('', [Validators.required,Validators.minLength(3)]),
      password: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      userRole: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      ans: new FormControl('', [Validators.required])
      });
      this.registrationForm=new FormGroup({
        username : new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)])
      })
  }

  public myError = (controlName: string, errorName: string) =>{
    return this.form.controls[controlName].hasError(errorName);
  }
  
  registerUser(){
     this.userService.userRegistration(this.user).subscribe(data=>{
      console.log(data);
      if(data!=null){
       //alert("User registration successful");
       this.router.navigate(['/login']);    
      } 
     },error=>{
      //alert("User registration failed, try again");
     });
    }
    
    email = new FormControl('', [Validators.required, Validators.email]);
    username= new FormControl('', [Validators.required]);
    getErrorMessage() {
      if (this.email.hasError('required')) {
        return 'You must enter a value';
      } 
      if (this.username.hasError('required')) {
        return 'You must enter a value';
      } 
      return this.email.hasError('email') ? 'Not a valid email' : '';
    }
}*/

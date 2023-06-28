import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from '../footer/footer.component';
import { User } from '../User';
import { UserService } from '../user.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userObj:User;
  let userService:UserService;
  let httpClient:HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ,FooterComponent],
      imports:[HttpClientTestingModule,HttpClientModule,FormsModule,RouterTestingModule, MatCardModule,MatFormFieldModule,
        MatInputModule,BrowserAnimationsModule,MatTableModule,MatDialogModule,MatPaginatorModule,ReactiveFormsModule,
      MatSelectModule,MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    userService=TestBed.inject(UserService);
    httpClient = TestBed.inject(HttpClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });





  it('should return http Post call',()=>
  {
    userObj =
    {
      userId:144, username:"venky", password:"venkatesh",confirmpwd:"venkatesh",email:"abc@gmail.com"
      ,question:"what is fav city",userRole:"Customer",ans:"kmm"
    };


    userService.loginUser(userObj).subscribe({
     error:(error)=>
      {
        expect(error).toBeTruthy();
        expect(error.status).withContext('status').toEqual(409);
      }
    });
    const ctrl = TestBed.inject(HttpTestingController);
    const mockHttp = ctrl.expectOne('http://localhost:9090/auth/v1/login');
    const httpReq = mockHttp.request;

    mockHttp.flush("error request",{status:409, statusText:"Conflict"});
  });



  
});
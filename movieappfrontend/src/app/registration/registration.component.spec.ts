import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../User';
import { UserService } from '../user.service';

import { RegistrationComponent } from './registration.component';

describe('RegisterComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;
  let userObj:User;
  let userService:UserService;
  //const url = 'http://localhost:5002/auth/v1/addUser';


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationComponent ],
      imports:[HttpClientTestingModule,HttpClientModule,FormsModule,RouterTestingModule, MatCardModule,MatFormFieldModule,
        MatInputModule,BrowserAnimationsModule,MatTableModule,MatDialogModule,MatPaginatorModule,ReactiveFormsModule,
        MatToolbarModule,MatIconModule,MatSelectModule]
    })
    .compileComponents();

    userService=TestBed.inject(UserService);
    fixture = TestBed.createComponent(RegistrationComponent);
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
      userId:144, username:"venky", password:"venky",confirmpwd:"venky",email:"abc@gmail.com"
      ,question:"what is fav city",userRole:"Customer",ans:"kmm"
    };

    userService.userRegistration(userObj).subscribe({
     error:(error)=>
      {
        expect(error).toBeTruthy();
        expect(error.status).withContext('status').toEqual(409);
      }
    });
    const ctrl = TestBed.inject(HttpTestingController);
    const mockHttp = ctrl.expectOne('http://localhost:9090/auth/v1/addUser');
    const httpReq = mockHttp.request;

    mockHttp.flush("error request",{status:409, statusText:"Conflict"});
  });





});
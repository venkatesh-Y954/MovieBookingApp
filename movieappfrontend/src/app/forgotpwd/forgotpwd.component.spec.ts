import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from '../footer/footer.component';
import { User } from '../User';
import { UserService } from '../user.service';

import { ForgotpwdComponent } from './forgotpwd.component';

describe('ForgotpwdComponent', () => {
  let component: ForgotpwdComponent;
  let fixture: ComponentFixture<ForgotpwdComponent>;
  let userObj :User;
  let userService :UserService;
  let httpClient:HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotpwdComponent, FooterComponent ],
      imports:[HttpClientTestingModule,HttpClientModule,FormsModule,RouterTestingModule, MatCardModule,MatFormFieldModule,
        MatInputModule,BrowserAnimationsModule,MatTableModule,MatDialogModule,MatPaginatorModule,ReactiveFormsModule,
        MatToolbarModule,MatIconModule,MatSelectModule]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    userService = TestBed.inject(UserService);
    fixture = TestBed.createComponent(ForgotpwdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should return http Get call',()=>
  {
    userObj =
    {
      userId:144, username:"venky", password:"venkatesh",confirmpwd:"venkatesh",email:"abc@gmail.com"
      ,question:"what is fav city",userRole:"Customer",ans:"kmm"
    };

    let result :User []|any;
     userService.getUserById(userObj.userId).subscribe(data=>
      {
        result = data;
        expect(result[0]).toEqual(userObj);
      })
    
    const ctrl = TestBed.inject(HttpTestingController);
    const mockHttp = ctrl.expectOne('http://localhost:9090/auth/v1/getById/144');
    const httpReq = mockHttp.request;

    expect(httpReq.method).toEqual('GET');
  });

});

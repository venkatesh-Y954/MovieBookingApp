import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from '../app-routing.module';
import { MovieService } from '../movie.service';
import { Ticket } from '../Ticket';

import { AddticketsComponent } from './addtickets.component';

describe('AddticketsComponent', () => {
  let component: AddticketsComponent;
  let fixture: ComponentFixture<AddticketsComponent>;
  let httpClient :HttpClient;
  let ticketObj:Ticket;
  let ticketService:MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddticketsComponent ],
      imports:[HttpClientTestingModule,HttpClientModule,FormsModule,RouterTestingModule, MatCardModule,MatFormFieldModule,
        MatInputModule,BrowserAnimationsModule,MatTableModule,MatPaginatorModule,ReactiveFormsModule,AppRoutingModule,MatIconModule
      ,MatDialogModule],
      providers: [
        {
        provide: MAT_DIALOG_DATA,
        useValue:{}
        }
        ]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    ticketService = TestBed.inject(MovieService);
    fixture = TestBed.createComponent(AddticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should not return http Post call',()=>
  {
    ticketObj =
    {
      noOfSeats:5,seatNo:"1-5",movieId_fk:102,movieName:"F3",theatre:"PVR",transactionId:5
    };

    ticketService.bookTicket(ticketObj,ticketObj.movieId_fk).subscribe({
     error:(error)=>
      {
        expect(error).toBeTruthy();
        expect(error.status).withContext('status').toEqual(409);
      }
    });
    const ctrl = TestBed.inject(HttpTestingController);
    const mockHttp = ctrl.expectOne('http://localhost:9091/api/v1/bookTickets/102');
    const httpReq = mockHttp.request;

    mockHttp.flush("error request",{status:409, statusText:"Conflict"});
  });



});
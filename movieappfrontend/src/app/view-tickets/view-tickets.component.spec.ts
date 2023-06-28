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
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MovieService } from '../movie.service';
import { Ticket } from '../Ticket';

import { ViewTicketsComponent } from './view-tickets.component';

describe('ViewTicketsComponent', () => {
  let component: ViewTicketsComponent;
  let fixture: ComponentFixture<ViewTicketsComponent>;
  let ticketObj:Ticket;
  let ticketService:MovieService;
  let httpClient:HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTicketsComponent,FooterComponent,HeaderComponent ],
      imports:[HttpClientTestingModule,HttpClientModule,FormsModule,RouterTestingModule, MatCardModule,MatFormFieldModule,
        MatInputModule,BrowserAnimationsModule,MatTableModule,MatDialogModule,MatPaginatorModule,ReactiveFormsModule,
      MatSelectModule,MatIconModule,MatToolbarModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewTicketsComponent);
    ticketService=TestBed.inject(MovieService);
    httpClient=TestBed.inject(HttpClient);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should return http Get call',()=>
  {
    ticketObj =
    {
      noOfSeats:5,seatNo:"1-5",movieId_fk:102,movieName:"F3",theatre:"PVR",transactionId:5
    };
 let result :Ticket []|any;
 ticketService.viewTicketsByMovie(ticketObj.movieId_fk).subscribe({
  next:(response)=>
  {
    expect(response).toBeTruthy();
    //expect(response.movieId).toEqual(65);
  }
});
    
    const ctrl = TestBed.inject(HttpTestingController);
    const mockHttp = ctrl.expectOne('http://localhost:9091/api/v1/getTicketsByMovie/102');
    const httpReq = mockHttp.request;

    expect(httpReq.method).toEqual('GET');
  });




});
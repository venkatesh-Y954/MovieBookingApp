import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AddmovieComponent } from './addmovie.component';
import { MatIconModule } from '@angular/material/icon';

describe('AddmovieComponent', () => {
  let component: AddmovieComponent;
  let movieservice: MovieService;
  let movieObj: Movie;
  let httpClient:HttpClient
  let fixture: ComponentFixture<AddmovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmovieComponent ],
      imports:[
        HttpClientModule,FormsModule,RouterTestingModule, MatCardModule,MatIconModule,MatFormFieldModule,
        MatInputModule,BrowserAnimationsModule,HttpClientTestingModule
      ]
    })
    .compileComponents();

    
    httpClient = TestBed.inject(HttpClient);
    movieservice = TestBed.inject(MovieService);
    fixture = TestBed.createComponent(AddmovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return http Post call',()=>
  {
    movieObj =
    {
      movieId:65, movieName:"Sahoo", theatre:"PGR cinemas", availableSeats:100, totalSeats:100,status:"BOOK ASAP"
    };

    movieservice.registerMovie(movieObj).subscribe({
      next:(response: { movieId: any; })=>
      {
        expect(response).toBeTruthy();
        expect(response.movieId).toEqual(65);
      }
    });
    const ctrl = TestBed.inject(HttpTestingController);
    const mockHttp = ctrl.expectOne('http://localhost:9091/api/v1/addMovie');
    const httpReq = mockHttp.request;

    expect(httpReq.method).toEqual('POST');
  });


});

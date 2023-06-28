import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AddmovieComponent } from '../addmovie/addmovie.component';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

import { ViewmoviesComponent } from './viewmovies.component';

describe('ViewmoviesComponent', () => {
  let component: ViewmoviesComponent;
  let fixture: ComponentFixture<ViewmoviesComponent>;
  let movieService: MovieService;
  let httpClient :HttpClient;
  let movieObj: Movie;

  beforeEach(async () => {
    ViewmoviesComponent.prototype.ngOnInit = () => {} ;
    await TestBed.configureTestingModule({
      declarations: [ ViewmoviesComponent ],
      imports: [HttpClientTestingModule,HttpClientModule,FormsModule,RouterTestingModule, MatCardModule,MatFormFieldModule,
        MatInputModule,BrowserAnimationsModule,MatTableModule,MatDialogModule,MatPaginatorModule,ReactiveFormsModule]
    })
    .compileComponents();

    httpClient = TestBed.inject(HttpClient);
    movieService = TestBed.inject(MovieService);
    fixture = TestBed.createComponent(ViewmoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should return http Get call',()=>
  {
    movieObj =
    {
      movieId:101, movieName:"patan", theatre:"AMB", availableSeats:0, totalSeats:10,status:"Sold Out"
    };
      let result :Movie []|any;
      movieService.viewMovies().subscribe(data=>
      {
        result = data;
        expect(result[0]).toEqual(movieObj);
      })
    
    const ctrl = TestBed.inject(HttpTestingController);
    const mockHttp = ctrl.expectOne('http://localhost:9091/api/v1/getAllMovies');
    const httpReq = mockHttp.request;

    expect(httpReq.method).toEqual('GET');
    
  });



});


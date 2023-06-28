import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Movie } from './movie';

import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let movieObj:Movie;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,HttpClientModule,FormsModule,RouterTestingModule, MatCardModule,MatFormFieldModule,
        MatInputModule,BrowserAnimationsModule,MatTableModule,MatDialogModule,MatPaginatorModule,ReactiveFormsModule,
        MatToolbarModule,MatIconModule]
    });
    service = TestBed.inject(MovieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should retrive all movies',()=>{
    let response:Movie[] |any;
    spyOn(service,'viewMovies').and.returnValue(of(response));
    service.viewMovies().subscribe(data=>{
      expect(data).toEqual(response);
    })
  })


  it('should get() movie data by id',()=>{
    let response:Movie[]|any;
    spyOn(service,'getMovieById').and.returnValue(of(response));
    service.getMovieById(12).subscribe(data=>{
      expect(data).toEqual(response);
    })
  })


  it('should add movie',()=>{

    movieObj =
    {
      movieId:65, movieName:"Sahoo", theatre:"PGR cinemas", availableSeats:100, totalSeats:100,status:"BOOK Asap"
    };
    let response:Movie[]|any;
    spyOn(service,'registerMovie').and.returnValue(of(response));
    service.registerMovie(movieObj).subscribe(data=>{
      expect(data).toEqual(response);
    })
  })

});
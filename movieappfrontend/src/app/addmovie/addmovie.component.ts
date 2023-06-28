import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import { Movie } from '../movie';
import { Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { FormGroup, NgForm } from '@angular/forms';
@Component({
  selector: 'app-addmovie',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css'],
  
})
export class AddmovieComponent implements OnInit{
  constructor(private router:Router,private service:MovieService) { }
  ngOnInit(): void {
    
  }
  movieForm:NgForm;
  movie=new Movie;
  addMovie(){
    this.service.registerMovie(this.movie).subscribe(data=>{
      console.log(data);
      alert("movie Added successfully")
      this.reloadComponent(true);
      //this.movieForm.resetForm();
    })
  }
  reloadComponent(self:boolean,urlToNavigateTo ?:string){
    //skipLocationChange:true means dont update the url to / when navigating
   console.log("Current route I am on:",this.router.url);
   const url=self ? this.router.url :urlToNavigateTo;
   this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
     this.router.navigate([`/${url}`]).then(()=>{
       console.log(`After navigation I am on:${this.router.url}`)
     })
   })
  }


}


import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddmovieComponent } from '../addmovie/addmovie.component';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-viewmovies',
  templateUrl: './viewmovies.component.html',
  styleUrls: ['./viewmovies.component.css'],
 
})

export class ViewmoviesComponent implements AfterViewInit,OnInit {
  movies:Movie[];
  displayedColumns: string[] = ['movieId', 'movieName', 'theatre', 'totalSeats','availableSeats','status','action'];
  public dataSource = new MatTableDataSource<Movie>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  applyFilter(event: Event) {
   // console.log(this.dataSource);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
   // console.log(this.dataSource);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  constructor(private router:Router,private service:MovieService,
    public dialog: MatDialog){}

  ngOnInit(): void {
   this.viewmovies();
   //this.reloadComponent(true);
  }

  viewmovies(){
    this.service.viewMovies().subscribe(data=>{
     this.movies=data;
     this.dataSource.data=data as Movie[];
     //console.log(data);
    })
 }
 viewTickets(movieId:number){
     this.router.navigate(['/viewTickets',movieId]);
 }
 delete(movieId:number){
   this.service.deleteMovie(movieId).subscribe(data=>{
     alert("Tickets will also delete")
     this.viewmovies();
     console.log(data);
   })
 }

 addMovie() {
  this.dialog.open(AddmovieComponent);
 }
 reloadMovieComponent(self:boolean,urlToNavigateTo ?:string){
  console.log("Current route I am on:",this.router.url);
  const url=self ? this.router.url :urlToNavigateTo;
  this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
    this.router.navigate([`/${url}`]).then(()=>{
      console.log(`After navigation I am on:${this.router.url}`)
    })
  })
 }



}









 /* 

  constructor(private router:Router,private service:MovieService){}

  ngOnInit(): void {
   this.viewmovies();
  }

  viewmovies(){
    this.service.viewMovies().subscribe(data=>{
     this.movies=data;
     console.log(data);
    })
 }
 viewTickets(){
     this.router.navigate(['/viewTickets']);
 }
 delete(movieId:number){
   this.service.deleteMovie(movieId).subscribe(data=>{
     alert("Tickets will also delete")
     this.viewmovies();
     console.log(data);
   })
 }
}
*/




  
 /* displayedColumns: string[] = ['movieId', 'movieName', 'theatre', 'totalSeats','availableSeats'];
  dataSource: MatTableDataSource<Movie> | any;

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
   movies:Movie[] | any;
   movie=new Movie;
  constructor(private service:MovieService) {

  }
}
 
  
 /* ngOnInit() {
   // this.viewmovies();
   this.dataSource.filterPredicate = function (_movie: any) {
    return true;
    }
  }
  viewmovies(){
    this.service.viewMovies().subscribe(data=>{
     this.movies=data;
     this.dataSource=this.movies;
     console.log(data);
    })
  }
  delete(movieId:number){
    this.service.deleteMovie(movieId).subscribe(data=>{
      alert("Tickets will also delete")
      this.viewmovies();
      console.log(data);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  
}


/* function createNewUser(this: any,id: number): Movie {
   
   const name=
       this.movies.movieName[Math.round(Math.random() * (this.movies.movieName.length - 1))] +
       ' ' +
       this.movies.movieName[Math.round(Math.random() * (this.movies.movieName.length - 1))].charAt(0) +
       '.';

    const theat=
       this.movies.theatre[Math.round(Math.random() * (this.movies.theatre.length - 1))];
    const ts=Math.round(Math.random() * 100).toString();
    const as=Math.round(Math.random() * 100).toString();

  return {
    movieId:id.toString(),
    movieName:name,
    theatre:theat,
    toatalSeats:ts,
    availableSeats:as
  }
};
*/

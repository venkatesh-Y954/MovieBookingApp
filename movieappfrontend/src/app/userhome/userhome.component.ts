import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { AddmovieComponent } from '../addmovie/addmovie.component';
import { AddticketsComponent } from '../addtickets/addtickets.component';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent {
  movies:Movie[];
  len:number;
  display:true;
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
   console.log(this.len); 
   
  }

  viewmovies(){
    this.service.viewMovies().subscribe(data=>{
     this.movies=data;
     this.dataSource.data=data as Movie[];
     this.len=Object.keys(data).length; 
     console.log(data);
    })
 }
 viewTickets(Movie:number){
     this.router.navigate(['/viewTickets',Movie]);
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
  
 bookTickets(movieId:number){
  this.dialog.open(AddticketsComponent,{
    data:{
      id:movieId,
    }
    });
 }
 

}



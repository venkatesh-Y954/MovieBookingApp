import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableDataSourcePaginator } from '@angular/material/table';
import { Router, RouteReuseStrategy } from '@angular/router';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { Ticket } from '../Ticket';
import { TicketdetailsComponent } from '../ticketdetails/ticketdetails.component';
import { ViewmoviesComponent } from '../viewmovies/viewmovies.component';

@Component({
  selector: 'app-addtickets',
  templateUrl: './addtickets.component.html',
  styleUrls: ['./addtickets.component.css']
})
export class AddticketsComponent implements OnInit {
    ticket=new Ticket;
   movie=new Movie;
    id:number;
    constructor(private router:Router,private service:MovieService,
      @Inject(MAT_DIALOG_DATA) public data: any,public dialog: MatDialog) { }  
  movies: Movie[];
  displayedColumns: string[];
  public dataSource: MatTableDataSource<Movie, MatTableDataSourcePaginator>;
  paginator: MatPaginator;
  sort: MatSort;
 
  ngOnInit(): void {
    this.id=this.data.id;
    console.log(this.id);
    this.service.getMovieById(this.id).subscribe(data=>{
      this.movie=data;
    });
    this.reloadComponent(true);
  }

    addTicket(){
      this.ticket.movieId_fk=this.movie.movieId;
      this.service.bookTicket(this.ticket,this.id).subscribe(data=>{
        alert("Ticket booking Successfull");
        console.log(data);
        this.reloadComponent(true)
        this.dialog.open(TicketdetailsComponent,{
          data:{
            id:data.transactionId,
            name:data.movieName,
            theatre:data.theatre,
            ts:data.noOfSeats,
            seatno:data.seatNo
          }
        });
      },error=>{
        alert("Tickets Not booked. Please try again");
      });
    }
   reloadComponent(self:boolean,urlToNavigateTo ?:string){
     console.log("Current route I am on:",this.router.url);
     const url=self ? this.router.url :urlToNavigateTo;
     this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
       this.router.navigate([`/${url}`]).then(()=>{
         console.log(`After navigation I am on:${this.router.url}`)
       })
     })
    }
}







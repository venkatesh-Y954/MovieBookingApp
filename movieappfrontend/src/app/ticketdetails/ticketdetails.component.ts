import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminhomeComponent } from '../adminhome/adminhome.component';
import { ViewmoviesComponent } from '../viewmovies/viewmovies.component';

@Component({
  selector: 'app-ticketdetails',
  templateUrl: './ticketdetails.component.html',
  styleUrls: ['./ticketdetails.component.css']
})
export class TicketdetailsComponent implements OnInit{
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private router:Router,
              private cmp:AdminhomeComponent){}
  id:number;
  name:String;
  theatre:String;
  noofseats:number;
  seatno:Set<number>;
  ngOnInit(): void {
    this.id=this.data.id;
    this.name=this.data.name;
    this.theatre=this.data.theatre;
    this.noofseats=this.data.ts;
    this.seatno=this.data.seatno;

  }
  view(){ 
    this.router.navigate(['/userhome']);
    this.cmp.reloadMovieComponent(true);

  }
 

}

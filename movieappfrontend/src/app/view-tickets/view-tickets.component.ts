import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { Ticket } from '../Ticket';

@Component({
  selector: 'app-view-tickets',
  templateUrl: './view-tickets.component.html',
  styleUrls: ['./view-tickets.component.css']
})
export class ViewTicketsComponent implements AfterViewInit,OnInit{

  tickets: Ticket[];
  constructor(private router:Router,private service:MovieService,
    private activatedRoute:ActivatedRoute,
    public dialog: MatDialog){}
  displayedColumns: string[] = ['transactionId','movieId_fk', 'movieName', 'theatre', 'noOfSeats','seatNo'];
  public dataSource = new MatTableDataSource<Ticket>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    console.log(this.dataSource);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    console.log(this.dataSource);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
    
   id:number;
  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    console.log(this.id);
    this.viewTickets();

  }
  viewTickets(){
    this.service.viewTicketsByMovie(this.id).subscribe(data=>{
      this.tickets=data;
      this.dataSource.data=data as Ticket[];
      console.log(data);
    })
  }
   num:Set<number>;
  openDialog(seatNo:Set<number> ) {
    console.log(seatNo);
    this.num=seatNo;
   
    this.dialog.open(DialogElementsExampleDialog,{
      data:
      {'seatno':seatNo}
    });
  }
  back(){
    this.router.navigate(['/adminhome'])
  }
  
}
@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-elements-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogElementsExampleDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private router:Router) { }

  ngOnInit(): void {
      console.log(this.data.seatno);
  }
 
}
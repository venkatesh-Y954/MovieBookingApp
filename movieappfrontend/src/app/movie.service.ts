import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie';
import { Ticket } from './Ticket';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  [x: string]: any;

  constructor(private http:HttpClient) { }

  


  public viewMovies():Observable<Movie[]>{
    return this.http.get<Movie[]>('http://localhost:9091/api/v1/getAllMovies');
    //return this.http.get<Movie[]>(" https://20gqm1msie.execute-api.us-west-2.amazonaws.com/movieappdeploy/moviebooking");
  }
  
  public deleteMovie(movieId:number):Observable<any>{
    return this.http.delete<any>(`http://localhost:9091/api/v1/delete/${movieId}`);
    //return this.http.delete<any>(`https://20gqm1msie.execute-api.us-west-2.amazonaws.com/movieappdeploy/${movieId}`);
  }

  public viewTickets():Observable<Ticket[]>{
    return this.http.get<Ticket[]>('http://localhost:9091/api/v1/getAllTickets');
    //return this.http.get<Ticket[]>("https://20gqm1msie.execute-api.us-west-2.amazonaws.com/movieappdeploy/ticketbooking");
  }

  public viewTicketsByMovie(movieId_fk:number):Observable<Ticket[]>{
    return this.http.get<Ticket[]>(`http://localhost:9091/api/v1/getTicketsByMovie/${movieId_fk}`);
    //return this.http.get<Ticket[]>(` https://20gqm1msie.execute-api.us-west-2.amazonaws.com/movieappdeploy/ticketbooking/${movieId_fk}`);
  }

  public registerMovie(movie:Movie):Observable<any>{
    return this.http.post<any>('http://localhost:9091/api/v1/addMovie',movie);
    //return this.http.post<any>("https://20gqm1msie.execute-api.us-west-2.amazonaws.com/movieappdeploy/moviebooking",movie);
  }

  public bookTicket(ticket:Ticket,movieId:number):Observable<any>{
    return this.http.post<any>(`http://localhost:9091/api/v1/bookTickets/${movieId}`,ticket);
   //return this.http.post<any>(`https://20gqm1msie.execute-api.us-west-2.amazonaws.com/movieappdeploy/${movieId}`,ticket);
  }

  public getMovieById(movieId:number):Observable<any>{
    return this.http.get<any>(`http://localhost:9091/api/v1/getById/${movieId}`);
    //return this.http.get<any>(`https://20gqm1msie.execute-api.us-west-2.amazonaws.com/movieappdeploy/${movieId}`);

  }

}


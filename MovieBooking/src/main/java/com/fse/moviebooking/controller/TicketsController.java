package com.fse.moviebooking.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fse.moviebooking.exceptions.NoTicketsAvailableException;
import com.fse.moviebooking.model.Movie;
import com.fse.moviebooking.model.Tickets;
import com.fse.moviebooking.service.DataPublisherService;
//import com.fse.moviebooking.service.DataPublisherService;
import com.fse.moviebooking.service.MovieServiceImpl;
import com.fse.moviebooking.service.TicketsServiceImpl;

@RestController
@RequestMapping("api/v1")
@CrossOrigin
public class TicketsController {
	
	@Autowired
	private TicketsServiceImpl ts;
	
	@Autowired
	private MovieServiceImpl ms;
	
	@Autowired
	DataPublisherService dp;
	
	@PostMapping("/bookTickets/{movieId}")
	public ResponseEntity<?> addTickets(@RequestBody Tickets ticket, @PathVariable int movieId)
			throws NoTicketsAvailableException
	{
		Movie existsMovie=ms.getMovieById(movieId);
		if(existsMovie.getAvailableSeats()<=0 || ticket.getNoOfSeats()>existsMovie.getAvailableSeats()) {
			throw new NoTicketsAvailableException();
		}
		else if(existsMovie != null) {
			int avitick=existsMovie.getAvailableSeats();
	
			existsMovie.setAvailableSeats(existsMovie.getAvailableSeats()-ticket.getNoOfSeats());
			
			ticket.setNoOfSeats(ticket.getNoOfSeats());
			ticket.setMovieName(existsMovie.getMovieName());
			String th=existsMovie.getTheatre();
			ticket.setTheatre(th);
			
			int last=avitick-ticket.getNoOfSeats()+1;
			/*Set<Integer> s=new HashSet<>();
			for(int i=0;i<ticket.getNoOfSeats();i++) {
				s.add(avitick--);
			}*/
			String s="";
			if(ticket.getNoOfSeats()==1)
				s=""+avitick;
			else
			   s=""+last+"-"+avitick;
			 
			ticket.setSeatNo(s);
			if(ts.addTicket(ticket) && ms.updateMovie(existsMovie)) {
				dp.setTemp("Tickets Added");
				return new ResponseEntity<Tickets>(ticket,HttpStatus.CREATED);
			}
					
		}
		return new ResponseEntity<String>("Tickets Not Booked",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping("/getAllTickets")
	public ResponseEntity<?> getAllTickets(){
		List<Tickets> tks= ts.getAllBookings();
		if(tks !=null) {
			return new ResponseEntity<List<Tickets>>(tks,HttpStatus.OK);
		}
		return new ResponseEntity<String>("No List found",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	

	@DeleteMapping("/deleteTickets/{movieId_fk}")
	public ResponseEntity<?> delete(@PathVariable("movieId_fk") int movieId){
		if(ts.deleteTicket(movieId)) {
			return new ResponseEntity<String>("deleted",HttpStatus.OK);
		}
		return new ResponseEntity<String>("not deleted",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping("/getTicketsByMovie/{movieId_fk}")
	public ResponseEntity<?> getTickets(@PathVariable("movieId_fk") int movieId_fk){
		Set<Tickets> tks=ts.getAllTickestById(movieId_fk);
		if(tks!=null) {
			return new ResponseEntity<Set<Tickets>>(tks,HttpStatus.OK);
		}
		return new ResponseEntity<String>("Tickets Not Found",HttpStatus.INTERNAL_SERVER_ERROR);
	}

}

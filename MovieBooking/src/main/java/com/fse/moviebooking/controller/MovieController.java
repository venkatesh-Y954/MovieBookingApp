package com.fse.moviebooking.controller;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fse.moviebooking.exceptions.DuplicateMovieException;
import com.fse.moviebooking.exceptions.MovieNotFoundException;
import com.fse.moviebooking.model.Movie;
import com.fse.moviebooking.model.Tickets;
//import com.fse.moviebooking.service.DataPublisherService;
import com.fse.moviebooking.service.DataPublisherService;
import com.fse.moviebooking.service.MovieServiceImpl;
import com.fse.moviebooking.service.TicketsServiceImpl;

@RestController
@RequestMapping("api/v1")
@CrossOrigin
public class MovieController {

	@Autowired
	private MovieServiceImpl movieService;
	
	@Autowired
	TicketsServiceImpl ts;
	
	
	@GetMapping("/message")
	public ResponseEntity<?> get() {
		return new ResponseEntity<String>("welcome",HttpStatus.OK);
	}
	
	@Autowired
	DataPublisherService dp;


    @PostMapping("/addMovie")
    public ResponseEntity<?> addMovie(@RequestBody Movie movie) throws DuplicateMovieException{
		if(movieService.addMovie(movie) != null)
		{
			dp.setTemp("Movie Added : "+movie.getMovieName());
			return new ResponseEntity<Movie>(movie,HttpStatus.CREATED);	
		}
		
		return new ResponseEntity<String>("Movie is not created in DB",HttpStatus.CONFLICT);
	}
	
	@GetMapping("/getAllMovies")
	public ResponseEntity<?> getAllMovies(){
		
		List<Movie> movielist=movieService.getAllMovies();
		
		if(movielist!=null) {
			for(Movie m:movielist) {
				if(m.getAvailableSeats()<=0)
					m.setStatus("Sold Out");
				Set<Tickets> bookings=ts.getAllTickestById(m.getMovieId());
				m.setTicketsList(bookings);
			}
			return new ResponseEntity<List<Movie>>(movielist,HttpStatus.OK);
		}
		return new ResponseEntity<String>("No movies found",HttpStatus.NO_CONTENT);
	}
	
	@GetMapping("/getById/{movieId}")
	public ResponseEntity<?> getMovieById(@PathVariable int movieId){
		Movie movie=movieService.getMovieById(movieId);
		if(movie!=null) {
			Set<Tickets> bookings=ts.getAllTickestById(movieId);
			movie.setTicketsList(bookings);
			return new ResponseEntity<Movie>(movie,HttpStatus.OK);
		}
		return new ResponseEntity<String>("Movie not fount with "+movieId+"",HttpStatus.NO_CONTENT);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updateMovie(@RequestBody Movie movie){
		if(movieService.updateMovie(movie)) {
			return new ResponseEntity<String>("Movie updated",HttpStatus.OK);
		}
		return new ResponseEntity<String>("Movie not updated",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@DeleteMapping("/delete/{movieId}")
	public ResponseEntity<?> deleteMovie(@PathVariable("movieId") int movieId) throws MovieNotFoundException{
		if(movieService.deleteMovie(movieId) && ts.deleteTicketsById(movieId)) {
			dp.setTemp("Movie Deleted");
			return new ResponseEntity<Integer>(movieId,HttpStatus.OK);
		}
		return new ResponseEntity<String>("Movie not deleted",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
	@GetMapping("/getMovieByName/{movieName}")
	public ResponseEntity<?> getMovie(@PathVariable String movieName) {
		Movie mv=movieService.getMovieByMovie(movieName);
		if(mv!=null) {
			return new ResponseEntity<Movie>(mv,HttpStatus.OK);
		}
		return new ResponseEntity<String>("No movie Found",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	
}

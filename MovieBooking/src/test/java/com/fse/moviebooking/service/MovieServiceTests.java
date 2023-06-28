package com.fse.moviebooking.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fse.moviebooking.controller.MovieController;
import com.fse.moviebooking.model.Movie;
import com.fse.moviebooking.repository.MovieRepository;


@SpringBootTest
public class MovieServiceTests {
	
	@Mock
	private MovieRepository mr;
	@InjectMocks
	private MovieServiceImpl ms;
	
	/*@Autowired
	private MockMvc mockMvc;
	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.openMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(ms).build();
	}*/
	
	List<Movie> movielist=new ArrayList<Movie>();
	
	
	
	public Movie getMovie() {
		Movie movie=new Movie();
		movie.setMovieId(101);
		movie.setMovieName("patan");
		movie.setTheatre("bvk");
		movie.setTotalSeats(10);
		movie.setAvailableSeats(10);	
		movie.setTicketsList(null);
		return movie;
	}
	
	@Test
	public void addMovieTest() throws Exception {
		Movie movie=getMovie();
		
		movielist.add(movie);
        when(mr.save(any())).thenReturn(movie);
		
	    Movie m1 = ms.addMovie(movie);
		
		assertEquals(movie,m1);
		
	}
	
	
	
	@Test
	public void getAllMoviesTest() {
		Movie movie=getMovie();
		
		movielist.add(movie);
		
		when(mr.findAll()).thenReturn(movielist);
		List<Movie> mvl=ms.getAllMovies();
		assertEquals(movielist,mvl);
		
		
	}
	
	@Test
	public void getMovieByIdTest() {
		Movie movie=getMovie();
		int movieId=movie.getMovieId();
		int id=101;
		when(mr.findById(id)).thenReturn(Optional.of(movie));
		
		Movie expM=ms.getMovieById(id);
		assertEquals(movie,expM);
		
	}
	
/*	@Test
	public void updateMovieTest() {
		int id = 101;
        Movie existingMovie = getMovie();
        Movie updatedMovie = new Movie();
        updatedMovie.setMovieId(id);
		//updatedMovie.setMovieName("ok");
		//updatedMovie.setTheatre("bvk");
		updatedMovie.setTotalSeats(20);
		updatedMovie.setAvailableSeats(20);
		//updatedMovie.setTicketsList(null);
        when(mr.findById(id)).thenReturn(Optional.of(existingMovie));
        when(mr.save(updatedMovie)).thenReturn(updatedMovie);

        boolean res = ms.updateMovie(updatedMovie);
        System.out.println(res);
        assertTrue(res);

       
	}*/
	
	@Test
	public void deleteMovieTest() throws Exception {
		//movielist.clear();
		int id=101;
		Movie movie=getMovie();
		when(mr.findById(id)).thenReturn(Optional.of(movie));
		
		boolean res=ms.deleteMovie(id);
		assertTrue(res);
	}
	
	
	

}

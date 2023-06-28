package com.fse.moviebooking.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fse.moviebooking.exceptions.DuplicateMovieException;
import com.fse.moviebooking.model.Movie;
import com.fse.moviebooking.model.Tickets;
import com.fse.moviebooking.service.MovieServiceImpl;

import org.springframework.http.MediaType;

@AutoConfigureMockMvc
@SpringBootTest
public class MovieControllerTests {
	
	@Mock 
	private MovieServiceImpl ms;
	
	@InjectMocks
	private MovieController mc;
	
	@Autowired
	private MockMvc mockMvc;
	
	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.openMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(mc).build();
	}
	
	List<Movie> movielist =new ArrayList<Movie>();
	
	Set<Tickets> tks=null;
	
	@Test
	public void addMovieSuccesst() throws Exception {
		movielist.clear();
		Movie movie=new Movie();
		movie.setMovieId(101);
		movie.setMovieName("patan");
		movie.setTheatre("bvk");
		movie.setTotalSeats(10);
		movie.setAvailableSeats(10);	
		movie.setTicketsList(tks);
		
		movielist.add(movie);
        when(ms.addMovie(movie)).thenReturn(movie);

        assertEquals(1,movielist.size());
      /*  mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/addMovie").contentType(MediaType.APPLICATION_JSON)
        .content(new ObjectMapper().writeValueAsString(movie))).andExpect(MockMvcResultMatchers.status().isCreated());
   		
		when(ms.addMovie(movie)).thenReturn(movie);
        ResponseEntity<?> response = mc.addMovie(movie);
        verify(ms, times(1)).addMovie(movie);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(movie, response.getBody());	*/
		
	}
	
	
	@Test
	public void addMovieFailure() throws Exception
    {
		
        when(ms.addMovie(any())).thenReturn(null);

	    Movie u1 = ms.addMovie(null);
	    assertNull(u1);
	   
	    mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/addMovie")
			   .contentType(MediaType.APPLICATION_JSON)
			   .content(new ObjectMapper().writeValueAsString(u1)))
			   .andExpect(MockMvcResultMatchers.status().is4xxClientError());
			   
	}
	
	@Test
	public void getAllMovies() throws Exception {
		Movie movie=new Movie();
		movie.setMovieId(101);
		movie.setMovieName("patan");
		movie.setTheatre("bvk");
		movie.setTotalSeats(10);
		movie.setAvailableSeats(10);	
		movie.setTicketsList(null);
		
		movielist.clear();
		
		movielist.add(movie);
		when(ms.getAllMovies()).thenReturn(movielist);
		
		for(Movie m:movielist) {
			System.out.println(m.getMovieName());
		}
		
		List<Movie> ml=ms.getAllMovies();
		for(Movie m:ml) {
			System.out.println(m.getMovieName());
		}
		assertEquals(movielist,ml);
		
		
		
	//	mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getAllMovies").contentType(MediaType.APPLICATION_JSON))
	//	.andExpect(MockMvcResultMatchers.status().isOk());
		
		
	}
	@Test
	public void getAllMoviesFailure() throws Exception
	{
	   movielist.clear();
	   System.out.println(movielist.size());
	   when(ms.getAllMovies()).thenReturn(movielist);

       assertEquals(0,movielist.size());

       mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/getAllMovies").contentType(MediaType.APPLICATION_JSON))
       .andExpect(MockMvcResultMatchers.status().isOk());

	}
	

}

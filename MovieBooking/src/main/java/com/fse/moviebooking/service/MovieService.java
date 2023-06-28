package com.fse.moviebooking.service;

import java.util.List;

import com.fse.moviebooking.exceptions.DuplicateMovieException;
import com.fse.moviebooking.exceptions.MovieNotFoundException;
import com.fse.moviebooking.model.Movie;

public interface MovieService {

	public Movie addMovie(Movie movie) throws DuplicateMovieException;
	
	public List<Movie> getAllMovies();
	
	public Movie getMovieById(int mid);
	
	public boolean updateMovie(Movie movie);
	
	public boolean deleteMovie(int mid) throws MovieNotFoundException;
	
	public Movie getMovieByMovie(String movieName);
}

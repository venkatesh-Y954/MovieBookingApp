package com.fse.moviebooking.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fse.moviebooking.exceptions.DuplicateMovieException;
import com.fse.moviebooking.exceptions.MovieNotFoundException;
import com.fse.moviebooking.model.Movie;
import com.fse.moviebooking.repository.MovieRepository;


@Service
public class MovieServiceImpl implements MovieService{

	@Autowired
	private MovieRepository movieRepo;
	
	@Override
	public Movie addMovie(Movie movie) throws DuplicateMovieException{
		Optional<Movie> mvobj=movieRepo.findById(movie.getMovieId());
		if(mvobj.isPresent()) {
			throw new DuplicateMovieException();
		}
		movie.setAvailableSeats(movie.getTotalSeats());
		if(movie.getAvailableSeats()>0)
			movie.setStatus("Book Asap");
		movieRepo.save(movie);
		return movie;
	}

	@Override
	public List<Movie> getAllMovies() {
		List<Movie> movies=movieRepo.findAll();
		if(movies != null && movies.size()>0) {
			return movies;
		}
		return null;
	}

	@Override
	public Movie getMovieById(int mid) {
		 Optional<Movie> mv=movieRepo.findById(mid);
		 if(mv.isPresent()) {
		     return mv.get();
		 }
		return null;
	}

	@Override
	public boolean updateMovie(Movie movie) {
		Movie movie1=movieRepo.getById(movie.getMovieId());
		if(movie1!=null) {
			movie1.setTotalSeats(movie.getTotalSeats());
			movie1.setAvailableSeats(movie.getAvailableSeats());
			movieRepo.save(movie1);
			return true;
		}
		return false;
	}

	@Override
	public boolean deleteMovie(int mid) throws MovieNotFoundException{
		Optional<Movie> movie1=movieRepo.findById(mid);
		if(movie1.isEmpty()) {
			throw new MovieNotFoundException();
		}
		movieRepo.deleteById(mid);
		return true;
	}

	@Override
	public Movie getMovieByMovie(String movieName) {
		Movie mv=movieRepo.findByMovieName(movieName);
		return mv;
	}

	public boolean deleteMovieByName(String movieName) {
		movieRepo.deleteByName(movieName);
		return true;
	}

	

	
}

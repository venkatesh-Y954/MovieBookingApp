package com.fse.moviebooking.model;


import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;

import javax.persistence.OneToMany;

//import org.hibernate.annotations.CascadeType;



@Entity
public class Movie {

	@Id
	private int movieId;
	private String movieName;
	private String theatre;
	private int totalSeats;
	private int availableSeats;
	private String status;
	
	@OneToMany(targetEntity=Tickets.class,cascade = CascadeType.ALL)
	private Set<Tickets> ticketsList;


	
	
	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public int getMovieId() {
		return movieId;
	}


	public void setMovieId(int movieId) {
		this.movieId = movieId;
	}


	public String getMovieName() {
		return movieName;
	}


	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}


	public String getTheatre() {
		return theatre;
	}


	public void setTheatre(String theatre) {
		this.theatre = theatre;
	}


	public int getTotalSeats() {
		return totalSeats;
	}


	public void setTotalSeats(int totalSeats) {
		this.totalSeats = totalSeats;
	}


	public int getAvailableSeats() {
		return availableSeats;
	}


	public void setAvailableSeats(int availableSeats) {
		this.availableSeats = availableSeats;
	}


	public Set<Tickets> getTicketsList() {
		return ticketsList;
	}


	public void setTicketsList(Set<Tickets> ticketsList) {
		this.ticketsList = ticketsList;
	}
	
	
	
	
	
}

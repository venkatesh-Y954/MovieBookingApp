package com.fse.moviebooking.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Tickets {
	@Id
	@GeneratedValue
	private int transactionId;
	private int noOfSeats;
	//@ElementCollection(targetClass=Integer.class)
	//private Set<Integer> seatNo = new HashSet<Integer>();
	private String seatNo;
	private String movieName;
	private int movieId_fk;
	private String theatre;
	public int getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(int transactionId) {
		this.transactionId = transactionId;
	}
	public void setSeatNo(String seatNo) {
		this.seatNo=seatNo;
	}
	public String getSeatNo() {
		return seatNo;
	}
	public int getNoOfSeats() {
		return noOfSeats;
	}
	public void setNoOfSeats(int noOfSeats) {
		this.noOfSeats = noOfSeats;
	}
	
	public String getMovieName() {
		return movieName;
	}
	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}
	public int getMovieId_fk() {
		return movieId_fk;
	}
	public void setMovieId_fk(int movieId_fk) {
		this.movieId_fk = movieId_fk;
	}
	public String getTheatre() {
		return theatre;
	}
	public void setTheatre(String theatre) {
		this.theatre = theatre;
	}
    
	
}

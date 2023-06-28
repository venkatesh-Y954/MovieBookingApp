package com.fse.moviebooking.service;

import java.util.List;
import java.util.Set;

import com.fse.moviebooking.exceptions.NoTicketsAvailableException;
import com.fse.moviebooking.model.Tickets;

public interface TicketsService {

	
	public boolean addTicket(Tickets ticket) throws NoTicketsAvailableException;
	

	
	public List<Tickets> getAllBookings();
	
	
	
	public boolean deleteTicket(int movieId);
	
	public boolean deleteTicketsById(int transactionId);
	
	//public List<Tickets> getTicketsById(int movieId_fk);

	
}

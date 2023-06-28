package com.fse.moviebooking.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fse.moviebooking.exceptions.NoTicketsAvailableException;
import com.fse.moviebooking.model.Movie;
import com.fse.moviebooking.model.Tickets;
import com.fse.moviebooking.repository.TicketsRepository;

@Service
public class TicketsServiceImpl implements TicketsService{

	@Autowired
	private TicketsRepository ticketsRepo;
	
	@Autowired
	private MovieServiceImpl ms;

	@Override
	public boolean addTicket(Tickets ticket) throws NoTicketsAvailableException{
		
		    if(ticket.getNoOfSeats()<=0)
		    	return false;
			ticketsRepo.save(ticket);
			return true;	
		
		
	}
	
	
	@Override
	public List<Tickets> getAllBookings() {
		List<Tickets> tickets=ticketsRepo.findAll();
		return tickets;
	}
	
	public Set<Tickets> getAllTickestById(int movieId_fk){
		Set<Tickets> tks=ticketsRepo.findAllById(movieId_fk);
		return tks;
	}

	@Override
	public boolean deleteTicket(int movieId) {
		//ticketsRepo.deleteTicketData(movieId);
		Set<Tickets> tks=get(movieId);
        for(Tickets t:tks) {
        	ticketsRepo.delete(t);
        }
		return true;
	}

	@Override
	public boolean deleteTicketsById(int movieId) {
        Set<Tickets> tks=get(movieId);
        ticketsRepo.deleteAll(tks);
		return true;
	}


	public Set<Tickets> get(int movieId){
		Set<Tickets> tks=ticketsRepo.findAllById(movieId);
		return tks;
	}


	/*@Override
	public List<Tickets> getTicketsById(int movieId_fk) {
		List<Tickets> ls=ticketsRepo.findByMovieId_fk(movieId_fk);
		return null;
	}*/
	
	
	
}

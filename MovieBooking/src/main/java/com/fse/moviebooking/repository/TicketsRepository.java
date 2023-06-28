package com.fse.moviebooking.repository;

import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fse.moviebooking.model.Tickets;

@Repository
@Transactional
public interface TicketsRepository extends JpaRepository<Tickets,Integer>{

	@Modifying
	@Query(value = "delete from Tickets where movieId_fk=:movieId")
	public void deleteTicketData(int movieId);

	@Query(value = "select t from Tickets t where t.movieId_fk=:movieId_fk")
	public Set<Tickets> findAllById(int movieId_fk);

	
	

	/*@Query(value = "select t from ")
	public Set<Tickets> findByMovieId_fk(int movieId);*/

	
	
}

package com.fse.moviebooking.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fse.moviebooking.model.Movie;

@Repository
@Transactional
public interface MovieRepository extends JpaRepository<Movie,Integer>{

	
   // @Query(value = "select m from Movie m where m.movieName= :movieName")
	public Movie findByMovieName(String movieName);

	@Modifying
	@Query(value = "delete from Movie where movieName=movieName")
	public void deleteByName(String movieName);

}

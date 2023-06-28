package com.fse.user.Repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.fse.user.Model.User;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User, Integer>
{
	
	@Query(value="select u from User u where u.username= :username and u.password= :password and u.userRole= :role")
	public User validateUser(String username, String password,String role);//login

	public User findByEmail(String email);

	public User findByUsername(String username);

}

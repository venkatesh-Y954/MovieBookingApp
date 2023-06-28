package com.fse.user.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import com.fse.user.Model.User;
import com.fse.user.Repository.UserRepository;



//@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@AutoConfigureMockMvc
public class UserRepositoryTest
{
	@Autowired
	private UserRepository userRepo;
	
	private User user = new User();// real object
	
	@BeforeEach
	public void init()
	{
		//List<String> userList = new ArrayList<String>();
		user.setUserId(101);
		user.setUsername("Keith");
		user.setEmail("abc@gmail.com");
		user.setPassword("qwerty");
		user.setUserRole("Customer");
		user.setQuestion("what is fav city");
		user.setAns("HYD");
		//userList.add("Guest User");
		//userList.add("Admin user");
		//user.setUserList(userList);
	}
	
	@Test
	public void saveUserSuccess() throws Exception
	{
		User user1 = null;
		
		userRepo.save(user);
        
		System.out.println(user1);
		
		System.out.println(user.getUserId());
		
		user1 = userRepo.findById(user.getUserId()).orElse(user);
		
		System.out.println(user1);
		assertEquals(user.getUsername(), user1.getUsername());
	}
	
	@Test
	public void saveUserFailure() throws Exception
	{
		User user1 = null;
		
		
		
		if(userRepo.findAll().toString().isEmpty())
		{
			userRepo.save(user);
		user1 = userRepo.findById(user.getUserId()).get();
		
		}


		
		assertNull(user1);
	}

}












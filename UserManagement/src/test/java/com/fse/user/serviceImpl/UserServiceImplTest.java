package com.fse.user.serviceImpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.Mockito.when;

import static org.mockito.Mockito.any;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fse.user.Model.User;
import com.fse.user.Repository.UserRepository;
import com.fse.user.Service.UserServiceImpl;



@AutoConfigureMockMvc
@SpringBootTest
public class UserServiceImplTest 
{
	@Mock
	private UserRepository userRepo;
	
	@InjectMocks
	private UserServiceImpl userService;
	
	@Autowired
	private MockMvc mockMvc;
	
	@BeforeEach
	public void init()
	{
		MockitoAnnotations.openMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(userService).build();
	}

	List<User> userList = new ArrayList<User>();
	
	@Test
	public void getAllUsersSuccess() throws Exception
	{
		User user = new User();
		user.setUserId(101);
		user.setUsername("Keith");
		user.setEmail("abc@gmail.com");
		user.setPassword("qwerty");
		user.setUserRole("Customer");
		user.setQuestion("what is fav city");
		user.setAns("HYD");
		
		userList.add(user);
		when(userRepo.findAll()).thenReturn(userList);
		
		List<User> uList = userService.getAllUsers();
		assertEquals(userList, uList);
		
	}
	
	@Test
	public void getAllUsersFailure() throws Exception
	{
		
		when(userRepo.findAll()).thenReturn(null);
		
		List<User> uList = userService.getAllUsers();
		//System.out.println(uList.size());
		assertNull(uList);
		
	}
	
	@Test
	public void addUserSuccess() throws Exception
	{
		User user = new User();
		user.setUserId(101);
		user.setUsername("Keith");
		user.setEmail("abc@gmail.com");
		user.setPassword("qwerty");
		user.setUserRole("Customer");
		user.setQuestion("what is fav city");
		user.setAns("HYD");
		
		userList.add(user);
        when(userRepo.save(any())).thenReturn(user);
		//System.out.println(user);
		User u1 = userService.addUser(user);
		//System.out.println(u1);
		assertEquals(user, u1);
		
	}
	
	/*@Test
	public void addUserFailure() throws Exception
	{
		
		when(userRepo.save(any())).thenReturn(null);
		
		User u1 = userService.addUser(null);
		//System.out.println(u1);
		assertNull(u1);
		
	}*/

















}

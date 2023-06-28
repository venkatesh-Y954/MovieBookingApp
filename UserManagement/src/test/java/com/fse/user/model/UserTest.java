package com.fse.user.model;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.fse.user.Model.User;



public class UserTest
{
	
	@Test
	public void test01()
	{
		User userObj = Mockito.mock(User.class);// creating the mock object
		
		when(userObj.getUsername()).thenReturn(null);
		
		List<String> userNewObj = new ArrayList<String>();
		
		userNewObj.add("Rajesh");
		
		/*
		 * String settingName=userObj.setName("Rajesh");// setting the mock data
		 * 
		 * String empname = userObj.getName();
		 * 
		 * System.out.println(settingName); when(userObj.getName()).thenReturn(empname);*/
		
	//	when(userObj.getUserList()).thenReturn(userNewObj);
		System.out.println(userNewObj);
		//assertEquals(userNewObj, userObj.getUserList());
		
		
	}
	
	
	@Test
	public void test02()
	{
		User userObj = Mockito.mock(User.class);// creating the mock object
		
		when(userObj.getUsername()).thenReturn(null);
		
		User user = new User();
		//user.setUsername("John");
		
       String userNewObj = user.setName("John");
		
				
	// String settingName=userObj.setName("Rajesh");// setting the mock data
		 
		String empname = user.getUsername();
		 
		 System.out.println(userNewObj); 
		 when(userObj.getUsername()).thenReturn(userNewObj);
	
		 
		 assertEquals(userNewObj, empname);
		
		
	}

}













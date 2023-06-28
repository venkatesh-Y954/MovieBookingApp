package com.fse.user.Service;

import java.util.List;

import com.fse.user.Exceptions.UserAlreadyExistsException;
import com.fse.user.Model.User;

public interface UserService 
{
	public User addUser(User user)throws UserAlreadyExistsException;// user registration
	
	public boolean loginUser(String username, String password,String role);// login
	
	public List<User> getAllUsers();// will be visible only if you are logged in
	
	public int getUser(String email);
	
	public boolean updatePassword(int userId, User user);
	
	public boolean matchqsn(int id,String ans);

	public User getUserById(int userId);
	
	public User getUserByUserName(String username);

}

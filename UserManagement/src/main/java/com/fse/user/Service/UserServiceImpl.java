package com.fse.user.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fse.user.Exceptions.UserAlreadyExistsException;
import com.fse.user.Model.User;
import com.fse.user.Repository.UserRepository;

@Service
public class UserServiceImpl implements UserService
{

	@Autowired
	private UserRepository userRepo;

	@Override
	public User addUser(User user) throws UserAlreadyExistsException {
		
		User u1=userRepo.findByEmail(user.getEmail());
		
		if(u1!=null)
		{
			//return userRepo.save(user);
			throw new UserAlreadyExistsException();
			
		}
		if(user.getEmail()!=null && user.getUsername()!=null && user.getPassword()!=null) {
		  return userRepo.save(user);
		}
		return null;
	}

	@Override
	public boolean loginUser(String username, String password,String role) {
		
		User user1 = userRepo.validateUser(username, password,role);
		System.out.println("User: "+ user1.getUsername());
		if(user1!=null)
		{
			return true;
		}
		return false;
	}

	@Override
	public List<User> getAllUsers() {
	
		List<User> userList = userRepo.findAll();
		
		if(userList!=null)// & userList.size() >0
		{
			return userList;
		}
		
		return null;
	}

	@Override
	public int getUser(String email) {
		User user=userRepo.findByEmail(email);
		int id=user.getUserId();
		return id;
	}
	
	@Override
	public boolean matchqsn(int id,String ans) {
		System.out.println(id);
		System.out.println(ans);
		
		User user=userRepo.findById(id).orElse(null);
		if(user.getAns().equals(ans))
		  return true;
		return false;
	}

	@Override
	public boolean updatePassword(int userId,User user) {
		User u1=userRepo.findById(userId).orElse(null);
		u1.setPassword(user.getPassword());
		userRepo.saveAndFlush(u1);
		return true;
	}

	@Override
	public User getUserById(int userId) {
		User user=userRepo.findById(userId).orElse(null);
		return user;
	}
	
	@Override
	public User getUserByUserName(String username) {
		User user=userRepo.findByUsername(username);
		return user;
	}
	
}















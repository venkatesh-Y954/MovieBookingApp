package com.fse.user.Controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fse.user.Exceptions.UserAlreadyExistsException;
import com.fse.user.Model.User;

import com.fse.user.Service.UserService;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RequestMapping("auth/v1")
@RestController
@CrossOrigin
public class AuthenticationController 
{
	
	private Map<String,String> mapObj = new HashMap<String,String>();
	
	@Autowired
	private UserService userService;
	
	
	

	@PostMapping("/addUser")
	public ResponseEntity<?> registerUser(@RequestBody User user)throws UserAlreadyExistsException
	{
		if(userService.addUser(user)!=null)
		{
			return new ResponseEntity<User>(user, HttpStatus.CREATED);
		}
		return new ResponseEntity<String>("User not registered", HttpStatus.CONFLICT);
	}
	
	
	public String generateToken(String username, String password,String role) throws ServletException, Exception
	{
		String jwtToken;
		
		if(username==null || password == null)
		{
			throw new ServletException("Please enter valid username and password");
		}
		
		boolean flag= userService.loginUser(username, password,role);
		
		if(!flag)
		{
			throw new ServletException("Invalid credentials");
			
		}
		else
		{
			jwtToken= Jwts.builder().setSubject(username).setIssuedAt(new Date())
						.setExpiration(new Date(System.currentTimeMillis()+ 3000000))
						.signWith(SignatureAlgorithm.HS256, "secret key").compact();
		}
		
		return jwtToken;
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> performLogin(@RequestBody User user)
	{
		System.out.println(user.getUsername());
		System.out.println(user.getPassword());
		
		User u=userService.getUserByUserName(user.getUsername());
		System.out.println(u.getUserId());
		
	    String tkn="";
		try
		{
			String jwtToken = generateToken(user.getUsername(), user.getPassword(),user.getUserRole());
			System.out.println(jwtToken);
			mapObj.put("message", "User successfully logged in");
			mapObj.put("userId", ""+u.getUserId());
			mapObj.put("role", u.getUserRole());
			mapObj.put("jwtToken", jwtToken);
			
			//dp.setTemp(user);
			
		}
		catch(Exception e)
		{
			mapObj.put("message", "User not logged in");
			mapObj.put("jwtToken", null);
			tkn=null;
			
		}
		if(tkn!=null) 
		  return new ResponseEntity<>(mapObj, HttpStatus.CREATED);
		return new ResponseEntity<String>("login failed",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping("/forgotPassword/{email}")
	public ResponseEntity<?> getuser(@PathVariable String email) {
		int id=userService.getUser(email);
		if(id>0)
		  return new ResponseEntity<Integer>(id,HttpStatus.OK);
		return new ResponseEntity<String>("No user found",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@PutMapping("/updateps/{userId}")
	public ResponseEntity<?> updateps(@PathVariable int userId,@RequestBody User user){
		if(userService.updatePassword(userId, user)) {
			return new ResponseEntity<Integer>(userId,HttpStatus.OK);
		}
		return new ResponseEntity<String>("password not updated",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping("/match/{userId}/{ans}")
	public ResponseEntity<?> getMatch(@PathVariable int userId,@PathVariable String ans){
		System.out.println(ans);
		if(userService.matchqsn(userId, ans)) {
			return new ResponseEntity<Integer>(userId,HttpStatus.OK);
		}
		return new ResponseEntity<String>("Ans not matched please check again",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@GetMapping("/getById/{userId}")
	public User getUserById(@PathVariable int userId) {
		return userService.getUserById(userId);
		
	}
}
















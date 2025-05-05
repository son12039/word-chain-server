package com.jungbae.wordchain.controller;

import org.springframework.web.bind.annotation.RestController;

import com.jungbae.wordchain.model.User;
import com.jungbae.wordchain.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
  

@RestController
public class UserController {

	@Autowired
	private UserRepository user;
	
	@GetMapping("/test")
	public ResponseEntity<List<User>> getMethodName() {
		List<User> a =  user.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(a);
	}

}

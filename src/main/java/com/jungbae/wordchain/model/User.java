package com.jungbae.wordchain.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users")
public class User {

	 	@Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long usercode;
	 	
	 	private String id;
	    private String password;
	    private LocalDateTime created_at;
}

package com.jungbae.wordchain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.jungbae.wordchain.model.User;

public interface UserRepository extends JpaRepository<User, Long>{

}

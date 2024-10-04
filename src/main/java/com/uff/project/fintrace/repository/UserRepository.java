package com.uff.project.fintrace.repository;

import com.uff.project.fintrace.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}

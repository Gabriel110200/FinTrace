package com.uff.project.fintrace.repository;

import com.uff.project.fintrace.model.Account;
import com.uff.project.fintrace.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountRepository extends JpaRepository<Account, Long> {
    List<Account> findByUserId(Long userId);
}

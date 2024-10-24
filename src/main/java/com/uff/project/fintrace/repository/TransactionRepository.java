package com.uff.project.fintrace.repository;

import com.uff.project.fintrace.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByType(Transaction.Type type);

    List<Transaction> findByCategory(String category);

    List<Transaction> findByDateBetween(LocalDate startDate, LocalDate endDate);
}

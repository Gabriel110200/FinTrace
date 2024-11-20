package com.uff.project.fintrace.repository;

import com.uff.project.fintrace.model.RecurrencyTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecurrencyTransactionRepository extends JpaRepository<RecurrencyTransaction, Long> {
}
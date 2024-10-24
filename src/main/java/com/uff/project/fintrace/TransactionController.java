package com.uff.project.fintrace;

import com.uff.project.fintrace.model.Transaction;
import com.uff.project.fintrace.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        try {
            List<Transaction> transactions = transactionRepository.findAll();
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            e.printStackTrace(); // Log the full stack trace in the console for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PostMapping
    public Transaction createTransaction(@RequestBody Transaction transaction) {
        return transactionRepository.save(transaction);

    }

    @GetMapping("/type/{type}")
    public List<Transaction> getTransactionsByType(@PathVariable Transaction.Type type) {
        return transactionRepository.findByType(type);
    }

    @GetMapping("/category/{category}")
    public List<Transaction> getTransactionsByCategory(@PathVariable String category) {
        return transactionRepository.findByCategory(category);
    }

    @GetMapping("/date-range")
    public List<Transaction> getTransactionsByDateRange(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        return transactionRepository.findByDateBetween(startDate, endDate);
    }
}
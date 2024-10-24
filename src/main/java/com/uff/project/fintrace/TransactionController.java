package com.uff.project.fintrace;

import com.uff.project.fintrace.model.Category;
import com.uff.project.fintrace.model.Transaction;
import com.uff.project.fintrace.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionController(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    private ResponseEntity<Map<String, Object>> buildResponse(Object data, boolean success, String errorMessage) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        if (success) {
            response.put("data", data);
        } else {
            response.put("error", errorMessage);
        }
        return ResponseEntity.status(success ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }



    @GetMapping
    public ResponseEntity<?> getAllTransactions() {
        try {
            List<Transaction> transactions = transactionRepository.findAll();
            return buildResponse(transactions, true, null);
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createTransaction(@RequestBody Transaction transaction) {
        try {
            Transaction savedTransaction = transactionRepository.save(transaction);
            return buildResponse(savedTransaction, true, null);
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<?> getTransactionsByType(@PathVariable Transaction.Type type) {
        try {
            List<Transaction> transactions = transactionRepository.findByType(type);
            return buildResponse(transactions, true, null);
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }


    @GetMapping("/date-range")
    public ResponseEntity<?> getTransactionsByDateRange(
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate) {
        try {
            List<Transaction> transactions = transactionRepository.findByDateBetween(startDate, endDate);
            return buildResponse(transactions, true, null);
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }
}

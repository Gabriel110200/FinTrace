package com.uff.project.fintrace;


import com.uff.project.fintrace.model.RecurrencyTransaction;
import com.uff.project.fintrace.repository.RecurrencyTransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recurrency-transactions")
public class RecurrencyTransactionController {

    private final RecurrencyTransactionRepository recurrencyTransactionRepository;

    @Autowired
    public RecurrencyTransactionController(RecurrencyTransactionRepository recurrencyTransactionRepository) {
        this.recurrencyTransactionRepository = recurrencyTransactionRepository;
    }

    private ResponseEntity<Map<String, Object>> buildResponse(Object data, boolean success, String errorMessage) {
        Map<String, Object> response = new HashMap<>();
        response.put("success", success);
        if (success) {
            response.put("data", data);
        } else {
            response.put("error", errorMessage);
        }
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> createRecurrencyTransaction(@RequestBody RecurrencyTransaction transactionRequest) {
        try {
            List<RecurrencyTransaction> transactions = generateRecurringTransactions(transactionRequest);
            recurrencyTransactionRepository.saveAll(transactions);
            return buildResponse(transactions, true, null);
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }

    private List<RecurrencyTransaction> generateRecurringTransactions(RecurrencyTransaction transactionRequest) {
        List<RecurrencyTransaction> transactions = new ArrayList<>();
        int day = transactionRequest.getDay();

        for (int month = 1; month <= 12; month++) {
            LocalDate date = LocalDate.of(2024, month, Math.min(day, LocalDate.of(2024, month, 1).lengthOfMonth()));
            RecurrencyTransaction transaction = new RecurrencyTransaction(
                    transactionRequest.getType(),
                    transactionRequest.getCategory(),
                    transactionRequest.getAmount(),
                    transactionRequest.getDescription(),
                    day
            );
            transaction.setDate(date);
            transactions.add(transaction);
        }

        return transactions;
    }

    @GetMapping
    public ResponseEntity<?> getAllRecurrencyTransactions() {
        try {
            List<RecurrencyTransaction> transactions = recurrencyTransactionRepository.findAll();
            return buildResponse(transactions, true, null);
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }
}
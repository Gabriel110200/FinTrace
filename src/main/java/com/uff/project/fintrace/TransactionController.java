package com.uff.project.fintrace;

import com.uff.project.fintrace.model.Category;
import com.uff.project.fintrace.model.Transaction;
import com.uff.project.fintrace.repository.CategoryRepository;
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
    private final CategoryRepository categoryRepository;

    @Autowired
    public TransactionController(TransactionRepository transactionRepository, CategoryRepository categoryRepository) {
        this.transactionRepository = transactionRepository;
        this.categoryRepository = categoryRepository;
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

            Long categoryId = transaction.getCategory().getId();

            Category category = categoryRepository.findById(categoryId).orElse(null);

            if (category != null) {
                if (category.getLimit() >= transaction.getAmount()) {
                    category.setLimit(category.getLimit() - transaction.getAmount());
                }
                categoryRepository.save(category);
                transaction.setCategory(category);
            }

            Transaction savedTransaction = transactionRepository.save(transaction);

            if (transaction.getCategory() != null) {
                categoryRepository.save(transaction.getCategory());
            }

            return buildResponse(savedTransaction, true, null);
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }




}

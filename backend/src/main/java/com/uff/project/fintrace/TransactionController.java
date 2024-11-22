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
import java.util.ArrayList;
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

    @GetMapping("/recurring")
    public ResponseEntity<?> getRecurringTransactions() {
        try {
            List<Transaction> recurringTransactions = transactionRepository.findByIsRecurringTrue();
            return buildResponse(recurringTransactions, true, null);
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }

    @GetMapping("/non-recurring")
    public ResponseEntity<?> getNonRecurringTransactions() {
        try {
            List<Transaction> nonRecurringTransactions = transactionRepository.findByIsRecurringFalse();
            return buildResponse(nonRecurringTransactions, true, null);
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

            if (category == null) {
                return buildResponse(null, false, "Categoria não encontrada");
            }



            if (transaction.getType() == Transaction.Type.DESPESA) {
                categoryRepository.save(category);
            }

            transaction.setCategory(category);

            List<Transaction> recurringTransactions = new ArrayList<>();
            if (transaction.isRecurring()) {

                Transaction savedTransaction = transactionRepository.save(transaction);

                LocalDate nextDate = transaction.getDate();
                for (int i = 1; i <= 11; i++) {
                    nextDate = nextDate.plusMonths(1);



                    Transaction newTransaction = new Transaction();
                    newTransaction.setType(transaction.getType());
                    newTransaction.setCategory(transaction.getCategory());
                    newTransaction.setAmount(transaction.getAmount());
                    newTransaction.setDate(nextDate);
                    newTransaction.setDescription(transaction.getDescription());
                    newTransaction.setRecurring(true);

                    if (transaction.getType() == Transaction.Type.DESPESA) {
                        categoryRepository.save(category);
                    }

                    recurringTransactions.add(newTransaction);
                }

                transactionRepository.saveAll(recurringTransactions);
                recurringTransactions.add(0, savedTransaction);
            } else {

                Transaction savedTransaction = transactionRepository.save(transaction);
                return buildResponse(savedTransaction, true, null);
            }

            return buildResponse(recurringTransactions, true, null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                    "success", false,
                    "data", e.getMessage()
            ));
        }
    }







}

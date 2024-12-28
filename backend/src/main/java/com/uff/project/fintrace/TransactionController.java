package com.uff.project.fintrace;

import com.uff.project.fintrace.DTO.TransactionRequest;
import com.uff.project.fintrace.model.Category;
import com.uff.project.fintrace.model.Transaction;
import com.uff.project.fintrace.model.User;
import com.uff.project.fintrace.repository.CategoryRepository;
import com.uff.project.fintrace.repository.TransactionRepository;
import com.uff.project.fintrace.repository.UserRepository;
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
    private final UserRepository userRepository;

    @Autowired
    public TransactionController(TransactionRepository transactionRepository, CategoryRepository categoryRepository, UserRepository userRepository) {
        this.transactionRepository = transactionRepository;
        this.categoryRepository = categoryRepository;
        this.userRepository = userRepository;
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
    public ResponseEntity<?> getAllTransactions(@RequestParam Long userId) {
        try {
            List<Transaction> transactions = transactionRepository.findByUserId(userId);
            return buildResponse(transactions, true, null);
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }

    @GetMapping("/recurring")
    public ResponseEntity<?> getRecurringTransactions() {

        List<Transaction> recurringTransactions = transactionRepository.findByIsRecurringTrue();
        return buildResponse(recurringTransactions, true, null);

    }

    @GetMapping("/non-recurring")
    public ResponseEntity<?> getNonRecurringTransactions() {

        List<Transaction> nonRecurringTransactions = transactionRepository.findByIsRecurringFalse();
        return buildResponse(nonRecurringTransactions, true, null);

    }




    @PostMapping
    public ResponseEntity<?> createTransaction(@RequestBody TransactionRequest transactionRequest) {
        try {

            User user = userRepository.findById(transactionRequest.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Category category = null;
            if (transactionRequest.getCategoryId() != null) {
                category = categoryRepository.findById(transactionRequest.getCategoryId())
                        .orElse(null);
                if (transactionRequest.getCategoryId() != null && category == null) {
                    return buildResponse(null, false, "Categoria não encontrada");
                }
            }


            Transaction transaction = new Transaction();
            transaction.setUser(user);
            transaction.setCategory(category);
            transaction.setType(transactionRequest.getType());
            transaction.setAmount(transactionRequest.getAmount());
            transaction.setDate(transactionRequest.getDate());
            transaction.setDescription(transactionRequest.getDescription());
            transaction.setRecurring(transactionRequest.isRecurring());


            List<Transaction> recurringTransactions = new ArrayList<>();
            if (transaction.isRecurring()) {
                Transaction savedTransaction = transactionRepository.save(transaction);

                LocalDate nextDate = transaction.getDate();
                for (int i = 1; i <= 11; i++) {
                    nextDate = nextDate.plusMonths(1);

                    Transaction newTransaction = new Transaction();
                    newTransaction.setUser(user);
                    newTransaction.setCategory(category);
                    newTransaction.setType(transaction.getType());
                    newTransaction.setAmount(transaction.getAmount());
                    newTransaction.setDate(nextDate);
                    newTransaction.setDescription(transaction.getDescription());
                    newTransaction.setRecurring(true);

                    recurringTransactions.add(newTransaction);
                }

                transactionRepository.saveAll(recurringTransactions);
                recurringTransactions.add(0, savedTransaction);
            } else {
                Transaction savedTransaction = transactionRepository.save(transaction);
                savedTransaction.getUser().setPassword("");
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

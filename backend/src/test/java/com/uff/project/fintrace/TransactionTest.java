package com.uff.project.fintrace;

import com.uff.project.fintrace.model.Category;
import com.uff.project.fintrace.model.Transaction;
import com.uff.project.fintrace.repository.CategoryRepository;
import com.uff.project.fintrace.repository.TransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class TransactionTest {

    @Mock
    private TransactionRepository transactionRepository;

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private TransactionController transactionController;

    private Transaction transaction;
    private Category category;

    @BeforeEach
    void setUp() {
        category = new Category();
        category.setId(1L);
        category.setName("Compras");
        category.setLimit(500.0);

        transaction = new Transaction();
        transaction.setId(1L);
        transaction.setAmount(100.0);
        transaction.setCategory(category);
        transaction.setDate(LocalDate.now());
    }

    @Test
    void testGetAllTransactionsStatusCode() {
        List<Transaction> transactions = List.of(transaction);
        when(transactionRepository.findAll()).thenReturn(transactions);
        ResponseEntity<?> response = transactionController.getAllTransactions();
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testGetAllTransactionsSuccessFlag() {
        List<Transaction> transactions = List.of(transaction);
        when(transactionRepository.findAll()).thenReturn(transactions);
        ResponseEntity<?> response = transactionController.getAllTransactions();
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertTrue((Boolean) responseBody.get("success"));
    }

    @Test
    void testGetAllTransactionsDataIsNotNull() {
        List<Transaction> transactions = List.of(transaction);
        when(transactionRepository.findAll()).thenReturn(transactions);
        ResponseEntity<?> response = transactionController.getAllTransactions();
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertNotNull(responseBody.get("data"));
    }

    @Test
    void testGetAllTransactionsDataSize() {
        List<Transaction> transactions = List.of(transaction);
        when(transactionRepository.findAll()).thenReturn(transactions);
        ResponseEntity<?> response = transactionController.getAllTransactions();
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        List<Transaction> data = (List<Transaction>) responseBody.get("data");
        assertEquals(1, data.size());
    }

    @Test
    void testGetAllTransactionsFailureStatusCode() {
        when(transactionRepository.findAll()).thenThrow(new RuntimeException("Database error"));
        ResponseEntity<?> response = transactionController.getAllTransactions();
        assertEquals(500, response.getStatusCodeValue());
    }

    @Test
    void testGetAllTransactionsFailureFlag() {
        when(transactionRepository.findAll()).thenThrow(new RuntimeException("Database error"));
        ResponseEntity<?> response = transactionController.getAllTransactions();
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));
    }

    @Test
    void testCreateTransactionStatusCode() {
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);
        ResponseEntity<?> response = transactionController.createTransaction(transaction);
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testCreateTransactionSuccessFlag() {
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);
        ResponseEntity<?> response = transactionController.createTransaction(transaction);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertTrue((Boolean) responseBody.get("success"));
    }

    @Test
    void testCreateTransactionDataIsNotNull() {
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);
        ResponseEntity<?> response = transactionController.createTransaction(transaction);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertNotNull(responseBody.get("data"));
    }

    @Test
    void testCreateTransactionAmountReducesCategoryLimit() {
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);
        transactionController.createTransaction(transaction);
        assertEquals(400.0, category.getLimit());
    }


    @Test
    void testCreateTransactionFailureStatusCode() {
        when(transactionRepository.save(any(Transaction.class))).thenThrow(new RuntimeException("Database error"));
        ResponseEntity<?> response = transactionController.createTransaction(transaction);
        assertEquals(500, response.getStatusCodeValue());
    }

    @Test
    void testCreateTransactionFailureFlag() {
        when(transactionRepository.save(any(Transaction.class))).thenThrow(new RuntimeException("Database error"));
        ResponseEntity<?> response = transactionController.createTransaction(transaction);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));
    }

    @Test
    void testCreateTransactionErrorMessage() {
        when(transactionRepository.save(any(Transaction.class))).thenThrow(new RuntimeException("Database error"));
        ResponseEntity<?> response = transactionController.createTransaction(transaction);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertEquals("Database error", responseBody.get("error"));
    }
}

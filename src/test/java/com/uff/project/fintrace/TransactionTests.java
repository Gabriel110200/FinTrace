package com.uff.project.fintrace;

import com.uff.project.fintrace.model.Transaction;
import com.uff.project.fintrace.repository.TransactionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class TransactionControllerTest {

    @InjectMocks
    private TransactionController transactionController;

    @Mock
    private TransactionRepository transactionRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTransactionsSuccess() {
        Transaction transaction1 = new Transaction(); // Populate with sample data
        Transaction transaction2 = new Transaction(); // Populate with sample data
        List<Transaction> transactions = Arrays.asList(transaction1, transaction2);

        when(transactionRepository.findAll()).thenReturn(transactions);

        ResponseEntity<?> response = transactionController.getAllTransactions();

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(transactions, ((Map<String, Object>) response.getBody()).get("data"));
    }

    @Test
    void testGetAllTransactionsFailure() {
        when(transactionRepository.findAll()).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<?> response = transactionController.getAllTransactions();

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Database error", ((Map<String, Object>) response.getBody()).get("error"));
    }

    @Test
    void testCreateTransactionSuccess() {
        Transaction transaction = new Transaction(); // Populate with sample data
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        ResponseEntity<?> response = transactionController.createTransaction(transaction);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(transaction, ((Map<String, Object>) response.getBody()).get("data"));
    }

    @Test
    void testCreateTransactionFailure() {
        Transaction transaction = new Transaction(); // Populate with sample data
        when(transactionRepository.save(any(Transaction.class))).thenThrow(new RuntimeException("Save error"));

        ResponseEntity<?> response = transactionController.createTransaction(transaction);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Save error", ((Map<String, Object>) response.getBody()).get("error"));
    }

    @Test
    void testGetTransactionsByTypeSuccess() {
        Transaction.Type type = Transaction.Type.EXPENSE; // Replace with an actual type
        Transaction transaction = new Transaction(); // Populate with sample data
        List<Transaction> transactions = Collections.singletonList(transaction);

        when(transactionRepository.findByType(type)).thenReturn(transactions);

        ResponseEntity<?> response = transactionController.getTransactionsByType(type);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(transactions, ((Map<String, Object>) response.getBody()).get("data"));
    }

    @Test
    void testGetTransactionsByDateRangeSuccess() {
        LocalDate startDate = LocalDate.now().minusDays(10);
        LocalDate endDate = LocalDate.now();
        Transaction transaction = new Transaction(); // Populate with sample data
        List<Transaction> transactions = Collections.singletonList(transaction);

        when(transactionRepository.findByDateBetween(startDate, endDate)).thenReturn(transactions);

        ResponseEntity<?> response = transactionController.getTransactionsByDateRange(startDate, endDate);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(transactions, ((Map<String, Object>) response.getBody()).get("data"));
    }

    @Test
    void testGetTransactionsByDateRangeFailure() {
        LocalDate startDate = LocalDate.now().minusDays(10);
        LocalDate endDate = LocalDate.now();
        when(transactionRepository.findByDateBetween(startDate, endDate)).thenThrow(new RuntimeException("Date range error"));

        ResponseEntity<?> response = transactionController.getTransactionsByDateRange(startDate, endDate);

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("Date range error", ((Map<String, Object>) response.getBody()).get("error"));
    }
}

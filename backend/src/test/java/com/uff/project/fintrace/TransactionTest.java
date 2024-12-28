package com.uff.project.fintrace;

import com.uff.project.fintrace.DTO.TransactionRequest;
import com.uff.project.fintrace.model.Category;
import com.uff.project.fintrace.model.Transaction;
import com.uff.project.fintrace.model.User;
import com.uff.project.fintrace.repository.CategoryRepository;
import com.uff.project.fintrace.repository.TransactionRepository;
import com.uff.project.fintrace.repository.UserRepository;
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

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TransactionController transactionController;

    private Transaction transaction;
    private TransactionRequest transactionRequest;
    private Category category;
    private User user;


    @BeforeEach
    void setUp() {

        user = new User();
        user.setId(1L);
        user.setUsername("teste");

        category = new Category();
        category.setId(1L);
        category.setName("Compras");
        category.setLimit(500.0);
        category.setUser(user);

        transaction = new Transaction();
        transaction.setId(1L);
        transaction.setAmount(100.0);
        transaction.setCategory(category);
        transaction.setDate(LocalDate.now());
        transaction.setUser(user);

        transactionRequest = new TransactionRequest();
        transactionRequest.setAmount(100.0);
        transactionRequest.setDate(LocalDate.now());

    }

    @Test
    void testGetAllTransactionsStatusCode() {
        List<Transaction> transactions = List.of(transaction);
        when(transactionRepository.findByUserId(user.getId())).thenReturn(transactions);
        ResponseEntity<?> response = transactionController.getAllTransactions(user.getId());
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testGetAllTransactionsSuccessFlag() {
        List<Transaction> transactions = List.of(transaction);
        when(transactionRepository.findByUserId(user.getId())).thenReturn(transactions);
        ResponseEntity<?> response = transactionController.getAllTransactions(user.getId());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertTrue((Boolean) responseBody.get("success"));
    }

    @Test
    void testGetAllTransactionsDataIsNotNull() {
        List<Transaction> transactions = List.of(transaction);
        when(transactionRepository.findByUserId(user.getId())).thenReturn(transactions);
        ResponseEntity<?> response = transactionController.getAllTransactions(user.getId());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertNotNull(responseBody.get("data"));
    }

    @Test
    void testGetAllTransactionsDataSize() {
        List<Transaction> transactions = List.of(transaction);
        when(transactionRepository.findByUserId(user.getId())).thenReturn(transactions);
        ResponseEntity<?> response = transactionController.getAllTransactions(user.getId());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        List<Transaction> data = (List<Transaction>) responseBody.get("data");
        assertEquals(1, data.size());
    }

    @Test
    void testGetAllTransactionsFailureStatusCode() {
        when(transactionRepository.findByUserId(user.getId())).thenThrow(new RuntimeException("Database error"));
        ResponseEntity<?> response = transactionController.getAllTransactions(user.getId());
        assertEquals(500, response.getStatusCodeValue());
    }

    @Test
    void testGetAllTransactionsFailureFlag() {
        when(transactionRepository.findByUserId(user.getId())).thenThrow(new RuntimeException("Database error"));
        ResponseEntity<?> response = transactionController.getAllTransactions(user.getId());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));
    }

    @Test
    void testCreateTransactionStatusCode() {
        transactionRequest.setUserId(1L);
        transactionRequest.setCategoryId(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        ResponseEntity<?> response = transactionController.createTransaction(transactionRequest);

        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertNotNull(responseBody);
        assertTrue((Boolean) responseBody.get("success"));
    }


    @Test
    void testCreateTransactionSuccessFlag() {
        transactionRequest.setUserId(1L);
        transactionRequest.setCategoryId(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        ResponseEntity<?> response = transactionController.createTransaction(transactionRequest);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertNotNull(responseBody);
        assertTrue((Boolean) responseBody.get("success"));
    }

    @Test
    void testCreateTransactionDataIsNotNull() {
        transactionRequest.setUserId(1L);
        transactionRequest.setCategoryId(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        ResponseEntity<?> response = transactionController.createTransaction(transactionRequest);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertNotNull(responseBody);
        assertNotNull(responseBody.get("data"));
    }


    @Test
    void testGetRecurringTransactionsSuccess() {

        Transaction transaction1 = new Transaction();
        transaction1.setId(1L);
        transaction1.setRecurring(true);
        Transaction transaction2 = new Transaction();
        transaction2.setId(2L);
        transaction2.setRecurring(true);

        List<Transaction> mockTransactions = Arrays.asList(transaction1, transaction2);
        when(transactionRepository.findByIsRecurringTrue()).thenReturn(mockTransactions);
        ResponseEntity<?> response = transactionController.getRecurringTransactions();
        assertNotNull(response);
    }


    @Test
    void testGetNonRecurringTransactionsSuccess() {
        Transaction transaction1 = new Transaction();
        transaction1.setId(1L);
        transaction1.setRecurring(false);

        Transaction transaction2 = new Transaction();
        transaction2.setId(2L);
        transaction2.setRecurring(false);

        List<Transaction> mockTransactions = Arrays.asList(transaction1, transaction2);
        when(transactionRepository.findByIsRecurringFalse()).thenReturn(mockTransactions);

        ResponseEntity<?> response = transactionController.getNonRecurringTransactions();

        assertNotNull(response);
    }


    @Test
    void testCreateTransactionCategoryNotFound() {
        transactionRequest.setUserId(1L);
        transactionRequest.setCategoryId(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.empty());

        ResponseEntity<?> response = transactionController.createTransaction(transactionRequest);

        assertNotNull(response);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));
    }

    @Test
    void testCreateRecurringTransaction() {
        transactionRequest.setUserId(1L);
        transactionRequest.setCategoryId(1L);
        transactionRequest.setRecurring(true);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        ResponseEntity<?> response = transactionController.createTransaction(transactionRequest);

        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        List<Transaction> recurringTransactions = (List<Transaction>) responseBody.get("data");
        assertEquals(12, recurringTransactions.size());
    }

    @Test
    void testCreateRecurringTransaction2() {
        transactionRequest.setUserId(1L);
        transactionRequest.setCategoryId(1L);
        transactionRequest.setRecurring(true);
        transactionRequest.setType(Transaction.Type.DESPESA);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        ResponseEntity<?> response = transactionController.createTransaction(transactionRequest);

        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        List<Transaction> recurringTransactions = (List<Transaction>) responseBody.get("data");
        assertEquals(12, recurringTransactions.size());
    }

    @Test
    void testCreateTransactionOfTypeDespesa() {
        transactionRequest.setUserId(1L);
        transactionRequest.setCategoryId(1L);
        transaction.setType(Transaction.Type.DESPESA);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));
        when(transactionRepository.save(any(Transaction.class))).thenReturn(transaction);

        ResponseEntity<?> response = transactionController.createTransaction(transactionRequest);

        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testCreateTransactionException() {
        transactionRequest.setUserId(1L);
        transactionRequest.setCategoryId(1L);

        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(categoryRepository.findById(category.getId())).thenReturn(Optional.of(category));
        when(transactionRepository.save(any(Transaction.class))).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<?> response = transactionController.createTransaction(transactionRequest);

        assertNotNull(response);
        assertEquals(500, response.getStatusCodeValue());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));
    }



}

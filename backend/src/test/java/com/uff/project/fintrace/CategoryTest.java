package com.uff.project.fintrace;

import com.uff.project.fintrace.DTO.CategoryRequest;
import com.uff.project.fintrace.model.Category;
import com.uff.project.fintrace.model.User;
import com.uff.project.fintrace.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class CategoryTest {

    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryController categoryController;

    private Category category;

    private CategoryRequest categoryRequest;

    private User user;

    @BeforeEach
    void setUp() {

        user = new User();
        user.setId(1L);
        user.setUsername("teste");

        category = new Category();
        category.setId(1L);
        category.setName("Groceries");
        category.setLimit(1000.0);

        categoryRequest = new CategoryRequest();
        categoryRequest.setName("Groceries");
        categoryRequest.setLimit(1000.0);


    }


    @Test
    void testGetAllCategoriesReturnsData() {
        List<Category> categories = List.of(category);
        when(categoryRepository.findAll()).thenReturn(categories);
        ResponseEntity<?> response = categoryController.getAllCategories(user.getId());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertNotNull(responseBody.get("data"));
    }


    @Test
    void testCreateCategoryReturnsData() {
        when(categoryRepository.save(any(Category.class))).thenReturn(category);
        ResponseEntity<?> response = categoryController.createCategory(categoryRequest);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertNotNull(responseBody.get("data"));
    }

    @Test
    void testGetCategoryByIdSuccessStatusCode() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        ResponseEntity<?> response = categoryController.getCategoryById(1L);
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testGetCategoryByIdSuccessFlag() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        ResponseEntity<?> response = categoryController.getCategoryById(1L);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertTrue((Boolean) responseBody.get("success"));
    }

    @Test
    void testUpdateCategoryStatusCode() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(categoryRepository.save(any(Category.class))).thenReturn(category);
        ResponseEntity<?> response = categoryController.updateCategory(1L, category);
        assertEquals(200, response.getStatusCodeValue());
    }


    @Test
    void testDeleteCategoryStatusCode() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        ResponseEntity<?> response = categoryController.deleteCategory(1L);
        assertEquals(200, response.getStatusCodeValue());
    }

    @Test
    void testDeleteCategorySuccessFlag() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        ResponseEntity<?> response = categoryController.deleteCategory(1L);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertTrue((Boolean) responseBody.get("success"));
    }

    @Test
    void testDeleteCategoryCategoryNotFound() {
        when(categoryRepository.findById(2L)).thenReturn(Optional.empty());
        ResponseEntity<?> response = categoryController.deleteCategory(2L);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));
    }

    @Test
    void testDeleteCategoryErrorMessage() {
        when(categoryRepository.findById(2L)).thenReturn(Optional.empty());
        ResponseEntity<?> response = categoryController.deleteCategory(2L);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertEquals("Category not found", responseBody.get("error"));
    }

    @Test
    void testGetCategoryByIdCategoryNotFound() {
        when(categoryRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = categoryController.getCategoryById(2L);
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));
        assertEquals("Category not found", responseBody.get("error"));
    }

    @Test
    void testGetCategoryByIdExceptionHandling() {

        when(categoryRepository.findById(1L)).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<?> response = categoryController.getCategoryById(1L);

        assertEquals(500, response.getStatusCodeValue());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));

    }

    @Test
    void testUpdateCategoryCategoryNotFound() {

        when(categoryRepository.findById(2L)).thenReturn(Optional.empty());

        ResponseEntity<?> response = categoryController.updateCategory(2L, category);

        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));

    }

    @Test
    void testUpdateCategoryExceptionHandling() {
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(categoryRepository.save(any(Category.class))).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<?> response = categoryController.updateCategory(1L, category);

        assertEquals(500, response.getStatusCodeValue());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));

    }

    @Test
    void testDeleteCategoryExceptionHandling() {

        when(categoryRepository.findById(1L)).thenThrow(new RuntimeException("Database error"));
        ResponseEntity<?> response = categoryController.deleteCategory(1L);

        assertEquals(500, response.getStatusCodeValue());
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));

    }

    @Test
    void testGetAllCategoriesExceptionHandling() {

        when(categoryRepository.findAll()).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<?> response = categoryController.getAllCategories(user.getId());

        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));

    }

    @Test
    void testCreateCategoryExceptionHandling() {
        when(categoryRepository.save(any(Category.class))).thenThrow(new RuntimeException("Database error"));

        ResponseEntity<?> response = categoryController.createCategory(categoryRequest);

        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));

    }
}

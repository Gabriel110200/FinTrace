package com.uff.project.fintrace;

import com.uff.project.fintrace.model.Category;
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

    @BeforeEach
    void setUp() {
        category = new Category();
        category.setId(1L);
        category.setName("Groceries");
        category.setLimit(1000.0);
    }


    @Test
    void testGetAllCategoriesReturnsData() {
        List<Category> categories = List.of(category);
        when(categoryRepository.findAll()).thenReturn(categories);
        ResponseEntity<?> response = categoryController.getAllCategories();
        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertNotNull(responseBody.get("data"));
    }


    @Test
    void testCreateCategoryReturnsData() {
        when(categoryRepository.save(any(Category.class))).thenReturn(category);
        ResponseEntity<?> response = categoryController.createCategory(category);
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
}

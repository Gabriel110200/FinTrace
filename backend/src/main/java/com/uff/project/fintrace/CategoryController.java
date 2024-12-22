package com.uff.project.fintrace;
import com.uff.project.fintrace.DTO.CategoryRequest;
import com.uff.project.fintrace.model.Category;
import com.uff.project.fintrace.model.User;
import com.uff.project.fintrace.repository.CategoryRepository;
import com.uff.project.fintrace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository,
                              UserRepository userRepository) {
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
    public ResponseEntity<?> getAllCategories(@RequestParam Long userId) {
        try {
            List<Category> categories = categoryRepository.findByUserId(userId);
            return buildResponse(categories, true, null);
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createCategory(@RequestBody CategoryRequest categoryRequest) {
        try {

            User user = userRepository.findById(categoryRequest.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found"));


            Category category = new Category();
            category.setName(categoryRequest.getName());
            category.setLimit(categoryRequest.getLimit());
            category.setUser(user);

            Category savedCategory = categoryRepository.save(category);

            return buildResponse(savedCategory, true, null);
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        try {
            Optional<Category> category = categoryRepository.findById(id);
            if (category.isPresent()) {
                return buildResponse(category.get(), true, null);
            } else {
                return buildResponse(null, false, "Category not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails) {
        try {
            Optional<Category> category = categoryRepository.findById(id);
            if (category.isPresent()) {
                Category existingCategory = category.get();
                existingCategory.setName(categoryDetails.getName());
                existingCategory.setLimit(categoryDetails.getLimit());
                Category updatedCategory = categoryRepository.save(existingCategory);
                return buildResponse(updatedCategory, true, null);
            } else {
                return buildResponse(null, false, "Category not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        try {
            Optional<Category> category = categoryRepository.findById(id);
            if (category.isPresent()) {
                categoryRepository.delete(category.get());
                return buildResponse("Category deleted successfully", true, null);
            } else {
                return buildResponse(null, false, "Category not found");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return buildResponse(null, false, e.getMessage());
        }
    }
}
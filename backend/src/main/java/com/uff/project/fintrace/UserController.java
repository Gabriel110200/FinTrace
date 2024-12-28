package com.uff.project.fintrace;

import com.uff.project.fintrace.model.Category;
import com.uff.project.fintrace.model.User;
import com.uff.project.fintrace.repository.CategoryRepository;
import com.uff.project.fintrace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        createDefaultCategories(user);

        return ResponseEntity.ok("Usuário registrado com sucesso!");
    }

    private void createDefaultCategories(User user) {
        Category salaryCategory = new Category();
        salaryCategory.setName("Salário");
        salaryCategory.setUser(user);

        Category genericCategory = new Category();
        genericCategory.setName("Genérico");
        genericCategory.setUser(user);

        categoryRepository.saveAll(List.of(salaryCategory, genericCategory));
    }

    @PostMapping("/login")
    public ResponseEntity<?> logUser(@RequestBody User loginUser) {
        Optional<User> user = userRepository.findByUsername(loginUser.getUsername());
        Map<String, Object> response = new HashMap<>();

        if (user.isPresent()) {
            User foundUser = user.get();


            if (passwordEncoder.matches(loginUser.getPassword(), foundUser.getPassword())) {
                response.put("success", true);
                response.put("message", "Usuário logado com sucesso!");
                response.put("data", Map.of(
                        "id", foundUser.getId(),
                        "username", foundUser.getUsername()
                ));
                return ResponseEntity.ok(response);
            }
        }

        response.put("success", false);
        response.put("message", "Usuário inválido!");
        return ResponseEntity.badRequest().body(response);
    }
}

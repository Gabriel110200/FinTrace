package com.uff.project.fintrace;

import com.uff.project.fintrace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user)
    {
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok("Usuário registrado com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> logUser(@RequestBody User loginUser)
    {
        Optional<User> user = userRepository.findByUsernameAndPassword(
                loginUser.getUsername(), loginUser.getPassword());

        Map<String, Object> response = new HashMap<>();

        if (user.isPresent()) {
            User loggedInUser = user.get();

            response.put("success", true);
            response.put("message", "Usuário logado com sucesso!");
            response.put("data", Map.of(
                    "id", loggedInUser.getId(),
                    "username", loggedInUser.getUsername()
            ));

            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Usuário inválido!");
            return ResponseEntity.badRequest().body(response);
        }

    }
}

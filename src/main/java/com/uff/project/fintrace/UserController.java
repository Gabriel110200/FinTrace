package com.uff.project.fintrace;

import com.uff.project.fintrace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public String hello(){
        return "Hello World";
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user)
    {
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok("Usuário registrado com sucesso!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> logUser(@RequestBody User loginUser)
    {
        Optional<User> user = userRepository.findByUsernameAndPassword(loginUser.getUsername(), loginUser.getPassword());

        if(user.isPresent())
        {
            return ResponseEntity.ok("Usuário logado com sucesso!");
        }
        else
            return ResponseEntity.badRequest().body("Usuário inválido");

    }
}

package com.uff.project.fintrace;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping("/")
    public String hello(){
        return "Hello World";
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user)
    {
        return ResponseEntity.ok("teste");
    }
}

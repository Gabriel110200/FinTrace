package com.uff.project.fintrace;

import com.uff.project.fintrace.DTO.AccountRequest;
import com.uff.project.fintrace.model.Account;
import com.uff.project.fintrace.model.User;
import com.uff.project.fintrace.repository.AccountRepository;
import com.uff.project.fintrace.repository.CategoryRepository;
import com.uff.project.fintrace.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    private final AccountRepository accountRepository;
    private final UserRepository userRepository;

    @Autowired
    public AccountController(AccountRepository accountRepository,
                              UserRepository userRepository) {
        this.accountRepository = accountRepository;
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

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createAccount(@RequestBody AccountRequest request) {
        try {
            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado!"));

            Account account = new Account();
            account.setName(request.getName());
            account.setAmount(request.getAmount());
            account.setUser(user);

            Account savedAccount = accountRepository.save(account);
            return buildResponse(savedAccount, true, null);
        } catch (Exception e) {
            return buildResponse(null, false, e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllAccounts(@RequestParam Long userId) {
        List<Account> accounts = accountRepository.findByUserId(userId);
        return buildResponse(accounts,true,null);
    }
}

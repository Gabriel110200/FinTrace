package com.uff.project.fintrace;

import com.uff.project.fintrace.repository.UserRepository;
import com.uff.project.fintrace.model.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.Map;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;

    private User user;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("testuser");
        user.setPassword("password");
    }


    @Test
    void testRegisterUser() {
        when(userRepository.save(any(User.class))).thenReturn(user);

        ResponseEntity<?> response = userController.registerUser(user);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Usuário registrado com sucesso!", response.getBody());

    }

    @Test
    void testLogUserSuccess() {
        when(userRepository.findByUsername("testuser"))
                .thenReturn(Optional.of(user));

        String hashedPassword = BCrypt.hashpw("password", BCrypt.gensalt());
        user.setPassword(hashedPassword);


        mockStatic(BCrypt.class);
        when(BCrypt.checkpw("password", hashedPassword)).thenReturn(true);


        User loginUser = new User();
        loginUser.setUsername("testuser");
        loginUser.setPassword("password");

        ResponseEntity<?> response = userController.logUser(loginUser);

        assertEquals(200, response.getStatusCodeValue());

        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertTrue((Boolean) responseBody.get("success"));
        assertEquals("Usuário logado com sucesso!", responseBody.get("message"));

        Map<String, Object> data = (Map<String, Object>) responseBody.get("data");
        assertEquals(1L, data.get("id"));
        assertEquals("testuser", data.get("username"));

    }

    @Test
    void testLogUserFailure() {
        when(userRepository.findByUsername("wronguser"))
                .thenReturn(Optional.empty());

        User loginUser = new User();
        loginUser.setUsername("wronguser");
        loginUser.setPassword("wrongpassword");

        ResponseEntity<?> response = userController.logUser(loginUser);

        assertEquals(400, response.getStatusCodeValue());

        Map<String, Object> responseBody = (Map<String, Object>) response.getBody();
        assertFalse((Boolean) responseBody.get("success"));
        assertEquals("Usuário inválido!", responseBody.get("message"));

    }
}

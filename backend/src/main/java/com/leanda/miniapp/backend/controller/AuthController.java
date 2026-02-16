package com.leanda.miniapp.backend.controller;

import com.leanda.miniapp.backend.dto.LoginResponse;
import com.leanda.miniapp.backend.entity.User;
import com.leanda.miniapp.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:5173", "http://10.0.2.2:8080", "*"})
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = authService.register(user);
            return ResponseEntity.ok(Map.of(
                    "message", "Registration successful",
                    "user", Map.of(
                            "email", registeredUser.getEmail(),
                            "fullName", registeredUser.getFullName()
                    )
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Registration failed: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        return authService.login(credentials.get("email"), credentials.get("password"))
                .map(loginResponse -> ResponseEntity.ok((Object) loginResponse))
                .orElse(ResponseEntity.status(401).body(Map.of(
                        "error", "Invalid credentials"
                )));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader("Authorization") String token) {
        try {
            // Extract token from "Bearer <token>"
            String jwtToken = token.substring(7);
            authService.logout(jwtToken);
            return ResponseEntity.ok(Map.of("message", "Logout successful"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Logout failed: " + e.getMessage()
            ));
        }
    }
}
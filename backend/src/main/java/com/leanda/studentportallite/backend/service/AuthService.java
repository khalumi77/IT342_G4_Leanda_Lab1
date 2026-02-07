package com.leanda.studentportallite.backend.service;

import com.leanda.studentportallite.backend.dto.LoginResponse;
import com.leanda.studentportallite.backend.entity.User;
import com.leanda.studentportallite.backend.repository.UserRepository;
import com.leanda.studentportallite.backend.security.JwtUtil;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       BCryptPasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    // Register new user
    public User register(User user) {
        // Check if email already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Hash the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Login and return JWT token with user data
    public Optional<LoginResponse> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> {
                    String token = jwtUtil.generateToken(user.getEmail(), user.getFullName());
                    return new LoginResponse(
                            token,
                            user.getEmail(),
                            user.getFullName(),
                            user.getStudentId(),
                            user.getCourse(),
                            user.getYear()
                    );
                });
    }

    // Logout (for future implementation with token blacklist)
    public void logout(String token) {
        // TODO: Implement token blacklisting if needed
        // For now, logout is handled client-side by removing the token
    }
}
package com.leanda.studentportallite.backend.service;

import com.leanda.studentportallite.backend.entity.User;
import com.leanda.studentportallite.backend.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Handles the "Save(user)" step in your Sequence Diagram
    public User register(User user) {
        // Hashing the password as per security best practices
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Handles "findByEmail()" and credential validation from your Activity Diagram
    public Optional<User> login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()));
    }
}
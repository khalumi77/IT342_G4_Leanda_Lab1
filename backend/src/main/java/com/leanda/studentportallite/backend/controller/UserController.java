package com.leanda.studentportallite.backend.controller;

import com.leanda.studentportallite.backend.entity.User;
import com.leanda.studentportallite.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // View Profile endpoint
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return ResponseEntity.ok(Map.of(
                    "id", user.getId(),
                    "fullName", user.getFullName(),
                    "email", user.getEmail(),
                    "studentId", user.getStudentId() != null ? user.getStudentId() : "",
                    "course", user.getCourse() != null ? user.getCourse() : "",
                    "year", user.getYear(),
                    "createdAt", user.getCreatedAt(),
                    "updatedAt", user.getUpdatedAt()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Failed to fetch profile: " + e.getMessage()
            ));
        }
    }

    // Dashboard endpoint (can be customized based on your needs)
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboard(Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            return ResponseEntity.ok(Map.of(
                    "message", "Welcome to your dashboard",
                    "user", Map.of(
                            "fullName", user.getFullName(),
                            "course", user.getCourse() != null ? user.getCourse() : "Not set",
                            "year", user.getYear()
                    ),
                    "stats", Map.of(
                            "totalCourses", 0,  // Placeholder - implement based on your requirements
                            "completedAssignments", 0,
                            "upcomingEvents", 0
                    )
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Failed to fetch dashboard: " + e.getMessage()
            ));
        }
    }

    // Update profile endpoint
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, Object> updates,
                                           Authentication authentication) {
        try {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String email = userDetails.getUsername();

            User user = userRepository.findByEmail(email)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // Update allowed fields
            if (updates.containsKey("fullName")) {
                user.setFullName((String) updates.get("fullName"));
            }
            if (updates.containsKey("studentId")) {
                user.setStudentId((String) updates.get("studentId"));
            }
            if (updates.containsKey("course")) {
                user.setCourse((String) updates.get("course"));
            }
            if (updates.containsKey("year")) {
                Object yearValue = updates.get("year");
                if (yearValue instanceof Number) {
                    user.setYear(((Number) yearValue).intValue());
                } else if (yearValue instanceof String) {
                    user.setYear(Integer.parseInt((String) yearValue));
                }
            }

            User updatedUser = userRepository.save(user);

            return ResponseEntity.ok(Map.of(
                    "message", "Profile updated successfully",
                    "user", Map.of(
                            "id", updatedUser.getId(),
                            "fullName", updatedUser.getFullName(),
                            "email", updatedUser.getEmail(),
                            "studentId", updatedUser.getStudentId(),
                            "course", updatedUser.getCourse(),
                            "year", updatedUser.getYear(),
                            "createdAt", updatedUser.getCreatedAt(),
                            "updatedAt", updatedUser.getUpdatedAt()
                    )
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                    "error", "Failed to update profile: " + e.getMessage()
            ));
        }
    }
}
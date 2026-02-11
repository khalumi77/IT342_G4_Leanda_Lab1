package com.leanda.studentportallite.backend.dto;

public class LoginResponse {
    private String token;
    private String email;
    private String fullName;

    public LoginResponse(String token, String email, String fullName) {
        this.token = token;
        this.email = email;
        this.fullName = fullName;
    }

    // Getters
    public String getToken() { return token; }
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }

    // Setters
    public void setToken(String token) { this.token = token; }
    public void setEmail(String email) { this.email = email; }
    public void setFullName(String fullName) { this.fullName = fullName; }
}
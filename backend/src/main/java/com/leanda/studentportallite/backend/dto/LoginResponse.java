package com.leanda.studentportallite.backend.dto;

public class LoginResponse {
    private String token;
    private String fullName;

    public LoginResponse(String token, String fullName) {
        this.token = token;
        this.fullName = fullName;
    }

    // Getters
    public String getToken() { return token; }
    public String getFullName() { return fullName; }
}
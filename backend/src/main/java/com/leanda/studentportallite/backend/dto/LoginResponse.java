package com.leanda.studentportallite.backend.dto;

public class LoginResponse {
    private String token;
    private String email;
    private String fullName;
    private String studentId;
    private String course;
    private int year;

    public LoginResponse(String token, String email, String fullName, String studentId, String course, int year) {
        this.token = token;
        this.email = email;
        this.fullName = fullName;
        this.studentId = studentId;
        this.course = course;
        this.year = year;
    }

    // Getters
    public String getToken() { return token; }
    public String getEmail() { return email; }
    public String getFullName() { return fullName; }
    public String getStudentId() { return studentId; }
    public String getCourse() { return course; }
    public int getYear() { return year; }

    // Setters
    public void setToken(String token) { this.token = token; }
    public void setEmail(String email) { this.email = email; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setStudentId(String studentId) { this.studentId = studentId; }
    public void setCourse(String course) { this.course = course; }
    public void setYear(int year) { this.year = year; }
}
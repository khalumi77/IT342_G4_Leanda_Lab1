package com.leanda.miniapp.mobile.models

// Login Request
data class LoginRequest(
    val email: String,
    val password: String
)

// Login Response
data class LoginResponse(
    val token: String,
    val email: String,
    val fullName: String
)

// Register Request
data class RegisterRequest(
    val fullName: String,
    val email: String,
    val password: String
)

// Register Response
data class RegisterResponse(
    val message: String,
    val user: UserInfo? = null
)

data class UserInfo(
    val email: String,
    val fullName: String
)

// Profile Response
data class ProfileResponse(
    val id: Long,
    val fullName: String,
    val email: String
)

// Update Profile Request
data class UpdateProfileRequest(
    val fullName: String
)

// Update Profile Response
data class UpdateProfileResponse(
    val message: String,
    val user: ProfileResponse
)

// Dashboard Response
data class DashboardResponse(
    val message: String,
    val user: DashboardUser
)

data class DashboardUser(
    val fullName: String
)

// Error Response
data class ErrorResponse(
    val error: String
)

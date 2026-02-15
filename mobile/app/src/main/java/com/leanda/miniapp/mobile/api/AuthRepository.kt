package com.leanda.miniapp.mobile.api

import com.leanda.miniapp.mobile.models.*
import com.leanda.miniapp.mobile.utils.TokenManager

class AuthRepository(private val tokenManager: TokenManager) {
    
    private val apiService = RetrofitClient.apiService
    
    // Login
    suspend fun login(email: String, password: String): Result<LoginResponse> {
        return try {
            val response = apiService.login(LoginRequest(email, password))
            if (response.isSuccessful && response.body() != null) {
                val loginResponse = response.body()!!
                // Save token and user info
                tokenManager.saveToken(loginResponse.token)
                tokenManager.saveUserInfo(loginResponse.email, loginResponse.fullName)
                RetrofitClient.authToken = loginResponse.token
                Result.success(loginResponse)
            } else {
                val errorMsg = response.errorBody()?.string() ?: "Login failed"
                Result.failure(Exception(errorMsg))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Register
    suspend fun register(fullName: String, email: String, password: String): Result<RegisterResponse> {
        return try {
            val response = apiService.register(
                RegisterRequest(fullName, email, password)
            )
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                val errorMsg = response.errorBody()?.string() ?: "Registration failed"
                Result.failure(Exception(errorMsg))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Logout
    suspend fun logout(): Result<Unit> {
        return try {
            apiService.logout()
            tokenManager.clearAll()
            RetrofitClient.authToken = null
            Result.success(Unit)
        } catch (e: Exception) {
            // Even if API call fails, clear local data
            tokenManager.clearAll()
            RetrofitClient.authToken = null
            Result.success(Unit)
        }
    }
    
    // Get Profile
    suspend fun getProfile(): Result<ProfileResponse> {
        return try {
            val response = apiService.getProfile()
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Failed to load profile"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Update Profile
    suspend fun updateProfile(fullName: String): Result<UpdateProfileResponse> {
        return try {
            val response = apiService.updateProfile(UpdateProfileRequest(fullName))
            if (response.isSuccessful && response.body() != null) {
                val updateResponse = response.body()!!
                // Update stored user name
                tokenManager.saveUserInfo(
                    updateResponse.user.email,
                    updateResponse.user.fullName
                )
                Result.success(updateResponse)
            } else {
                Result.failure(Exception("Failed to update profile"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
    
    // Get Dashboard
    suspend fun getDashboard(): Result<DashboardResponse> {
        return try {
            val response = apiService.getDashboard()
            if (response.isSuccessful && response.body() != null) {
                Result.success(response.body()!!)
            } else {
                Result.failure(Exception("Failed to load dashboard"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}

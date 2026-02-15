package com.leanda.miniapp.mobile.api

import com.leanda.miniapp.mobile.models.*
import retrofit2.Response
import retrofit2.http.*

interface ApiService {
    
    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): Response<LoginResponse>
    
    @POST("auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<RegisterResponse>
    
    @POST("auth/logout")
    suspend fun logout(): Response<Map<String, String>>
    
    @GET("user/profile")
    suspend fun getProfile(): Response<ProfileResponse>
    
    @PUT("user/profile")
    suspend fun updateProfile(@Body request: UpdateProfileRequest): Response<UpdateProfileResponse>
    
    @GET("user/dashboard")
    suspend fun getDashboard(): Response<DashboardResponse>
}

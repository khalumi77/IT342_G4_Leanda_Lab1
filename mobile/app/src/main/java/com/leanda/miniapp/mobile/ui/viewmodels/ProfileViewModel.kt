package com.leanda.miniapp.mobile.ui.viewmodels

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.leanda.miniapp.mobile.api.AuthRepository
import com.leanda.miniapp.mobile.models.ProfileResponse
import com.leanda.miniapp.mobile.utils.TokenManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class ProfileViewModel(application: Application) : AndroidViewModel(application) {
    
    private val tokenManager = TokenManager(application)
    private val repository = AuthRepository(tokenManager)
    
    private val _profileState = MutableStateFlow<ProfileState>(ProfileState.Idle)
    val profileState: StateFlow<ProfileState> = _profileState
    
    sealed class ProfileState {
        object Idle : ProfileState()
        object Loading : ProfileState()
        data class Success(
            val profile: ProfileResponse,
            val successMessage: String? = null
        ) : ProfileState()
        data class Error(val message: String) : ProfileState()
    }
    
    fun loadProfile() {
        viewModelScope.launch {
            _profileState.value = ProfileState.Loading
            val result = repository.getProfile()
            _profileState.value = if (result.isSuccess) {
                ProfileState.Success(result.getOrNull()!!)
            } else {
                ProfileState.Error(result.exceptionOrNull()?.message ?: "Failed to load profile")
            }
        }
    }
    
    fun updateProfile(fullName: String) {
        viewModelScope.launch {
            _profileState.value = ProfileState.Loading
            val result = repository.updateProfile(fullName)
            if (result.isSuccess) {
                val updateResponse = result.getOrNull()!!
                _profileState.value = ProfileState.Success(
                    profile = updateResponse.user,
                    successMessage = "Profile updated successfully!"
                )
            } else {
                _profileState.value = ProfileState.Error(
                    result.exceptionOrNull()?.message ?: "Failed to update profile"
                )
            }
        }
    }
}

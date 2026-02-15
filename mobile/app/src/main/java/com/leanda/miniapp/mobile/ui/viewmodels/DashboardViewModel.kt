package com.leanda.miniapp.mobile.ui.viewmodels

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.viewModelScope
import com.leanda.miniapp.mobile.api.AuthRepository
import com.leanda.miniapp.mobile.utils.TokenManager
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.launch

class DashboardViewModel(application: Application) : AndroidViewModel(application) {
    
    private val tokenManager = TokenManager(application)
    private val repository = AuthRepository(tokenManager)
    
    private val _dashboardState = MutableStateFlow<DashboardState>(DashboardState.Idle)
    val dashboardState: StateFlow<DashboardState> = _dashboardState
    
    private val _userName = MutableStateFlow<String?>(null)
    val userName: StateFlow<String?> = _userName
    
    sealed class DashboardState {
        object Idle : DashboardState()
        object Loading : DashboardState()
        data class Success(val message: String) : DashboardState()
        data class Error(val message: String) : DashboardState()
    }
    
    init {
        loadUserName()
    }
    
    private fun loadUserName() {
        viewModelScope.launch {
            _userName.value = tokenManager.getUserName().firstOrNull()
        }
    }
    
    fun loadDashboard() {
        viewModelScope.launch {
            _dashboardState.value = DashboardState.Loading
            val result = repository.getDashboard()
            _dashboardState.value = if (result.isSuccess) {
                DashboardState.Success(result.getOrNull()?.message ?: "Welcome to your dashboard")
            } else {
                DashboardState.Error(result.exceptionOrNull()?.message ?: "Failed to load dashboard")
            }
        }
    }
    
    fun logout() {
        viewModelScope.launch {
            repository.logout()
        }
    }
}

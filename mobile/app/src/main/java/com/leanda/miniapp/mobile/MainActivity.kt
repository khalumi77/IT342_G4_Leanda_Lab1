package com.leanda.miniapp.mobile

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.lifecycle.lifecycleScope
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.leanda.miniapp.mobile.api.RetrofitClient
import com.leanda.miniapp.mobile.ui.screens.DashboardScreen
import com.leanda.miniapp.mobile.ui.screens.LoginScreen
import com.leanda.miniapp.mobile.ui.screens.ProfileScreen
import com.leanda.miniapp.mobile.ui.screens.RegisterScreen
import com.leanda.miniapp.mobile.ui.theme.MiniAppTheme
import com.leanda.miniapp.mobile.utils.TokenManager
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.launch

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val tokenManager = TokenManager(this)

        setContent {
            MiniAppTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    var startDestination by remember { mutableStateOf<String?>(null) }

                    // Check if user is logged in
                    LaunchedEffect(Unit) {
                        lifecycleScope.launch {
                            val token = tokenManager.getToken().firstOrNull()
                            RetrofitClient.authToken = token
                            startDestination = if (token != null) "dashboard" else "login"
                        }
                    }

                    // Show navigation only after we know the start destination
                    startDestination?.let { start ->
                        AppNavigation(startDestination = start)
                    }
                }
            }
        }
    }
}

@Composable
fun AppNavigation(startDestination: String) {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = startDestination
    ) {
        composable("login") {
            LoginScreen(
                onLoginSuccess = {
                    navController.navigate("dashboard") {
                        popUpTo("login") { inclusive = true }
                    }
                },
                onNavigateToRegister = {
                    navController.navigate("register")
                }
            )
        }

        composable("register") {
            RegisterScreen(
                onRegisterSuccess = {
                    navController.navigate("login") {
                        popUpTo("register") { inclusive = true }
                    }
                },
                onNavigateToLogin = {
                    navController.popBackStack()
                }
            )
        }

        composable("dashboard") {
            DashboardScreen(
                onNavigateToProfile = {
                    navController.navigate("profile")
                },
                onLogout = {
                    navController.navigate("login") {
                        popUpTo(0) { inclusive = true }
                    }
                }
            )
        }

        composable("profile") {
            ProfileScreen(
                onNavigateBack = {
                    navController.popBackStack()
                }
            )
        }
    }
}
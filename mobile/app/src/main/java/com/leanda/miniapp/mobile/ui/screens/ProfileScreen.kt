package com.leanda.miniapp.mobile.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.leanda.miniapp.mobile.ui.viewmodels.ProfileViewModel

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(
    onNavigateBack: () -> Unit,
    viewModel: ProfileViewModel = viewModel()
) {
    val profileState by viewModel.profileState.collectAsState()
    var isEditing by remember { mutableStateOf(false) }
    var fullName by remember { mutableStateOf("") }
    
    LaunchedEffect(Unit) {
        viewModel.loadProfile()
    }
    
    // Update fullName when profile loads
    LaunchedEffect(profileState) {
        if (profileState is ProfileViewModel.ProfileState.Success) {
            val profile = (profileState as ProfileViewModel.ProfileState.Success).profile
            fullName = profile.fullName
        }
    }
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Profile") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            when (val state = profileState) {
                is ProfileViewModel.ProfileState.Loading -> {
                    CircularProgressIndicator(
                        modifier = Modifier.align(Alignment.Center)
                    )
                }
                is ProfileViewModel.ProfileState.Success -> {
                    Column(
                        modifier = Modifier
                            .fillMaxSize()
                            .padding(16.dp)
                    ) {
                        Card(
                            modifier = Modifier.fillMaxWidth(),
                            elevation = CardDefaults.cardElevation(defaultElevation = 4.dp)
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    verticalAlignment = Alignment.CenterVertically
                                ) {
                                    Text(
                                        text = "My Profile",
                                        style = MaterialTheme.typography.headlineSmall
                                    )
                                    
                                    if (!isEditing) {
                                        TextButton(onClick = { isEditing = true }) {
                                            Text("Edit")
                                        }
                                    }
                                }
                                
                                Divider(modifier = Modifier.padding(vertical = 16.dp))
                                
                                if (!isEditing) {
                                    // View mode
                                    ProfileField("Full Name", state.profile.fullName)
                                    Spacer(modifier = Modifier.height(16.dp))
                                    ProfileField("Email", state.profile.email)
                                } else {
                                    // Edit mode
                                    OutlinedTextField(
                                        value = fullName,
                                        onValueChange = { fullName = it },
                                        label = { Text("Full Name") },
                                        modifier = Modifier.fillMaxWidth(),
                                        singleLine = true
                                    )
                                    
                                    Spacer(modifier = Modifier.height(16.dp))
                                    
                                    OutlinedTextField(
                                        value = state.profile.email,
                                        onValueChange = { },
                                        label = { Text("Email (cannot be changed)") },
                                        modifier = Modifier.fillMaxWidth(),
                                        enabled = false,
                                        singleLine = true
                                    )
                                    
                                    Spacer(modifier = Modifier.height(24.dp))
                                    
                                    Row(
                                        modifier = Modifier.fillMaxWidth(),
                                        horizontalArrangement = Arrangement.spacedBy(8.dp)
                                    ) {
                                        Button(
                                            onClick = {
                                                viewModel.updateProfile(fullName)
                                                isEditing = false
                                            },
                                            modifier = Modifier.weight(1f)
                                        ) {
                                            Text("Save")
                                        }
                                        
                                        OutlinedButton(
                                            onClick = {
                                                fullName = state.profile.fullName
                                                isEditing = false
                                            },
                                            modifier = Modifier.weight(1f)
                                        ) {
                                            Text("Cancel")
                                        }
                                    }
                                }
                            }
                        }
                        
                        // Show success message
                        if (state.successMessage != null) {
                            Spacer(modifier = Modifier.height(16.dp))
                            Card(
                                modifier = Modifier.fillMaxWidth(),
                                colors = CardDefaults.cardColors(
                                    containerColor = MaterialTheme.colorScheme.primaryContainer
                                )
                            ) {
                                Text(
                                    text = state.successMessage,
                                    modifier = Modifier.padding(16.dp),
                                    color = MaterialTheme.colorScheme.onPrimaryContainer
                                )
                            }
                        }
                    }
                }
                is ProfileViewModel.ProfileState.Error -> {
                    Column(
                        modifier = Modifier
                            .align(Alignment.Center)
                            .padding(16.dp),
                        horizontalAlignment = Alignment.CenterHorizontally
                    ) {
                        Text(
                            text = state.message,
                            color = MaterialTheme.colorScheme.error,
                            style = MaterialTheme.typography.bodyLarge
                        )
                        Spacer(modifier = Modifier.height(16.dp))
                        Button(onClick = { viewModel.loadProfile() }) {
                            Text("Retry")
                        }
                    }
                }
                is ProfileViewModel.ProfileState.Idle -> {
                    // Initial state
                }
            }
        }
    }
}

@Composable
fun ProfileField(label: String, value: String) {
    Column {
        Text(
            text = label,
            style = MaterialTheme.typography.labelMedium,
            color = MaterialTheme.colorScheme.outline
        )
        Spacer(modifier = Modifier.height(4.dp))
        Text(
            text = value,
            style = MaterialTheme.typography.bodyLarge
        )
    }
}

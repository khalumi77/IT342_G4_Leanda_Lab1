package com.leanda.miniapp.mobile.models

import android.os.Parcelable
import kotlinx.parcelize.Parcelize

@Parcelize
data class User(
    val id: Long? = null,
    val fullName: String,
    val email: String
) : Parcelable

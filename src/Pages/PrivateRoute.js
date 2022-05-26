import React from "react"
import { Navigate } from "react-router-dom"

export default function PrivateRoute({children}) {
    const currentUser = localStorage.getItem("anime-facts-jwt-token");

    return currentUser ? children : <Navigate to="/login" />
}
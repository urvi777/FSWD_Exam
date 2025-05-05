"use client"

import { createContext, useState, useEffect } from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"))
    if (savedUser) setUser(savedUser)
    setLoading(false)
  }, [])

  const login = async (email) => {
    try {
      // Just create a dummy user object for login
      const dummyUser = { name: "Anonymous", email }
      localStorage.setItem("user", JSON.stringify(dummyUser))
      setUser(dummyUser)
      return { success: true }
    } catch (err) {
      return { success: false, message: "Login failed" }
    }
  }

  const register = async (name, email) => {
    try {
      // Just save the dummy user
      const dummyUser = { name, email }
      localStorage.setItem("user", JSON.stringify(dummyUser))
      setUser(dummyUser)
      return { success: true }
    } catch (err) {
      return { success: false, message: "Registration failed" }
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

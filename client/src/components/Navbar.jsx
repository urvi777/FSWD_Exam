"use client"

import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-primary">
              College Events
            </Link>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
                  Home
                </Link>
                {user ? (
                  <>
                    <Link
                      to="/create-event"
                      className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium"
                    >
                      Create Event
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium"
                    >
                      Logout
                    </button>
                    <span className="text-gray-500 px-3 py-2 rounded-md font-medium">Welcome, {user.name}</span>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
                      Login
                    </Link>
                    <Link to="/register" className="text-gray-700 hover:text-primary px-3 py-2 rounded-md font-medium">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

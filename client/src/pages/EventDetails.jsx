"use client"

import { useState, useEffect, useContext } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const EventDetails = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`)
        setEvent(res.data)
        setLoading(false)
      } catch (err) {
        setError("Event not found")
        setLoading(false)
      }
    }

    fetchEvent()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`)
        navigate("/")
      } catch (err) {
        setError("Error deleting event")
      }
    }
  }

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading event...</div>
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={`http://localhost:5000/${event.image}`}
              alt={event.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="p-6 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{event.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="inline-block px-2 py-1 text-xs font-semibold bg-indigo-100 text-primary rounded">
                {event.eventType}
              </span>
              <div className="text-gray-500 text-sm">
                <span className="mr-3">{new Date(event.date).toLocaleDateString()}</span>
                <span>{event.time}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-sm text-gray-500">Location</h3>
                <p className="font-medium">{event.location}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Organizer</h3>
                <p className="font-medium">{event.organizer}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>

            {user && user._id === event.user && (
              <div className="flex gap-4 mb-4">
                <Link to={`/edit-event/${event._id}`} className="btn btn-edit">
                  Edit Event
                </Link>
                <button onClick={handleDelete} className="btn btn-danger">
                  Delete Event
                </button>
              </div>
            )}

            <Link to="/" className="inline-block mt-2 text-primary hover:text-primary-hover">
              ← Back to Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails

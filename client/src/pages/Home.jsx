"use client"

import { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"
import EventModal from "../components/EventModal"

const Home = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("")
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const { user } = useContext(AuthContext)

  const eventTypes = ["Academic", "Cultural", "Sports", "Technical", "Workshop", "Seminar", "Other"]

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events")
        setEvents(res.data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching events:", err)
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${id}`)
        setEvents(events.filter((event) => event._id !== id))
      } catch (err) {
        console.error("Error deleting event:", err)
      }
    }
  }

  const handleViewDetails = (event) => {
    setSelectedEvent(event)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedEvent(null)
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "" || event.eventType === filterType
    return matchesSearch && matchesType
  })

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading events...</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">College Events</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search events..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input flex-1"
        />

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="form-input md:w-48">
          <option value="">All Types</option>
          {eventTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {filteredEvents.length === 0 ? (
        <p className="text-center py-10 text-gray-500">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={`http://localhost:5000/${event.image}`}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                <span className="inline-block px-2 py-1 text-xs font-semibold bg-indigo-100 text-primary rounded mb-2">
                  {event.eventType}
                </span>
                <p className="text-gray-500 text-sm mb-4">{new Date(event.date).toLocaleDateString()}</p>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => handleViewDetails(event)} className="btn btn-view flex-1">
                    View Details
                  </button>

                  {user && user._id === event.user && (
                    <>
                      <Link to={`/edit-event/${event._id}`} className="btn btn-edit flex-1">
                        Edit
                      </Link>
                      <button onClick={() => handleDelete(event._id)} className="btn btn-danger flex-1">
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && selectedEvent && <EventModal event={selectedEvent} onClose={closeModal} />}
    </div>
  )
}

export default Home

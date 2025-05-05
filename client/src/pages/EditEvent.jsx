"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const EditEvent = () => {
  const { id } = useParams()
  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    eventType: "",
  })

  const [image, setImage] = useState(null)
  const [currentImage, setCurrentImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fetchLoading, setFetchLoading] = useState(true)

  const eventTypes = ["Academic", "Cultural", "Sports", "Technical", "Workshop", "Seminar", "Other"]

  useEffect(() => {
    // Redirect if not logged in
    if (!loading && !user) {
      navigate("/login")
      return
    }

    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`)
        const event = res.data

        // Check if user is the creator of the event
        if (user && event.user !== user._id) {
          navigate("/")
          return
        }

        // Format date for input field (YYYY-MM-DD)
        const eventDate = new Date(event.date)
        const formattedDate = eventDate.toISOString().split("T")[0]

        setFormData({
          title: event.title,
          description: event.description,
          date: formattedDate,
          time: event.time,
          location: event.location,
          organizer: event.organizer,
          eventType: event.eventType,
        })

        setCurrentImage(event.image)
        setFetchLoading(false)
      } catch (err) {
        console.error("Error fetching event:", err)
        navigate("/")
      }
    }

    if (!loading && user) {
      fetchEvent()
    }
  }, [id, user, loading, navigate])

  const { title, description, date, time, location, organizer, eventType } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!title || !description || !date || !time || !location || !organizer) {
      setError("Please fill in all fields")
      return
    }

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("title", title)
      formDataToSend.append("description", description)
      formDataToSend.append("date", date)
      formDataToSend.append("time", time)
      formDataToSend.append("location", location)
      formDataToSend.append("organizer", organizer)
      formDataToSend.append("eventType", eventType)

      if (image) {
        formDataToSend.append("image", image)
      }

      await axios.put(`http://localhost:5000/api/events/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Error updating event")
      setIsSubmitting(false)
    }
  }

  if (loading || fetchLoading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Edit Event</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="form-group">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Event Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleChange}
            required
            className="form-input mt-1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">
            Event Type
          </label>
          <select
            id="eventType"
            name="eventType"
            value={eventType}
            onChange={handleChange}
            required
            className="form-input mt-1"
          >
            {eventTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-group">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={handleChange}
              required
              className="form-input mt-1"
            />
          </div>

          <div className="form-group">
            <label htmlFor="time" className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              value={time}
              onChange={handleChange}
              required
              className="form-input mt-1"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={handleChange}
            required
            className="form-input mt-1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="organizer" className="block text-sm font-medium text-gray-700">
            Organizer
          </label>
          <input
            type="text"
            id="organizer"
            name="organizer"
            value={organizer}
            onChange={handleChange}
            required
            className="form-input mt-1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={handleChange}
            rows="5"
            required
            className="form-input mt-1"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Event Image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="form-input mt-1"
          />
          <p className="text-sm text-gray-500 mt-1">Leave empty to keep current image</p>

          {imagePreview ? (
            <div className="mt-4 rounded-md overflow-hidden max-w-xs">
              <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="w-full h-auto" />
            </div>
          ) : (
            currentImage && (
              <div className="mt-4 rounded-md overflow-hidden max-w-xs">
                <img src={`http://localhost:5000/${currentImage}`} alt="Current" className="w-full h-auto" />
              </div>
            )
          )}
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-6" disabled={isSubmitting}>
          {isSubmitting ? "Updating..." : "Update Event"}
        </button>
      </form>
    </div>
  )
}

export default EditEvent

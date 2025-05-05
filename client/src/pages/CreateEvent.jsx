"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"

const CreateEvent = () => {
  const { user, loading } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    organizer: "",
    eventType: "Academic",
  })

  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const eventTypes = ["Academic", "Cultural", "Sports", "Technical", "Workshop", "Seminar", "Other"]

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login")
    }
  }, [user, loading, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const { title, description, date, time, location, organizer, eventType } = formData

    if (!title || !description || !date || !time || !location || !organizer) {
      setError("Please fill in all fields")
      return
    }

    if (!image) {
      setError("Please upload an event image")
      return
    }

    setIsSubmitting(true)

    try {
      const payload = new FormData()
      Object.entries(formData).forEach(([key, value]) => payload.append(key, value))
      payload.append("image", image)

      await axios.post("http://localhost:5000/api/events", payload)

      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Error creating event")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Create New Event</h1>

      {error && <div className="text-red-600 mb-4 text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium">Event Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Event Type</label>
          <select name="eventType" value={formData.eventType} onChange={handleChange} className="w-full border p-2 rounded">
            {eventTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Time</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full border p-2 rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Organizer</label>
          <input type="text" name="organizer" value={formData.organizer} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium">Event Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full border p-2 rounded" />
          {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-48 rounded-md" />}
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          {isSubmitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  )
}

export default CreateEvent

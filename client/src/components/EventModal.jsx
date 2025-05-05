"use client"

import { useEffect } from "react"

const EventModal = ({ event, onClose }) => {
  useEffect(() => {
    // Close modal when Escape key is pressed
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleEsc)

    // Prevent scrolling on body when modal is open
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
          onClick={onClose}
        >
          ×
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={`http://localhost:5000/${event.image}`}
              alt={event.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          <div className="p-6 md:w-1/2">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{event.title}</h2>
            <span className="inline-block px-2 py-1 text-xs font-semibold bg-indigo-100 text-primary rounded mb-4">
              {event.eventType}
            </span>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{new Date(event.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{event.time}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{event.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Organizer</p>
                <p className="font-medium">{event.organizer}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600">{event.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventModal

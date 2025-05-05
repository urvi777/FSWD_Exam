import express from "express"
import Event from "../models/Event.js"
import upload from "../middleware/upload.js" // Keeping upload middleware for file handling
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const router = express.Router()

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// @route   GET api/events
// @desc    Get all events
// @access  Public
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 })
    res.json(events)
  } catch (err) {
    console.error("Get events error:", err.message)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   POST api/events
// @desc    Create a new event
// @access  Public (auth middleware removed)
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date, time, location, organizer, eventType } = req.body

    if (!req.file) {
      return res.status(400).json({ message: "Please upload an image" })
    }

    const newEvent = new Event({
      title,
      description,
      date,
      time,
      location,
      organizer,
      eventType,
      image: `uploads/${req.file.filename}`,
    })

    const event = await newEvent.save()
    res.status(201).json(event)
  } catch (err) {
    console.error("Create event error:", err.message)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   PUT api/events/:id
// @desc    Update an event
// @access  Public
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { title, description, date, time, location, organizer, eventType } = req.body
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    // Update event fields
    event.title = title || event.title
    event.description = description || event.description
    event.date = date || event.date
    event.time = time || event.time
    event.location = location || event.location
    event.organizer = organizer || event.organizer
    event.eventType = eventType || event.eventType

    if (req.file) {
      event.image = `uploads/${req.file.filename}`
    }

    const updatedEvent = await event.save()
    res.json(updatedEvent)
  } catch (err) {
    console.error("Update event error:", err.message)
    res.status(500).json({ message: "Server error" })
  }
})

// @route   DELETE api/events/:id
// @desc    Delete an event
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if (!event) {
      return res.status(404).json({ message: "Event not found" })
    }

    await event.remove()
    res.json({ message: "Event removed" })
  } catch (err) {
    console.error("Delete event error:", err.message)
    res.status(500).json({ message: "Server error" })
  }
})

export default router

import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"
import path from "path"
import { fileURLToPath } from "url"

// Route imports
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import eventRoutes from "./routes/events.js"

// Load environment variables
dotenv.config()

// Create Express app
const app = express()

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Middleware
app.use(cors({ origin: "http://localhost:5173" })) 
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/events", eventRoutes)

// Connect to MongoDB
const connectDB = async () => {
  try {    await mongoose.connect("mongodb+srv://23it094:KW4f4KPByT.iRGH@cluster0.aplye42.mongodb.net/CollegeEvents?retryWrites=true&w=majority&appName=Cluster0")
    console.log("MongoDB connected successfully")
  } catch (err) {
    console.error("MongoDB connection error:", err.message)
    process.exit(1)
  }
}

connectDB()

// Start server
const PORT = process.env.PORT ||
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

import express from "express"

const router = express.Router()

// @route   GET api/users/me
// @desc    Get current user
// @access  Public (auth middleware removed)
router.get("/me", async (req, res) => {
  try {
    res.json({ message: "User data not protected anymore" })
  } catch (err) {
    console.error("Get user error:", err.message)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
